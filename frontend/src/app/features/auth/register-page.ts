import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { AccountRole } from '../../core/models/user.model';
import { safeReturnUrl } from '../../core/util/safe-url';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly returnUrl = input<string>();

  protected readonly form = this.fb.group({
    role: this.fb.control<AccountRole>('FARMER', Validators.required),
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', [Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
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

    const value = this.form.getRawValue();

    this.auth
      .register({
        role: value.role,
        name: value.name.trim(),
        email: value.email.trim(),
        phone: value.phone.trim() || null,
        password: value.password,
      })
      .subscribe({
        next: (user) => {
          const fallback = user.role === 'PROVIDER' ? '/conta' : '/';
          void this.router.navigateByUrl(safeReturnUrl(this.returnUrl(), fallback));
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
