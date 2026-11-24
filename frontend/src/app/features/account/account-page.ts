import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { ROLE_LABELS, UserRole } from '../../core/models/user.model';
import { Avatar } from '../../shared/avatar/avatar';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-account-page',
  imports: [Avatar, Icon],
  templateUrl: './account-page.html',
})
export class AccountPage {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // Confirma no servidor que a conta continua ativa e traz os dados mais recentes.
    // Se o token foi recusado (401), o interceptor já leva a pessoa ao login.
    this.auth
      .refreshUser()
      .pipe(takeUntilDestroyed())
      .subscribe({ error: () => undefined });
  }

  protected roleLabel(role: UserRole): string {
    return ROLE_LABELS[role];
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }
}
