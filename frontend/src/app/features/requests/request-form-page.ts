import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { throwError } from 'rxjs';

import { ProviderService } from '../../core/api/provider.service';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { focusFirstInvalid } from '../../core/forms/focus';
import { minTrimmedLength, notBlank, notInPast } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { ProviderPublic } from '../../core/models/provider.model';
import { todayIso } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { parsePositiveInt } from '../providers/search-query';

@Component({
  selector: 'app-request-form-page',
  imports: [ReactiveFormsModule, RouterLink, LoadingState, EmptyState, ErrorState],
  templateUrl: './request-form-page.html',
})
export class RequestFormPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly providerService = inject(ProviderService);
  private readonly requestService = inject(ServiceRequestService);

  // :id da rota e ?servico= da URL (withComponentInputBinding)
  readonly id = input.required<string>();
  readonly servico = input<string>();

  private readonly providerId = computed(() => parsePositiveInt(this.id()));

  protected readonly profile = loadResource(
    () => this.providerId(),
    (id) =>
      id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 }))
        : this.providerService.get(id),
  );

  protected readonly today = todayIso();

  protected readonly form = this.fb.group({
    categoryId: this.fb.control<number | null>(null, Validators.required),
    description: ['', [notBlank, minTrimmedLength(10), Validators.maxLength(2000)]],
    city: ['', [notBlank, Validators.maxLength(100)]],
    desiredDate: ['', [notInPast]],
    additionalInfo: ['', [Validators.maxLength(1000)]],
  });

  private readonly selectedId = toSignal(this.form.controls.categoryId.valueChanges, {
    initialValue: this.form.controls.categoryId.value,
  });

  protected readonly selectedOffering = computed(() => {
    const state = this.profile.state();
    const id = this.selectedId();
    return state.status === 'ready' ? (state.data.offerings.find((o) => o.categoryId === id) ?? null) : null;
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly errorStatus = signal<number | null>(null);
  protected readonly fieldError = fieldError;

  constructor() {
    // Escolhe o serviço sozinho: o que veio na URL, ou o único que o prestador oferece
    effect(() => {
      const state = this.profile.state();
      if (state.status !== 'ready') {
        return;
      }
      const wanted = parsePositiveInt(this.servico());
      const offerings = state.data.offerings;

      untracked(() => {
        const control = this.form.controls.categoryId;
        if (control.value !== null) {
          return;
        }
        const match = offerings.find((o) => o.categoryId === wanted) ?? (offerings.length === 1 ? offerings[0] : undefined);
        if (match) {
          control.setValue(match.categoryId);
        }
      });
    });
  }

  protected submit(provider: ProviderPublic): void {
    const value = this.form.getRawValue();

    if (this.form.invalid || value.categoryId === null) {
      this.form.markAllAsTouched();
      focusFirstInvalid(this.injector);
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);
    this.errorStatus.set(null);

    this.requestService
      .create({
        providerId: provider.id,
        categoryId: value.categoryId,
        description: value.description.trim(),
        city: value.city.trim(),
        desiredDate: value.desiredDate || null,
        additionalInfo: value.additionalInfo.trim() || null,
      })
      .subscribe({
        next: (created) => {
          void this.router.navigate(['/solicitacoes', created.id], { queryParams: { criada: 1 } });
        },
        error: (error: unknown) => {
          const apiError = toApiError(error);
          applyServerErrors(this.form, apiError.fieldErrors);
          this.errorMessage.set(apiError.message);
          this.errorStatus.set(apiError.status);
          this.loading.set(false);
        },
      });
  }
}
