import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Page } from '../models/page.model';
import {
  ProviderPublic,
  ProviderSearchQuery,
  ProviderSummary,
  Review,
  WhatsappLink,
} from '../models/provider.model';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private readonly http = inject(HttpClient);

  private readonly cities$ = this.http.get<string[]>('/api/providers/cities').pipe(shareReplay(1));

  search(query: ProviderSearchQuery): Observable<Page<ProviderSummary>> {
    let params = new HttpParams()
      .set('sort', query.sort)
      .set('page', String(query.page - 1)) // a tela conta de 1, a API conta de 0
      .set('size', String(query.size));

    if (query.q.trim()) {
      params = params.set('q', query.q.trim());
    }
    if (query.category !== null) {
      params = params.set('category', String(query.category));
    }
    if (query.city.trim()) {
      params = params.set('city', query.city.trim());
    }

    return this.http.get<Page<ProviderSummary>>('/api/providers', { params });
  }

  get(id: number): Observable<ProviderPublic> {
    return this.http.get<ProviderPublic>(`/api/providers/${id}`);
  }

  cities(): Observable<string[]> {
    return this.cities$;
  }

  /** Gera o link de WhatsApp no backend, que mantém o telefone privado. */
  whatsappLink(providerId: number, categoryId: number | null): Observable<WhatsappLink> {
    let params = new HttpParams();
    if (categoryId !== null) {
      params = params.set('categoryId', String(categoryId));
    }
    return this.http.get<WhatsappLink>(`/api/providers/${providerId}/whatsapp`, { params });
  }

  /** @param page começa em 0 */
  reviews(id: number, page: number, size: number): Observable<Page<Review>> {
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get<Page<Review>>(`/api/providers/${id}/reviews`, { params });
  }
}
