import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import * as i0 from "@angular/core";
export class ServiceRequestService {
    http = inject(HttpClient);
    create(payload) {
        return this.http.post('/api/service-requests', payload);
    }
    /** Solicitações que EU fiz (agricultor). @param page começa em 0 */
    listMine(status, page, size) {
        return this.http.get('/api/service-requests/me', {
            params: this.listParams(status, page, size),
        });
    }
    /** Solicitações que RECEBI (prestador). @param page começa em 0 */
    listReceived(status, page, size) {
        return this.http.get('/api/providers/me/service-requests', {
            params: this.listParams(status, page, size),
        });
    }
    get(id) {
        return this.http.get(`/api/service-requests/${id}`);
    }
    changeStatus(id, status) {
        return this.http.patch(`/api/service-requests/${id}/status`, { status });
    }
    /** Devolve null quando o serviço ainda não foi avaliado (o backend responde 404 nesse caso). */
    getReview(id) {
        return this.http.get(`/api/service-requests/${id}/review`).pipe(catchError((error) => error instanceof HttpErrorResponse && error.status === 404 ? of(null) : throwError(() => error)));
    }
    createReview(id, payload) {
        return this.http.post(`/api/service-requests/${id}/reviews`, payload);
    }
    listParams(status, page, size) {
        let params = new HttpParams().set('page', String(page)).set('size', String(size));
        if (status !== null) {
            params = params.set('status', status);
        }
        return params;
    }
    static ɵfac = function ServiceRequestService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ServiceRequestService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ServiceRequestService, factory: ServiceRequestService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ServiceRequestService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
