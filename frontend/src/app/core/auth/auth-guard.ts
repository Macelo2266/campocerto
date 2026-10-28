import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserRole } from '../models/user.model';
import { AuthService } from './auth.service';

/** Só para quem está logado. Visitante vai para o login e volta depois. */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/entrar'], { queryParams: { returnUrl: state.url } });
};

/** Só para visitantes (telas de login e cadastro). Quem já entrou vai para o início. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() ? router.createUrlTree(['/']) : true;
};

/** Só para certos papéis. Usaremos nos painéis do prestador e do administrador. */
export const roleGuard = (...allowed: UserRole[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const role = auth.role();
    return role !== null && allowed.includes(role) ? true : router.createUrlTree(['/']);
  };
};
