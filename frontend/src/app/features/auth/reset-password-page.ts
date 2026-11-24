import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { Icon } from '../../shared/icon/icon';

/** A confirmação precisa ser igual à senha digitada acima. */
const sameAsPassword: ValidatorFn = (control) => {
  const password = control.parent?.get('password')?.value;
  return control.value !== '' && control.value !== password ? { mismatch: true } : null;
};

@Component({
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  templateUrl: './reset-password-page.html',
})
export class ResetPasswordPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);

  // Vem do link do e-mail (?token=...), ligado por withComponentInputBinding()
  readonly token = input<string>();

  protected readonly form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
    confirm: ['', [Validators.required, sameAsPassword]],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly done = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly fieldError = fieldError;

  constructor() {
    // Mudou a senha: a confirmação precisa ser conferida de novo
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.form.controls.confirm.updateValueAndValidity());
  }

  protected submit(): void {
    const token = this.token();
    if (!token) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.resetPassword(token, this.form.getRawValue().password).subscribe({
      next: () => {
        this.done.set(true);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        const apiError = toApiError(error);
        applyServerErrors(this.form, apiError.fieldErrors);
        this.errorMessage.set(apiError.message);
        this.loading.set(false);
      },
    });
  }
}
