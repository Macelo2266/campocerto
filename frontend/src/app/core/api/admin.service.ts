import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AdminReview, AdminServiceRequest, AdminStats, AdminUser, ReviewStatus, UserStatus } from '../models/admin.model';
import { Category, CategoryPayload } from '../models/category.model';
import { Page } from '../models/page.model';
import { ServiceRequestStatus } from '../models/service-request.model';
import { UserRole } from '../models/user.model';

export interface UserFilters {
  q: string;
  role: UserRole | null;
  status: UserStatus | null;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);

  stats(): Observable<AdminStats> {
    return this.http.get<AdminStats>('/api/admin/stats');
  }

  /** @param page começa em 0 */
  listUsers(filters: UserFilters, page: number, size: number): Observable<Page<AdminUser>> {
    let params = this.pageParams(page, size);
    if (filters.q.trim()) {
      params = params.set('q', filters.q.trim());
    }
    if (filters.role) {
      params = params.set('role', filters.role);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    return this.http.get<Page<AdminUser>>('/api/admin/users', { params });
  }

  changeUserStatus(id: number, status: UserStatus): Observable<AdminUser> {
    return this.http.patch<AdminUser>(`/api/admin/users/${id}/status`, { status });
  }

  listReviews(status: ReviewStatus | null, page: number, size: number): Observable<Page<AdminReview>> {
    let params = this.pageParams(page, size);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Page<AdminReview>>('/api/admin/reviews', { params });
  }

  changeReviewStatus(id: number, status: ReviewStatus): Observable<AdminReview> {
    return this.http.patch<AdminReview>(`/api/admin/reviews/${id}/status`, { status });
  }

  listRequests(status: ServiceRequestStatus | null, page: number, size: number): Observable<Page<AdminServiceRequest>> {
    let params = this.pageParams(page, size);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Page<AdminServiceRequest>>('/api/admin/service-requests', { params });
  }

  listCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/admin/categories');
  }

  createCategory(payload: CategoryPayload): Observable<Category> {
    return this.http.post<Category>('/api/admin/categories', payload);
  }

  updateCategory(id: number, payload: CategoryPayload): Observable<Category> {
    return this.http.put<Category>(`/api/admin/categories/${id}`, payload);
  }

  /** O DELETE do backend só desativa (204, sem corpo). Nada é apagado de verdade. */
  deactivateCategory(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/categories/${id}`);
  }

  reactivateCategory(id: number): Observable<Category> {
    return this.http.patch<Category>(`/api/admin/categories/${id}/reactivate`, {});
  }

  private pageParams(page: number, size: number): HttpParams {
    return new HttpParams().set('page', String(page)).set('size', String(size));
  }
}
