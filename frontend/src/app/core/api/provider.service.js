import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import * as i0 from "@angular/core";
export class ProviderService {
    http = inject(HttpClient);
    cities$ = this.http.get('/api/providers/cities').pipe(shareReplay(1));
    search(query) {
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
        return this.http.get('/api/providers', { params });
    }
    get(id) {
        return this.http.get(`/api/providers/${id}`);
    }
    cities() {
        return this.cities$;
    }
    /** Gera o link de WhatsApp no backend, que mantém o telefone privado. */
    whatsappLink(providerId, categoryId) {
        let params = new HttpParams();
        if (categoryId !== null) {
            params = params.set('categoryId', String(categoryId));
        }
        return this.http.get(`/api/providers/${providerId}/whatsapp`, { params });
    }
    /** @param page começa em 0 */
    reviews(id, page, size) {
        const params = new HttpParams().set('page', String(page)).set('size', String(size));
        return this.http.get(`/api/providers/${id}/reviews`, { params });
    }
    static ɵfac = function ProviderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProviderService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProviderService, factory: ProviderService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProviderService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
