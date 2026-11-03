import { Component, Injector, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRequestService } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/api/service-request.service';
import { applyServerErrors, fieldError } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/forms/form-errors';
import { focusFirstInvalid } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/forms/focus';
import { toApiError } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/http/api-error';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
function ReviewForm_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ReviewForm_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 3)(1, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", option_r1.value);
    i0.ɵɵattribute("aria-invalid", ctx_r1.form.controls.rating.invalid && ctx_r1.form.controls.rating.touched ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.label);
} }
function ReviewForm_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, "Escolha uma nota de 1 a 5.");
    i0.ɵɵelementEnd();
} }
function ReviewForm_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
export class ReviewForm {
    fb = inject(NonNullableFormBuilder);
    requests = inject(ServiceRequestService);
    injector = inject(Injector);
    requestId = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "requestId" }] : /* istanbul ignore next */ []));
    /** Avisa a tela que algo mudou (avaliação criada, ou já existia): ela recarrega os dados. */
    changed = output();
    options = [
        { value: 5, label: '5 - Excelente' },
        { value: 4, label: '4 - Muito bom' },
        { value: 3, label: '3 - Bom' },
        { value: 2, label: '2 - Regular' },
        { value: 1, label: '1 - Ruim' },
    ];
    form = this.fb.group({
        rating: this.fb.control(null, Validators.required),
        comment: ['', [Validators.maxLength(1000)]],
    });
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    fieldError = fieldError;
    submit() {
        const { rating, comment } = this.form.getRawValue();
        if (this.form.invalid || rating === null) {
            this.form.markAllAsTouched();
            focusFirstInvalid(this.injector);
            return;
        }
        this.loading.set(true);
        this.errorMessage.set(null);
        this.requests.createReview(this.requestId(), { rating, comment: comment.trim() || null }).subscribe({
            next: () => {
                this.loading.set(false);
                this.changed.emit();
            },
            error: (error) => {
                const apiError = toApiError(error);
                applyServerErrors(this.form, apiError.fieldErrors);
                this.errorMessage.set(apiError.message);
                this.loading.set(false);
                if (apiError.status === 409) {
                    // Já avaliada (ou não concluída): a tela busca o estado atual
                    this.changed.emit();
                }
            },
        });
    }
    static ɵfac = function ReviewForm_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReviewForm)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReviewForm, selectors: [["app-review-form"]], inputs: { requestId: [1, "requestId"] }, outputs: { changed: "changed" }, decls: 17, vars: 7, consts: [["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "choice"], [1, "field-error"], ["for", "review-comment"], ["id", "review-comment", "formControlName", "comment", "rows", "4", "maxlength", "1000", "aria-describedby", "review-comment-hint", 1, "input"], ["id", "review-comment-hint", 1, "hint"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "radio", "formControlName", "rating", 3, "value"]], template: function ReviewForm_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ReviewForm_Conditional_0_Template, 2, 1, "div", 0);
            i0.ɵɵelementStart(1, "form", 1);
            i0.ɵɵlistener("ngSubmit", function ReviewForm_Template_form_ngSubmit_1_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(2, "fieldset", 2)(3, "legend");
            i0.ɵɵtext(4, "Qual nota voc\u00EA d\u00E1 para o servi\u00E7o?");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(5, ReviewForm_For_6_Template, 4, 3, "label", 3, _forTrack0);
            i0.ɵɵconditionalCreate(7, ReviewForm_Conditional_7_Template, 2, 0, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 2)(9, "label", 5);
            i0.ɵɵtext(10, "Coment\u00E1rio (opcional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "textarea", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p", 7);
            i0.ɵɵtext(13, " Conte como foi o servi\u00E7o. N\u00E3o escreva telefone nem dados pessoais. Sua avalia\u00E7\u00E3o aparece no perfil do profissional, com o seu primeiro nome. ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(14, ReviewForm_Conditional_14_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 8);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_6_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.errorMessage()) ? 0 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵattribute("aria-busy", ctx.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.options);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.form.controls.rating.invalid && ctx.form.controls.rating.touched ? 7 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_6_0 = ctx.fieldError(ctx.form.controls.comment)) ? 14 : -1, tmp_6_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "Enviando..." : "Enviar avalia\u00E7\u00E3o", " ");
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReviewForm, [{
        type: Component,
        args: [{ selector: 'app-review-form', imports: [ReactiveFormsModule], template: "@if (errorMessage(); as message) {\n  <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n}\n\n<form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate [attr.aria-busy]=\"loading()\">\n  <fieldset class=\"field\">\n    <legend>Qual nota voc\u00EA d\u00E1 para o servi\u00E7o?</legend>\n\n    @for (option of options; track option.value) {\n      <label class=\"choice\">\n        <input\n          type=\"radio\"\n          formControlName=\"rating\"\n          [value]=\"option.value\"\n          [attr.aria-invalid]=\"form.controls.rating.invalid && form.controls.rating.touched ? 'true' : null\"\n        />\n        <span>{{ option.label }}</span>\n      </label>\n    }\n\n    @if (form.controls.rating.invalid && form.controls.rating.touched) {\n      <p class=\"field-error\">Escolha uma nota de 1 a 5.</p>\n    }\n  </fieldset>\n\n  <div class=\"field\">\n    <label for=\"review-comment\">Coment\u00E1rio (opcional)</label>\n    <textarea\n      id=\"review-comment\"\n      class=\"input\"\n      formControlName=\"comment\"\n      rows=\"4\"\n      maxlength=\"1000\"\n      aria-describedby=\"review-comment-hint\"\n    ></textarea>\n    <p id=\"review-comment-hint\" class=\"hint\">\n      Conte como foi o servi\u00E7o. N\u00E3o escreva telefone nem dados pessoais. Sua avalia\u00E7\u00E3o aparece no perfil do\n      profissional, com o seu primeiro nome.\n    </p>\n    @if (fieldError(form.controls.comment); as message) {\n      <p class=\"field-error\">{{ message }}</p>\n    }\n  </div>\n\n  <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"loading()\">\n    {{ loading() ? 'Enviando...' : 'Enviar avalia\u00E7\u00E3o' }}\n  </button>\n</form>\n" }]
    }], null, { requestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "requestId", required: true }] }], changed: [{ type: i0.Output, args: ["changed"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReviewForm, { className: "ReviewForm", filePath: "src/app/shared/review-form/review-form.ts", lineNumber: 14 }); })();
