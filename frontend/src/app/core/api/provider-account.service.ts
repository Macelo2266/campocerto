import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

import { ProviderProfile, ProviderProfilePayload } from '../models/provider.model';

@Injectable({ providedIn: 'root' })
export class ProviderAccountService {
  private readonly http = inject(HttpClient);

  /** Devolve null quando a pessoa ainda não criou o perfil (o backend responde 404 nesse caso). */
  getMine(): Observable<ProviderProfile | null> {
    return this.http.get<ProviderProfile>('/api/providers/me').pipe(
      catchError((error: unknown) =>
        error instanceof HttpErrorResponse && error.status === 404 ? of(null) : throwError(() => error),
      ),
    );
  }

  /** Sem perfil ainda: cria (POST). Com perfil: atualiza (PUT). */
  save(profileId: number | null, payload: ProviderProfilePayload): Observable<ProviderProfile> {
    return profileId === null
      ? this.http.post<ProviderProfile>('/api/providers/profile', payload)
      : this.http.put<ProviderProfile>('/api/providers/profile', payload);
  }
}

/** Monta o PUT completo a partir do perfil carregado (usado para pausar/retomar os pedidos). */
export function toProfilePayload(profile: ProviderProfile, available: boolean): ProviderProfilePayload {
  return {
    professionalName: profile.professionalName,
    description: profile.description,
    whatsapp: profile.whatsapp,
    city: profile.city,
    serviceAreas: profile.serviceAreas,
    offerings: profile.offerings.map((o) => ({ categoryId: o.categoryId, priceInfo: o.priceInfo })),
    available,
  };
}
