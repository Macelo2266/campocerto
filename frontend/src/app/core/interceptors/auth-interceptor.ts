import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { SILENT_UNAUTHORIZED } from '../http/http-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.token();

  // O token só vai para a NOSSA API, e nunca para login/cadastro nem para outros domínios
  const attachToken = token !== null && req.url.startsWith('/api/') && !req.url.startsWith('/api/auth/');

  const request = attachToken ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      const sessionEnded =
        attachToken &&
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.context.get(SILENT_UNAUTHORIZED);

      if (sessionEnded) {
        auth.logout();
        if (!router.url.startsWith('/entrar')) {
          void router.navigate(['/entrar'], { queryParams: { returnUrl: router.url, expirou: 1 } });
        }
      }
      return throwError(() => error);
    }),
  );
};
