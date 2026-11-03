import { Component, Injector, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ServiceRequestService } from '../../core/api/service-request.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { focusFirstInvalid } from '../../core/forms/focus';
import { toApiError } from '../../core/http/api-error';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html',
})
export class ReviewForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly requests = inject(ServiceRequestService);
  private readonly injector = inject(Injector);

  readonly requestId = input.required<number>();
  /** Avisa a tela que algo mudou (avaliação criada, ou já existia): ela recarrega os dados. */
  readonly changed = output<void>();

  protected readonly options = [
    { value: 5, label: '5 - Excelente' },
    { value: 4, label: '4 - Muito bom' },
    { value: 3, label: '3 - Bom' },
    { value: 2, label: '2 - Regular' },
    { value: 1, label: '1 - Ruim' },
  ];

  protected readonly form = this.fb.group({
    rating: this.fb.control<number | null>(null, Validators.required),
    comment: ['', [Validators.maxLength(1000)]],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly fieldError = fieldError;

  protected submit(): void {
    const { rating, comment } = this.form.getRawValue();

    if (this.form.invalid || rating === null) {
      this.form.markAllAsTouched();
      focusFirstInvalid(this.injector);
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.requests.createReview(this.requestId(), { rating, comment: comment.trim() || null }).subscribe({
      next: () => {
        this.loading.set(false);
        this.changed.emit();
      },
      error: (error: unknown) => {
        const apiError = toApiError(error);
        applyServerErrors(this.form, apiError.fieldErrors);
        this.errorMessage.set(apiError.message);
        this.loading.set(false);
        if (apiError.status === 409) {
          // Já avaliada (ou não concluída): a tela busca o estado atual
          this.changed.emit();
        }
      },
    });
  }
}
