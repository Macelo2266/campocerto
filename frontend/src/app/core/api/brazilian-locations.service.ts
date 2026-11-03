import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

export interface BrazilianState {
  id: number;
  sigla: string;
  nome: string;
}

export interface BrazilianCity {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class BrazilianLocationsService {
  private readonly http = inject(HttpClient);
  private readonly states$ = this.http
    .get<BrazilianState[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  states(): Observable<BrazilianState[]> {
    return this.states$;
  }

  cities(stateCode: string): Observable<BrazilianCity[]> {
    return this.http
      .get<BrazilianCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${encodeURIComponent(stateCode)}/municipios?orderBy=nome`)
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));
  }
}
