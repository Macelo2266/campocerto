import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class AdminService {
    http = inject(HttpClient);
    stats() {
        return this.http.get('/api/admin/stats');
    }
    /** @param page começa em 0 */
    listUsers(filters, page, size) {
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
        return this.http.get('/api/admin/users', { params });
    }
    changeUserStatus(id, status) {
        return this.http.patch(`/api/admin/users/${id}/status`, { status });
    }
    listReviews(status, page, size) {
        let params = this.pageParams(page, size);
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get('/api/admin/reviews', { params });
    }
    changeReviewStatus(id, status) {
        return this.http.patch(`/api/admin/reviews/${id}/status`, { status });
    }
    listRequests(status, page, size) {
        let params = this.pageParams(page, size);
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get('/api/admin/service-requests', { params });
    }
    listCategories() {
        return this.http.get('/api/admin/categories');
    }
    createCategory(payload) {
        return this.http.post('/api/admin/categories', payload);
    }
    updateCategory(id, payload) {
        return this.http.put(`/api/admin/categories/${id}`, payload);
    }
    /** O DELETE do backend só desativa (204, sem corpo). Nada é apagado de verdade. */
    deactivateCategory(id) {
        return this.http.delete(`/api/admin/categories/${id}`);
    }
    reactivateCategory(id) {
        return this.http.patch(`/api/admin/categories/${id}/reactivate`, {});
    }
    pageParams(page, size) {
        return new HttpParams().set('page', String(page)).set('size', String(size));
    }
    static ɵfac = function AdminService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
