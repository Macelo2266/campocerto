import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ROLE_LABELS } from '../../core/models/user.model';
import * as i0 from "@angular/core";
function AccountPage_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "section", 0)(1, "div", 1)(2, "h1");
    i0.ɵɵtext(3, "Minha conta");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "dl", 2)(5, "dt");
    i0.ɵɵtext(6, "Nome");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "dd");
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "dt");
    i0.ɵɵtext(10, "E-mail");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "dd");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "dt");
    i0.ɵɵtext(14, "Celular");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(17, "dt");
    i0.ɵɵtext(18, "Tipo de conta");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(19, "dd");
    i0.ɵɵtext(20);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(21, "button", 3);
    i0.ɵɵdomListener("click", function AccountPage_Conditional_0_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(22, "Sair da conta");
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const user_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(user_r3.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(user_r3.email);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(user_r3.phone ?? "N\u00E3o informado");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.roleLabel(user_r3.role));
} }
export class AccountPage {
    auth = inject(AuthService);
    router = inject(Router);
    constructor() {
        // Confirma no servidor que a conta continua ativa e traz os dados mais recentes.
        // Se o token foi recusado (401), o interceptor já leva a pessoa ao login.
        this.auth
            .refreshUser()
            .pipe(takeUntilDestroyed())
            .subscribe({ error: () => undefined });
    }
    roleLabel(role) {
        return ROLE_LABELS[role];
    }
    logout() {
        this.auth.logout();
        void this.router.navigateByUrl('/');
    }
    static ɵfac = function AccountPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountPage, selectors: [["app-account-page"]], decls: 1, vars: 1, consts: [[1, "page-narrow"], [1, "card"], [1, "data-list"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"]], template: function AccountPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, AccountPage_Conditional_0_Template, 23, 4, "section", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.auth.user()) ? 0 : -1, tmp_0_0);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountPage, [{
        type: Component,
        args: [{ selector: 'app-account-page', template: "@if (auth.user(); as user) {\n  <section class=\"page-narrow\">\n    <div class=\"card\">\n      <h1>Minha conta</h1>\n\n      <dl class=\"data-list\">\n        <dt>Nome</dt>\n        <dd>{{ user.name }}</dd>\n\n        <dt>E-mail</dt>\n        <dd>{{ user.email }}</dd>\n\n        <dt>Celular</dt>\n        <dd>{{ user.phone ?? 'N\u00E3o informado' }}</dd>\n\n        <dt>Tipo de conta</dt>\n        <dd>{{ roleLabel(user.role) }}</dd>\n      </dl>\n\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"logout()\">Sair da conta</button>\n    </div>\n  </section>\n}\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountPage, { className: "AccountPage", filePath: "src/app/features/account/account-page.ts", lineNumber: 12 }); })();
