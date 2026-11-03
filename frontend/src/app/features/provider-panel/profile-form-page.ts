import { Component, Injector, computed, effect, inject, signal, untracked } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CategoryService } from '../../core/api/category.service';
import { BrazilianLocationsService, BrazilianState, BrazilianCity } from '../../core/api/brazilian-locations.service';
import { ProviderAccountService } from '../../core/api/provider-account.service';
import { AuthService } from '../../core/auth/auth.service';
import { focusFirstInvalid } from '../../core/forms/focus';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { HasUnsavedChanges } from '../../core/forms/unsaved-changes-guard';
import { brazilianMobile, notBlank } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { Category } from '../../core/models/category.model';
import { ProviderProfile, ProviderProfilePayload } from '../../core/models/provider.model';
import { cityKey } from '../../core/util/city';
import { formatBrazilianMobile, normalizeBrazilianMobile } from '../../core/util/phone';
import { CityListEditor } from '../../shared/city-list-editor/city-list-editor';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';

type OfferingGroup = FormGroup<{
  categoryId: FormControl<number>;
  selected: FormControl<boolean>;
  priceInfo: FormControl<string>;
}>;

interface ServiceMeta {
  name: string;
  inactive: boolean;
}

/** Precisa haver pelo menos um serviço marcado (o backend também exige). */
const atLeastOneService: ValidatorFn = (control) => {
  const array = control as FormArray<OfferingGroup>;
  return array.controls.some((group) => group.controls.selected.value) ? null : { noService: true };
};

// Só estes erros do servidor têm um lugar visível na tela, embaixo do campo. Os demais vão para o aviso.
const FIELDS_WITH_INLINE_ERROR = new Set(['professionalName', 'description', 'whatsapp', 'city']);

@Component({
  selector: 'app-profile-form-page',
  imports: [ReactiveFormsModule, RouterLink, CityListEditor, LoadingState, ErrorState],
  templateUrl: './profile-form-page.html',
})
export class ProfileFormPage implements HasUnsavedChanges {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly auth = inject(AuthService);
  private readonly account = inject(ProviderAccountService);
  private readonly categoryService = inject(CategoryService);
  private readonly locations = inject(BrazilianLocationsService);

  // Perfil (pode ainda não existir) e categorias, carregados juntos
  protected readonly data = loadResource(
    () => null,
    () => forkJoin({ profile: this.account.getMine(), categories: this.categoryService.list() }),
  );

  protected readonly states = signal<BrazilianState[]>([]);
  protected readonly mainCities = signal<BrazilianCity[]>([]);
  protected readonly selectedState = signal('');
  protected readonly citiesLoading = signal(false);
  protected readonly locationsError = signal<string | null>(null);

  protected readonly form = this.fb.group({
    professionalName: ['', [notBlank, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(1000)]],
    whatsapp: ['', [notBlank, brazilianMobile]],
    city: ['', [notBlank, Validators.maxLength(100)]],
    available: [true],
    offerings: new FormArray<OfferingGroup>([], { validators: [atLeastOneService] }),
  });

  protected readonly areas = signal<string[]>([]);
  private readonly initialAreas = signal<string[]>([]);

  protected readonly ready = signal(false);
  protected readonly profileId = signal<number | null>(null);
  protected readonly serviceMeta = signal(new Map<number, ServiceMeta>());
  protected readonly submitted = signal(false);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly serverMessages = signal<string[]>([]);

  protected readonly isEdit = computed(() => this.profileId() !== null);
  protected readonly fieldError = fieldError;

  private populated = false;

