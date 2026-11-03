import {
  Component,
  DestroyRef,
  Injector,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AdminService } from '../../core/api/admin.service';
import { CategoryService } from '../../core/api/category.service';
import { focusElementAfterRender, focusFirstInvalid } from '../../core/forms/focus';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { notBlank } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { Category } from '../../core/models/category.model';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';

function sortByName(list: Category[]): Category[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

@Component({
  selector: 'app-admin-categories-page',
  imports: [ReactiveFormsModule, ConfirmDialog, LoadingState, ErrorState],
  templateUrl: './categories-page.html',
})
export class AdminCategoriesPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly admin = inject(AdminService);
  private readonly publicCategories = inject(CategoryService);

  protected readonly categories = loadResource(() => null, () => this.admin.listCategories());

  /** Cópia local da lista: create/edit/desativar alteram só a linha afetada. */
  protected readonly items = signal<Category[]>([]);

  protected readonly form = this.fb.group({
    name: ['', [notBlank, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
  });

  protected readonly editing = signal<Category | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);
  protected readonly announcement = signal('');
  protected readonly pageError = signal<string | null>(null);

  protected readonly pendingDeactivation = signal<Category | null>(null);
  protected readonly busy = signal(false);
  protected readonly dialogError = signal<string | null>(null);

  protected readonly isEditing = computed(() => this.editing() !== null);
  protected readonly fieldError = fieldError;

  private readonly confirmDialog = viewChild.required(ConfirmDialog);

  constructor() {
    effect(() => {
      const state = this.categories.state();
      if (state.status === 'ready') {
        untracked(() => this.items.set(sortByName(state.data)));
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      focusFirstInvalid(this.injector);
      return;
    }

    const value = this.form.getRawValue();
    const payload = { name: value.name.trim(), description: value.description.trim() || null };
    const editing = this.editing();

    this.saving.set(true);
    this.formError.set(null);

    const request$ = editing
      ? this.admin.updateCategory(editing.id, payload)
      : this.admin.createCategory(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.items.update((list) => sortByName([...list.filter((item) => item.id !== saved.id), saved]));
        this.publicCategories.invalidate();
        this.announcement.set(editing ? `Categoria atualizada: ${saved.name}.` : `Categoria criada: ${saved.name}.`);
        this.resetForm();
        this.saving.set(false);
        focusElementAfterRender(this.injector, `category-${saved.id}`);
      },
      error: (error: unknown) => {
        const apiError = toApiError(error);
        applyServerErrors(this.form, apiError.fieldErrors);
        this.formError.set(apiError.message);
        this.saving.set(false);
      },
    });
  }

  protected edit(category: Category): void {
    this.editing.set(category);
    this.announcement.set('');
    this.formError.set(null);
    this.form.reset({ name: category.name, description: category.description ?? '' });
    focusElementAfterRender(this.injector, 'category-name');
  }

  protected cancelEdit(): void {
    const editing = this.editing();
    this.resetForm();
    this.formError.set(null);
    if (editing) {
      focusElementAfterRender(this.injector, `category-${editing.id}`);
    }
  }

  protected requestDeactivation(category: Category): void {
    this.pageError.set(null);
    this.dialogError.set(null);
    this.pendingDeactivation.set(category);
    this.confirmDialog().open();
  }

  protected confirmDeactivation(): void {
    const category = this.pendingDeactivation();
    if (!category) {
      return;
    }

    this.busy.set(true);
    this.admin
      .deactivateCategory(category.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.items.update((list) => list.map((item) => (item.id === category.id ? { ...item, active: false } : item)));
          this.publicCategories.invalidate();
          this.announcement.set(`Categoria desativada: ${category.name}.`);
          this.busy.set(false);
          this.confirmDialog().close();
          focusElementAfterRender(this.injector, `category-${category.id}`);
        },
        error: (error: unknown) => {
          this.dialogError.set(toApiError(error).message);
          this.busy.set(false);
        },
      });
  }

  protected reactivate(category: Category): void {
    this.pageError.set(null);
    this.busy.set(true);

    this.admin
      .reactivateCategory(category.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fresh) => {
          this.items.update((list) => list.map((item) => (item.id === fresh.id ? fresh : item)));
          this.publicCategories.invalidate();
          this.announcement.set(`Categoria reativada: ${fresh.name}.`);
          this.busy.set(false);
          focusElementAfterRender(this.injector, `category-${fresh.id}`);
        },
        error: (error: unknown) => {
          this.pageError.set(toApiError(error).message);
          this.busy.set(false);
        },
      });
  }

  protected onDialogClosed(): void {
    this.pendingDeactivation.set(null);
    this.dialogError.set(null);
  }

  private resetForm(): void {
    this.editing.set(null);
    this.form.reset({ name: '', description: '' });
  }
}
