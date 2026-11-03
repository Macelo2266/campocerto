import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import * as i0 from "@angular/core";
export class CategoryService {
    http = inject(HttpClient);
    cache$ = null;
    // A lista muda raramente: buscamos uma vez e reaproveitamos.
    // Se a requisição falhar, o shareReplay não guarda o erro e a próxima tentativa busca de novo.
    list() {
        this.cache$ ??= this.http.get('/api/categories').pipe(shareReplay(1));
        return this.cache$;
    }
    /** Esquece a lista guardada: a próxima tela que pedir busca de novo no servidor. */
    invalidate() {
        this.cache$ = null;
    }
    static ɵfac = function CategoryService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CategoryService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CategoryService, factory: CategoryService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CategoryService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
