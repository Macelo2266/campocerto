import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { SILENT_UNAUTHORIZED } from '../http/http-context';

const API_SERVER_URL = 'https://campocerto.onrender.com';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isServer = isPlatformServer(platformId);
  const isApiRequest = req.url.startsWith('/api/');

  // No SSR, chama o backend diretamente.
  // No navegador, mantém o caminho relativo e usa o proxy da Netlify.
  const apiRequest =
    isServer && isApiRequest
      ? req.clone({ url: `${API_SERVER_URL}${req.url}` })
      : req;

  const token = auth.token();

  const attachToken =
    token !== null &&
    isApiRequest &&
    !req.url.startsWith('/api/auth/');

  const request = attachToken
    ? apiRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
    : apiRequest;

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
          void router.navigate(['/entrar'], {
            queryParams: {
              returnUrl: router.url,
              expirou: 1,
            },
          });
        }
      }

      return throwError(() => error);
    }),
  );
};
