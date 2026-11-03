import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { homeRouteFor } from '../../core/auth/home-route';
import { AuthService } from '../../core/auth/auth.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { safeReturnUrl } from '../../core/util/safe-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = a0 => ({ returnUrl: a0 });
function LoginPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1, " Sua sess\u00E3o terminou. Entre novamente para continuar. ");
    i0.ɵɵelementEnd();
} }
function LoginPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function LoginPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function LoginPage_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
export class LoginPage {
    fb = inject(NonNullableFormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    // Ligados aos parâmetros da URL (?returnUrl=...&expirou=1) por withComponentInputBinding()
    returnUrl = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "returnUrl" }] : /* istanbul ignore next */ []));
    expirou = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "expirou" }] : /* istanbul ignore next */ []));
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
        password: ['', [Validators.required]],
    });
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    showPassword = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "showPassword" }] : /* istanbul ignore next */ []));
    fieldError = fieldError;
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading.set(true);
        this.errorMessage.set(null);
        this.auth.login(this.form.getRawValue()).subscribe({
            next: (user) => void this.router.navigateByUrl(safeReturnUrl(this.returnUrl(), homeRouteFor(user.role))),
            error: (error) => {
                const apiError = toApiError(error);
                applyServerErrors(this.form, apiError.fieldErrors);
                this.errorMessage.set(apiError.message);
                this.loading.set(false);
            },
        });
    }
    static ɵfac = function LoginPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPage, selectors: [["app-login-page"]], inputs: { returnUrl: [1, "returnUrl"], expirou: [1, "expirou"] }, decls: 26, vars: 17, consts: [[1, "page-narrow"], [1, "card"], ["role", "status", 1, "alert", "alert-info"], ["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "autocomplete", "email", "inputmode", "email", 1, "input"], ["id", "email-error", 1, "field-error"], ["for", "password"], ["id", "password", "formControlName", "password", "autocomplete", "current-password", 1, "input", 3, "type"], ["id", "password-error", 1, "field-error"], [1, "check"], ["type", "checkbox", 3, "change", "checked"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["routerLink", "/cadastrar", 3, "queryParams"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "Entrar");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(4, LoginPage_Conditional_4_Template, 2, 0, "div", 2);
            i0.ɵɵconditionalCreate(5, LoginPage_Conditional_5_Template, 2, 1, "div", 3);
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function LoginPage_Template_form_ngSubmit_6_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(7, "div", 5)(8, "label", 6);
            i0.ɵɵtext(9, "E-mail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, LoginPage_Conditional_11_Template, 2, 1, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 5)(13, "label", 9);
            i0.ɵɵtext(14, "Senha");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "input", 10);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(16, LoginPage_Conditional_16_Template, 2, 1, "p", 11);
            i0.ɵɵelementStart(17, "label", 12)(18, "input", 13);
            i0.ɵɵlistener("change", function LoginPage_Template_input_change_18_listener() { return ctx.showPassword.set(!ctx.showPassword()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19, " Mostrar senha ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "button", 14);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "p");
            i0.ɵɵtext(23, " Ainda n\u00E3o tem conta? ");
            i0.ɵɵelementStart(24, "a", 15);
            i0.ɵɵtext(25, "Cadastre-se");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_7_0;
            let tmp_12_0;
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.expirou() ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_1_0 = ctx.errorMessage()) ? 5 : -1, tmp_1_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵattribute("aria-busy", ctx.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.email) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.email) ? "email-error" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_7_0 = ctx.fieldError(ctx.form.controls.email)) ? 11 : -1, tmp_7_0);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showPassword() ? "text" : "password");
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.password) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.password) ? "password-error" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_12_0 = ctx.fieldError(ctx.form.controls.password)) ? 16 : -1, tmp_12_0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("checked", ctx.showPassword());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "Entrando..." : "Entrar", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("queryParams", ctx.returnUrl() ? i0.ɵɵpureFunction1(15, _c0, ctx.returnUrl()) : null);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPage, [{
        type: Component,
        args: [{ selector: 'app-login-page', imports: [ReactiveFormsModule, RouterLink], template: "<section class=\"page-narrow\">\n  <div class=\"card\">\n    <h1>Entrar</h1>\n\n    @if (expirou()) {\n      <div class=\"alert alert-info\" role=\"status\">\n        Sua sess\u00E3o terminou. Entre novamente para continuar.\n      </div>\n    }\n\n    @if (errorMessage(); as message) {\n      <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n    }\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate [attr.aria-busy]=\"loading()\">\n      <div class=\"field\">\n        <label for=\"email\">E-mail</label>\n        <input\n          id=\"email\"\n          class=\"input\"\n          type=\"email\"\n          formControlName=\"email\"\n          autocomplete=\"email\"\n          inputmode=\"email\"\n          [attr.aria-invalid]=\"fieldError(form.controls.email) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.email) ? 'email-error' : null\"\n        />\n        @if (fieldError(form.controls.email); as message) {\n          <p id=\"email-error\" class=\"field-error\">{{ message }}</p>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label for=\"password\">Senha</label>\n        <input\n          id=\"password\"\n          class=\"input\"\n          [type]=\"showPassword() ? 'text' : 'password'\"\n          formControlName=\"password\"\n          autocomplete=\"current-password\"\n          [attr.aria-invalid]=\"fieldError(form.controls.password) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.password) ? 'password-error' : null\"\n        />\n        @if (fieldError(form.controls.password); as message) {\n          <p id=\"password-error\" class=\"field-error\">{{ message }}</p>\n        }\n        <label class=\"check\">\n          <input type=\"checkbox\" [checked]=\"showPassword()\" (change)=\"showPassword.set(!showPassword())\" />\n          Mostrar senha\n        </label>\n      </div>\n\n      <button class=\"btn btn-primary btn-block\" type=\"submit\" [disabled]=\"loading()\">\n        {{ loading() ? 'Entrando...' : 'Entrar' }}\n      </button>\n    </form>\n\n    <p>\n      Ainda n\u00E3o tem conta?\n      <a routerLink=\"/cadastrar\" [queryParams]=\"returnUrl() ? { returnUrl: returnUrl() } : null\">Cadastre-se</a>\n    </p>\n  </div>\n</section>\n" }]
    }], null, { returnUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "returnUrl", required: false }] }], expirou: [{ type: i0.Input, args: [{ isSignal: true, alias: "expirou", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/features/auth/login-page.ts", lineNumber: 16 }); })();
