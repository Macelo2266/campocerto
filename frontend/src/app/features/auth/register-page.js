import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { toApiError } from '../../core/http/api-error';
import { safeReturnUrl } from '../../core/util/safe-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = a0 => ({ returnUrl: a0 });
function RegisterPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RegisterPage_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RegisterPage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RegisterPage_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RegisterPage_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
export class RegisterPage {
    fb = inject(NonNullableFormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    returnUrl = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "returnUrl" }] : /* istanbul ignore next */ []));
    form = this.fb.group({
        role: this.fb.control('FARMER', Validators.required),
        name: ['', [Validators.required, Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
        phone: ['', [Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(72)]],
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
        const value = this.form.getRawValue();
        this.auth
            .register({
            role: value.role,
            name: value.name.trim(),
            email: value.email.trim(),
            phone: value.phone.trim() || null,
            password: value.password,
        })
            .subscribe({
            next: (user) => {
                // Quem acabou de se cadastrar como prestador vai direto criar o perfil
                const fallback = user.role === 'PROVIDER' ? '/painel/perfil' : '/';
                void this.router.navigateByUrl(safeReturnUrl(this.returnUrl(), fallback));
            },
            error: (error) => {
                const apiError = toApiError(error);
                applyServerErrors(this.form, apiError.fieldErrors);
                this.errorMessage.set(apiError.message);
                this.loading.set(false);
            },
        });
    }
    static ɵfac = function RegisterPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterPage, selectors: [["app-register-page"]], inputs: { returnUrl: [1, "returnUrl"] }, decls: 56, vars: 22, consts: [[1, "page-narrow"], [1, "card"], ["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "choice"], ["type", "radio", "formControlName", "role", "value", "FARMER"], [1, "hint"], ["type", "radio", "formControlName", "role", "value", "PROVIDER"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "autocomplete", "name", 1, "input"], ["id", "name-error", 1, "field-error"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "autocomplete", "email", "inputmode", "email", 1, "input"], ["id", "email-error", 1, "field-error"], ["for", "phone"], ["id", "phone", "type", "tel", "formControlName", "phone", "autocomplete", "tel", "inputmode", "tel", "placeholder", "(83) 99999-0000", 1, "input"], ["id", "phone-error", 1, "field-error"], ["for", "password"], ["id", "password", "formControlName", "password", "autocomplete", "new-password", 1, "input", 3, "type"], ["id", "password-hint", 1, "hint"], ["id", "password-error", 1, "field-error"], [1, "check"], ["type", "checkbox", 3, "change", "checked"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["routerLink", "/entrar", 3, "queryParams"]], template: function RegisterPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "Criar conta");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(4, RegisterPage_Conditional_4_Template, 2, 1, "div", 2);
            i0.ɵɵelementStart(5, "form", 3);
            i0.ɵɵlistener("ngSubmit", function RegisterPage_Template_form_ngSubmit_5_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(6, "fieldset", 4)(7, "legend");
            i0.ɵɵtext(8, "Como voc\u00EA vai usar o CampoCerto?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "label", 5)(10, "input", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span")(12, "strong");
            i0.ɵɵtext(13, "Sou agricultor");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "br");
            i0.ɵɵelementStart(15, "span", 7);
            i0.ɵɵtext(16, "Quero contratar servi\u00E7os rurais.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "label", 5)(18, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span")(20, "strong");
            i0.ɵɵtext(21, "Sou prestador de servi\u00E7os");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(22, "br");
            i0.ɵɵelementStart(23, "span", 7);
            i0.ɵɵtext(24, "Quero oferecer o meu trabalho.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "div", 4)(26, "label", 9);
            i0.ɵɵtext(27, "Nome completo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "input", 10);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(29, RegisterPage_Conditional_29_Template, 2, 1, "p", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 4)(31, "label", 12);
            i0.ɵɵtext(32, "E-mail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "input", 13);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(34, RegisterPage_Conditional_34_Template, 2, 1, "p", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 4)(36, "label", 15);
            i0.ɵɵtext(37, "Celular com DDD (opcional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "input", 16);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(39, RegisterPage_Conditional_39_Template, 2, 1, "p", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 4)(41, "label", 18);
            i0.ɵɵtext(42, "Senha");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "input", 19);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "p", 20);
            i0.ɵɵtext(45, "Use de 8 a 72 caracteres.");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(46, RegisterPage_Conditional_46_Template, 2, 1, "p", 21);
            i0.ɵɵelementStart(47, "label", 22)(48, "input", 23);
            i0.ɵɵlistener("change", function RegisterPage_Template_input_change_48_listener() { return ctx.showPassword.set(!ctx.showPassword()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(49, " Mostrar senha ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "button", 24);
            i0.ɵɵtext(51);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "p");
            i0.ɵɵtext(53, " J\u00E1 tem conta? ");
            i0.ɵɵelementStart(54, "a", 25);
            i0.ɵɵtext(55, "Entrar");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_8_0;
            let tmp_12_0;
            let tmp_16_0;
            let tmp_21_0;
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_0_0 = ctx.errorMessage()) ? 4 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵattribute("aria-busy", ctx.loading());
            i0.ɵɵadvance(5);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(8);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(10);
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.name) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.name) ? "name-error" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_8_0 = ctx.fieldError(ctx.form.controls.name)) ? 29 : -1, tmp_8_0);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.email) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.email) ? "email-error" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_12_0 = ctx.fieldError(ctx.form.controls.email)) ? 34 : -1, tmp_12_0);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.phone) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.phone) ? "phone-error" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_16_0 = ctx.fieldError(ctx.form.controls.phone)) ? 39 : -1, tmp_16_0);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showPassword() ? "text" : "password");
            i0.ɵɵattribute("aria-invalid", ctx.fieldError(ctx.form.controls.password) ? "true" : null)("aria-describedby", ctx.fieldError(ctx.form.controls.password) ? "password-hint password-error" : "password-hint");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_21_0 = ctx.fieldError(ctx.form.controls.password)) ? 46 : -1, tmp_21_0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("checked", ctx.showPassword());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "Criando conta..." : "Criar conta", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("queryParams", ctx.returnUrl() ? i0.ɵɵpureFunction1(20, _c0, ctx.returnUrl()) : null);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterPage, [{
        type: Component,
        args: [{ selector: 'app-register-page', imports: [ReactiveFormsModule, RouterLink], template: "<section class=\"page-narrow\">\n  <div class=\"card\">\n    <h1>Criar conta</h1>\n\n    @if (errorMessage(); as message) {\n      <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n    }\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate [attr.aria-busy]=\"loading()\">\n      <fieldset class=\"field\">\n        <legend>Como voc\u00EA vai usar o CampoCerto?</legend>\n\n        <label class=\"choice\">\n          <input type=\"radio\" formControlName=\"role\" value=\"FARMER\" />\n          <span>\n            <strong>Sou agricultor</strong><br />\n            <span class=\"hint\">Quero contratar servi\u00E7os rurais.</span>\n          </span>\n        </label>\n\n        <label class=\"choice\">\n          <input type=\"radio\" formControlName=\"role\" value=\"PROVIDER\" />\n          <span>\n            <strong>Sou prestador de servi\u00E7os</strong><br />\n            <span class=\"hint\">Quero oferecer o meu trabalho.</span>\n          </span>\n        </label>\n      </fieldset>\n\n      <div class=\"field\">\n        <label for=\"name\">Nome completo</label>\n        <input\n          id=\"name\"\n          class=\"input\"\n          type=\"text\"\n          formControlName=\"name\"\n          autocomplete=\"name\"\n          [attr.aria-invalid]=\"fieldError(form.controls.name) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.name) ? 'name-error' : null\"\n        />\n        @if (fieldError(form.controls.name); as message) {\n          <p id=\"name-error\" class=\"field-error\">{{ message }}</p>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label for=\"email\">E-mail</label>\n        <input\n          id=\"email\"\n          class=\"input\"\n          type=\"email\"\n          formControlName=\"email\"\n          autocomplete=\"email\"\n          inputmode=\"email\"\n          [attr.aria-invalid]=\"fieldError(form.controls.email) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.email) ? 'email-error' : null\"\n        />\n        @if (fieldError(form.controls.email); as message) {\n          <p id=\"email-error\" class=\"field-error\">{{ message }}</p>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label for=\"phone\">Celular com DDD (opcional)</label>\n        <input\n          id=\"phone\"\n          class=\"input\"\n          type=\"tel\"\n          formControlName=\"phone\"\n          autocomplete=\"tel\"\n          inputmode=\"tel\"\n          placeholder=\"(83) 99999-0000\"\n          [attr.aria-invalid]=\"fieldError(form.controls.phone) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.phone) ? 'phone-error' : null\"\n        />\n        @if (fieldError(form.controls.phone); as message) {\n          <p id=\"phone-error\" class=\"field-error\">{{ message }}</p>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label for=\"password\">Senha</label>\n        <input\n          id=\"password\"\n          class=\"input\"\n          [type]=\"showPassword() ? 'text' : 'password'\"\n          formControlName=\"password\"\n          autocomplete=\"new-password\"\n          [attr.aria-invalid]=\"fieldError(form.controls.password) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.password) ? 'password-hint password-error' : 'password-hint'\"\n        />\n        <p id=\"password-hint\" class=\"hint\">Use de 8 a 72 caracteres.</p>\n        @if (fieldError(form.controls.password); as message) {\n          <p id=\"password-error\" class=\"field-error\">{{ message }}</p>\n        }\n        <label class=\"check\">\n          <input type=\"checkbox\" [checked]=\"showPassword()\" (change)=\"showPassword.set(!showPassword())\" />\n          Mostrar senha\n        </label>\n      </div>\n\n      <button class=\"btn btn-primary btn-block\" type=\"submit\" [disabled]=\"loading()\">\n        {{ loading() ? 'Criando conta...' : 'Criar conta' }}\n      </button>\n    </form>\n\n    <p>\n      J\u00E1 tem conta?\n      <a routerLink=\"/entrar\" [queryParams]=\"returnUrl() ? { returnUrl: returnUrl() } : null\">Entrar</a>\n    </p>\n  </div>\n</section>\n" }]
    }], null, { returnUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "returnUrl", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterPage, { className: "RegisterPage", filePath: "src/app/features/auth/register-page.ts", lineNumber: 16 }); })();
