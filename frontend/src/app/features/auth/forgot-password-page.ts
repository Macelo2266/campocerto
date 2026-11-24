import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-forgot-password-page',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  templateUrl: './forgot-password-page.html',
})
export class ForgotPasswordPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  /** Guarda o e-mail para repetir na mensagem de confirmação. */
  protected readonly sentTo = signal<string | null>(null);
  protected readonly fieldError = fieldError;

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const email = this.form.getRawValue().email.trim();

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.sentTo.set(email);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.errorMessage.set(toApiError(error).message);
        this.loading.set(false);
      },
    });
  }

  protected tryAnother(): void {
    this.sentTo.set(null);
    this.form.reset();
  }
}