  constructor() {
    this.locations.states().subscribe({
      next: (states) => this.states.set(states),
      error: () => this.locationsError.set('Não foi possível carregar os estados. Verifique sua conexão e tente novamente.'),
    });

    // Quando os dados chegam, monta o formulário uma única vez
    effect(() => {
      const state = this.data.state();
      if (state.status === 'ready') {
        untracked(() => this.populate(state.data.profile, state.data.categories));
      }
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty || JSON.stringify(this.areas()) !== JSON.stringify(this.initialAreas());
  }

  private populate(profile: ProviderProfile | null, categories: Category[]): void {
    if (this.populated) {
      return;
    }
    this.populated = true;

    const offered = new Map((profile?.offerings ?? []).map((o) => [o.categoryId, o]));
    const meta = new Map<number, ServiceMeta>();
    const groups: OfferingGroup[] = [];

    const addRow = (categoryId: number, name: string, inactive: boolean): void => {
      meta.set(categoryId, { name, inactive });
      groups.push(
        this.fb.group({
          categoryId: this.fb.control(categoryId),
          selected: this.fb.control(offered.has(categoryId)),
          priceInfo: this.fb.control(offered.get(categoryId)?.priceInfo ?? '', [Validators.maxLength(100)]),
        }),
      );
    };

    categories.forEach((category) => addRow(category.id, category.name, false));

    // Categoria que o administrador desativou, mas que este prestador já oferecia: continua na tela
    // marcada. Se não aparecesse, ao salvar o backend a removeria sem a pessoa perceber.
    const activeIds = new Set(categories.map((category) => category.id));
    (profile?.offerings ?? [])
      .filter((offering) => !activeIds.has(offering.categoryId))
      .forEach((offering) => addRow(offering.categoryId, offering.categoryName, true));

    const array = this.form.controls.offerings;
    array.clear();
    groups.forEach((group) => array.push(group));

    // Quem acabou de se cadastrar já informou o celular: aproveitamos no WhatsApp
    const registeredPhone = this.auth.user()?.phone ?? '';
    const suggestedPhone = normalizeBrazilianMobile(registeredPhone) !== null ? registeredPhone : '';

    this.form.patchValue({
      professionalName: profile?.professionalName ?? '',
      description: profile?.description ?? '',
      whatsapp: profile ? formatBrazilianMobile(profile.whatsapp) : suggestedPhone,
      city: profile?.city ?? '',
      available: profile?.available ?? true,
    });

    // A cidade principal o servidor inclui sozinho: aqui só ficam as outras
    const extras = (profile?.serviceAreas ?? []).filter((area) => cityKey(area) !== cityKey(profile?.city ?? ''));
    this.areas.set(extras);
    this.initialAreas.set(extras);

    this.serviceMeta.set(meta);
    this.profileId.set(profile?.id ?? null);
    this.form.markAsPristine();
    this.ready.set(true);
  }

  protected onMainStateChange(stateCode: string): void {
    this.selectedState.set(stateCode);
    this.mainCities.set([]);
    this.form.controls.city.setValue('');
    this.form.controls.city.markAsDirty();
    this.locationsError.set(null);
    if (!stateCode) return;
    this.citiesLoading.set(true);
    this.locations.cities(stateCode).subscribe({
      next: (cities) => { this.mainCities.set(cities); this.citiesLoading.set(false); },
      error: () => { this.locationsError.set('Não foi possível carregar os municípios deste estado.'); this.citiesLoading.set(false); },
    });
  }

  protected selectMainCity(cityName: string): void {
    this.form.controls.city.setValue(cityName);
    this.form.controls.city.markAsDirty();
    this.form.controls.city.markAsTouched();
  }

  protected offeringsError(): string | null {
    const control = this.form.controls.offerings;
    return control.errors?.['noService'] && (this.submitted() || control.touched)
      ? 'Selecione pelo menos um serviço.'
      : null;
  }

  protected submit(): void {
    this.submitted.set(true);
    this.errorMessage.set(null);
    this.serverMessages.set([]);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      focusFirstInvalid(this.injector);
      return;
    }

    this.loading.set(true);
    const wasCreate = !this.isEdit();

    this.account.save(this.profileId(), this.toPayload()).subscribe({
      next: () => {
        // Salvo: nada pendente, então o guard de saída não pergunta mais nada
        this.form.markAsPristine();
        this.initialAreas.set(this.areas());
        void this.router.navigate(['/painel'], { queryParams: { salvo: wasCreate ? 'criado' : 'atualizado' } });
      },
      error: (error: unknown) => {
        const apiError = toApiError(error);

        const inline: Record<string, string> = {};
        const others: string[] = [];
        for (const [field, message] of Object.entries(apiError.fieldErrors)) {
          if (FIELDS_WITH_INLINE_ERROR.has(field)) {
            inline[field] = message;
          } else {
            others.push(message);
          }
        }
        applyServerErrors(this.form, inline);

        this.serverMessages.set(others);
        this.errorMessage.set(apiError.message);
        this.loading.set(false);
      },
    });
  }

  private toPayload(): ProviderProfilePayload {
    const value = this.form.getRawValue();

    return {
      professionalName: value.professionalName.trim(),
      description: value.description.trim() || null,
      whatsapp: value.whatsapp.trim(),
      city: value.city.trim(),
      serviceAreas: this.areas(),
      offerings: value.offerings
        .filter((offering) => offering.selected)
        .map((offering) => ({
          categoryId: offering.categoryId,
          priceInfo: offering.priceInfo.trim() || null,
        })),
      available: value.available,
    };
  }
}
