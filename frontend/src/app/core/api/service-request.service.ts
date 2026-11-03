import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

import { Page } from '../models/page.model';
import { Review } from '../models/provider.model';
import {
  CreateServiceRequestPayload,
  ReviewPayload,
  ServiceRequest,
  ServiceRequestStatus,
} from '../models/service-request.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
  private readonly http = inject(HttpClient);

  create(payload: CreateServiceRequestPayload): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>('/api/service-requests', payload);
  }

  /** Solicitações que EU fiz (agricultor). @param page começa em 0 */
  listMine(status: ServiceRequestStatus | null, page: number, size: number): Observable<Page<ServiceRequest>> {
    return this.http.get<Page<ServiceRequest>>('/api/service-requests/me', {
      params: this.listParams(status, page, size),
    });
  }

  /** Solicitações que RECEBI (prestador). @param page começa em 0 */
  listReceived(status: ServiceRequestStatus | null, page: number, size: number): Observable<Page<ServiceRequest>> {
    return this.http.get<Page<ServiceRequest>>('/api/providers/me/service-requests', {
      params: this.listParams(status, page, size),
    });
  }

  get(id: number): Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`/api/service-requests/${id}`);
  }

  changeStatus(id: number, status: ServiceRequestStatus): Observable<ServiceRequest> {
    return this.http.patch<ServiceRequest>(`/api/service-requests/${id}/status`, { status });
  }

  /** Devolve null quando o serviço ainda não foi avaliado (o backend responde 404 nesse caso). */
  getReview(id: number): Observable<Review | null> {
    return this.http.get<Review>(`/api/service-requests/${id}/review`).pipe(
      catchError((error: unknown) =>
        error instanceof HttpErrorResponse && error.status === 404 ? of(null) : throwError(() => error),
      ),
    );
  }

  createReview(id: number, payload: ReviewPayload): Observable<Review> {
    return this.http.post<Review>(`/api/service-requests/${id}/reviews`, payload);
  }

  private listParams(status: ServiceRequestStatus | null, page: number, size: number): HttpParams {
    let params = new HttpParams().set('page', String(page)).set('size', String(size));
    if (status !== null) {
      params = params.set('status', status);
    }
    return params;
  }
}
