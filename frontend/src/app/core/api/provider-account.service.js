import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import * as i0 from "@angular/core";
export class ProviderAccountService {
    http = inject(HttpClient);
    /** Devolve null quando a pessoa ainda não criou o perfil (o backend responde 404 nesse caso). */
    getMine() {
        return this.http.get('/api/providers/me').pipe(catchError((error) => error instanceof HttpErrorResponse && error.status === 404 ? of(null) : throwError(() => error)));
    }
    /** Sem perfil ainda: cria (POST). Com perfil: atualiza (PUT). */
    save(profileId, payload) {
        return profileId === null
            ? this.http.post('/api/providers/profile', payload)
            : this.http.put('/api/providers/profile', payload);
    }
    static ɵfac = function ProviderAccountService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProviderAccountService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProviderAccountService, factory: ProviderAccountService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProviderAccountService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
/** Monta o PUT completo a partir do perfil carregado (usado para pausar/retomar os pedidos). */
export function toProfilePayload(profile, available) {
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
