import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom, map, tap } from 'rxjs';
import { SILENT_UNAUTHORIZED } from '../http/http-context';
import { isTokenExpired } from './jwt';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'campocerto.token';
export class AuthService {
    http = inject(HttpClient);
    tokenState = signal(this.loadStoredToken(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tokenState" }] : /* istanbul ignore next */ []));
    userState = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "userState" }] : /* istanbul ignore next */ []));
    token = this.tokenState.asReadonly();
    user = this.userState.asReadonly();
    isLoggedIn = computed(() => this.tokenState() !== null && this.userState() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoggedIn" }] : /* istanbul ignore next */ []));
    role = computed(() => this.userState()?.role ?? null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "role" }] : /* istanbul ignore next */ []));
    login(payload) {
        return this.http.post('/api/auth/login', payload).pipe(tap((response) => this.startSession(response)), map((response) => response.user));
    }
    register(payload) {
        return this.http.post('/api/auth/register', payload).pipe(tap((response) => this.startSession(response)), map((response) => response.user));
    }
    /** Busca os dados atuais do usuário no servidor (também confirma que o token ainda vale). */
    refreshUser(silent = false) {
        const context = new HttpContext().set(SILENT_UNAUTHORIZED, silent);
        return this.http
            .get('/api/users/me', { context })
            .pipe(tap((user) => this.userState.set(user)));
    }
    /** Roda uma vez ao abrir o app: se há token guardado, descobre quem é o usuário. */
    async restoreSession() {
        if (this.tokenState() === null) {
            return;
        }
        try {
            await firstValueFrom(this.refreshUser(true));
        }
        catch {
            // Token recusado ou servidor fora do ar: seguimos como visitante
            this.logout();
        }
    }
    logout() {
        this.persistToken(null);
        this.tokenState.set(null);
        this.userState.set(null);
    }
    startSession(response) {
        this.persistToken(response.accessToken);
        this.tokenState.set(response.accessToken);
        this.userState.set(response.user);
    }
    loadStoredToken() {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token && !isTokenExpired(token)) {
                return token;
            }
            if (token) {
                localStorage.removeItem(TOKEN_KEY);
            }
        }
        catch {
            // Armazenamento bloqueado (ex.: navegação anônima restrita): seguimos sem sessão salva
        }
        return null;
    }
    persistToken(token) {
        try {
            if (token) {
                localStorage.setItem(TOKEN_KEY, token);
            }
            else {
                localStorage.removeItem(TOKEN_KEY);
            }
        }
        catch {
            // Sem armazenamento, a sessão dura só até recarregar a página
        }
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
