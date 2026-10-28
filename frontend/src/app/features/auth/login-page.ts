import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { safeReturnUrl } from '../../core/util/safe-url';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // Ligados aos parâmetros da URL (?returnUrl=...&expirou=1) por withComponentInputBinding()
  readonly returnUrl = input<string>();
  readonly expirou = input<string>();

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    password: ['', [Validators.required]],
  });

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showPassword = signal(false);
  protected readonly fieldError = fieldError;

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigateByUrl(safeReturnUrl(this.returnUrl())),
      error: (error: unknown) => {
        const apiError = toApiError(error);
        applyServerErrors(this.form, apiError.fieldErrors);
        this.errorMessage.set(apiError.message);
        this.loading.set(false);
      },
    });
  }
}
