import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { throwError } from 'rxjs';
import { ProviderService } from '../../core/api/provider.service';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { focusFirstInvalid } from '../../core/forms/focus';
import { minTrimmedLength, notBlank, notInPast } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { todayIso } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = a0 => ["/profissionais", a0];
const _forTrack0 = ($index, $item) => $item.categoryId;
function RequestFormPage_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 1);
} }
function RequestFormPage_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 2)(1, "a", 4);
    i0.ɵɵtext(2, "Ver outros profissionais");
    i0.ɵɵelementEnd()();
} }
function RequestFormPage_Conditional_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 5);
    i0.ɵɵlistener("retry", function RequestFormPage_Conditional_3_Conditional_1_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.profile.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const result_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r3.error.message);
} }
function RequestFormPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, RequestFormPage_Conditional_3_Conditional_0_Template, 3, 0, "app-empty-state", 2)(1, RequestFormPage_Conditional_3_Conditional_1_Template, 1, 1, "app-error-state", 3);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵconditional(result_r3.error.status === 404 ? 0 : 1);
} }
function RequestFormPage_Conditional_4_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 6)(1, "a", 4);
    i0.ɵɵtext(2, "Ver outros profissionais");
    i0.ɵɵelementEnd()();
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 34);
    i0.ɵɵtext(1, "Ver minhas solicita\u00E7\u00F5es");
    i0.ɵɵelementEnd();
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, RequestFormPage_Conditional_4_Conditional_2_Conditional_10_Conditional_3_Template, 2, 0, "a", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.errorStatus() === 409 ? 3 : -1);
} }
function RequestFormPage_Conditional_4_Conditional_2_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", offering_r6.categoryId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(offering_r6.categoryName);
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, " Pre\u00E7o informado pelo profissional: ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx.priceInfo ?? "a combinar");
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestFormPage_Conditional_4_Conditional_2_For_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 25);
} if (rf & 2) {
    const area_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", area_r7);
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestFormPage_Conditional_4_Conditional_2_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestFormPage_Conditional_4_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 7);
    i0.ɵɵtext(1, "\u2039 Voltar ao perfil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 8)(3, "h1");
    i0.ɵɵtext(4, "Pedir or\u00E7amento");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Para ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, RequestFormPage_Conditional_4_Conditional_2_Conditional_10_Template, 4, 2, "div", 9);
    i0.ɵɵelementStart(11, "form", 10);
    i0.ɵɵlistener("ngSubmit", function RequestFormPage_Conditional_4_Conditional_2_Template_form_ngSubmit_11_listener() { i0.ɵɵrestoreView(_r4); i0.ɵɵnextContext(); const provider_r5 = i0.ɵɵreadContextLet(0); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit(provider_r5)); });
    i0.ɵɵelementStart(12, "div", 11)(13, "label", 12);
    i0.ɵɵtext(14, "Qual servi\u00E7o voc\u00EA precisa?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 13);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(16, "option", 14);
    i0.ɵɵtext(17, "Escolha um servi\u00E7o");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, RequestFormPage_Conditional_4_Conditional_2_For_19_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, RequestFormPage_Conditional_4_Conditional_2_Conditional_20_Template, 4, 1, "p", 16);
    i0.ɵɵconditionalCreate(21, RequestFormPage_Conditional_4_Conditional_2_Conditional_21_Template, 2, 1, "p", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 11)(23, "label", 18);
    i0.ɵɵtext(24, "Descreva o trabalho");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "textarea", 19);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 20);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(28, RequestFormPage_Conditional_4_Conditional_2_Conditional_28_Template, 2, 1, "p", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 11)(30, "label", 22);
    i0.ɵɵtext(31, "Munic\u00EDpio ou regi\u00E3o da propriedade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "input", 23);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "datalist", 24);
    i0.ɵɵrepeaterCreate(34, RequestFormPage_Conditional_4_Conditional_2_For_35_Template, 1, 1, "option", 25, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(36, RequestFormPage_Conditional_4_Conditional_2_Conditional_36_Template, 2, 1, "p", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 11)(38, "label", 27);
    i0.ɵɵtext(39, "Data desejada (opcional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "input", 28);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(41, RequestFormPage_Conditional_4_Conditional_2_Conditional_41_Template, 2, 1, "p", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 11)(43, "label", 30);
    i0.ɵɵtext(44, "Informa\u00E7\u00F5es adicionais (opcional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "textarea", 31);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(46, RequestFormPage_Conditional_4_Conditional_2_Conditional_46_Template, 2, 1, "p", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "p", 32);
    i0.ɵɵtext(48, " O profissional ver\u00E1 o seu ");
    i0.ɵɵelementStart(49, "strong");
    i0.ɵɵtext(50, "nome");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(51, " e o seu ");
    i0.ɵɵelementStart(52, "strong");
    i0.ɵɵtext(53, "celular");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(54, " (se voc\u00EA informou) para combinar o servi\u00E7o com voc\u00EA. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "button", 33);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_20_0;
    let tmp_25_0;
    let tmp_30_0;
    let tmp_33_0;
    i0.ɵɵnextContext();
    const provider_r5 = i0.ɵɵreadContextLet(0);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(25, _c0, provider_r5.id));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(provider_r5.professionalName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", provider_r5.city, ")");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_7_0 = ctx_r1.errorMessage()) ? 10 : -1, tmp_7_0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵattribute("aria-busy", ctx_r1.loading());
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.categoryId) ? "true" : null)("aria-describedby", ctx_r1.fieldError(ctx_r1.form.controls.categoryId) ? "categoryId-error" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(provider_r5.offerings);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_15_0 = ctx_r1.selectedOffering()) ? 20 : -1, tmp_15_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_16_0 = ctx_r1.fieldError(ctx_r1.form.controls.categoryId)) ? 21 : -1, tmp_16_0);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.description) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Conte o tamanho do servi\u00E7o, onde fica e o que mais ajudar no or\u00E7amento. N\u00E3o escreva senhas, documentos nem dados de outras pessoas. (", ctx_r1.form.controls.description.value.length, "/2000) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_20_0 = ctx_r1.fieldError(ctx_r1.form.controls.description)) ? 28 : -1, tmp_20_0);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.city) ? "true" : null)("aria-describedby", ctx_r1.fieldError(ctx_r1.form.controls.city) ? "city-error" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(provider_r5.serviceAreas);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_25_0 = ctx_r1.fieldError(ctx_r1.form.controls.city)) ? 36 : -1, tmp_25_0);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("min", ctx_r1.today)("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.desiredDate) ? "true" : null)("aria-describedby", ctx_r1.fieldError(ctx_r1.form.controls.desiredDate) ? "desiredDate-error" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_30_0 = ctx_r1.fieldError(ctx_r1.form.controls.desiredDate)) ? 41 : -1, tmp_30_0);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.additionalInfo) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_33_0 = ctx_r1.fieldError(ctx_r1.form.controls.additionalInfo)) ? 46 : -1, tmp_33_0);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.loading() ? "Enviando..." : "Enviar pedido", " ");
} }
function RequestFormPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdeclareLet(0);
    i0.ɵɵconditionalCreate(1, RequestFormPage_Conditional_4_Conditional_1_Template, 3, 0, "app-empty-state", 6)(2, RequestFormPage_Conditional_4_Conditional_2_Template, 57, 27);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r3 = i0.ɵɵreadContextLet(0);
    const provider_r8 = i0.ɵɵstoreLet(result_r3.data);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!provider_r8.available ? 1 : 2);
} }
export class RequestFormPage {
    fb = inject(NonNullableFormBuilder);
    router = inject(Router);
    injector = inject(Injector);
    providerService = inject(ProviderService);
    requestService = inject(ServiceRequestService);
    // :id da rota e ?servico= da URL (withComponentInputBinding)
    id = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []));
    servico = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "servico" }] : /* istanbul ignore next */ []));
    providerId = computed(() => parsePositiveInt(this.id()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "providerId" }] : /* istanbul ignore next */ []));
    profile = loadResource(() => this.providerId(), (id) => id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 }))
        : this.providerService.get(id));
    today = todayIso();
    form = this.fb.group({
        categoryId: this.fb.control(null, Validators.required),
        description: ['', [notBlank, minTrimmedLength(10), Validators.maxLength(2000)]],
        city: ['', [notBlank, Validators.maxLength(100)]],
        desiredDate: ['', [notInPast]],
        additionalInfo: ['', [Validators.maxLength(1000)]],
    });
    selectedId = toSignal(this.form.controls.categoryId.valueChanges, {
        initialValue: this.form.controls.categoryId.value,
    });
    selectedOffering = computed(() => {
        const state = this.profile.state();
        const id = this.selectedId();
        return state.status === 'ready' ? (state.data.offerings.find((o) => o.categoryId === id) ?? null) : null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedOffering" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    errorStatus = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorStatus" }] : /* istanbul ignore next */ []));
    fieldError = fieldError;
    constructor() {
        // Escolhe o serviço sozinho: o que veio na URL, ou o único que o prestador oferece
        effect(() => {
            const state = this.profile.state();
            if (state.status !== 'ready') {
                return;
            }
            const wanted = parsePositiveInt(this.servico());
            const offerings = state.data.offerings;
            untracked(() => {
                const control = this.form.controls.categoryId;
                if (control.value !== null) {
                    return;
                }
                const match = offerings.find((o) => o.categoryId === wanted) ?? (offerings.length === 1 ? offerings[0] : undefined);
                if (match) {
                    control.setValue(match.categoryId);
                }
            });
        });
    }
    submit(provider) {
        const value = this.form.getRawValue();
        if (this.form.invalid || value.categoryId === null) {
            this.form.markAllAsTouched();
            focusFirstInvalid(this.injector);
            return;
        }
        this.loading.set(true);
        this.errorMessage.set(null);
        this.errorStatus.set(null);
        this.requestService
            .create({
            providerId: provider.id,
            categoryId: value.categoryId,
            description: value.description.trim(),
            city: value.city.trim(),
            desiredDate: value.desiredDate || null,
            additionalInfo: value.additionalInfo.trim() || null,
        })
            .subscribe({
            next: (created) => {
                void this.router.navigate(['/solicitacoes', created.id], { queryParams: { criada: 1 } });
            },
            error: (error) => {
                const apiError = toApiError(error);
                applyServerErrors(this.form, apiError.fieldErrors);
                this.errorMessage.set(apiError.message);
                this.errorStatus.set(apiError.status);
                this.loading.set(false);
            },
        });
    }
    static ɵfac = function RequestFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequestFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RequestFormPage, selectors: [["app-request-form-page"]], inputs: { id: [1, "id"], servico: [1, "servico"] }, decls: 5, vars: 2, consts: [[1, "page-narrow", "wide"], ["message", "Carregando..."], ["title", "Profissional n\u00E3o encontrado", "message", "Este perfil n\u00E3o existe ou n\u00E3o est\u00E1 mais dispon\u00EDvel."], [3, "message"], ["routerLink", "/profissionais", 1, "btn", "btn-primary"], [3, "retry", "message"], ["title", "Este profissional n\u00E3o est\u00E1 recebendo pedidos", "message", "Ele marcou que est\u00E1 sem agenda no momento. Veja outros profissionais da sua regi\u00E3o."], [1, "link-back", 3, "routerLink"], [1, "card"], ["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "categoryId"], ["id", "categoryId", "formControlName", "categoryId", 1, "input"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "hint"], ["id", "categoryId-error", 1, "field-error"], ["for", "description"], ["id", "description", "formControlName", "description", "rows", "5", "maxlength", "2000", "aria-describedby", "description-hint", 1, "input"], ["id", "description-hint", 1, "hint"], [1, "field-error"], ["for", "city"], ["id", "city", "type", "text", "formControlName", "city", "list", "city-options", "maxlength", "100", "autocomplete", "off", 1, "input"], ["id", "city-options"], [3, "value"], ["id", "city-error", 1, "field-error"], ["for", "desiredDate"], ["id", "desiredDate", "type", "date", "formControlName", "desiredDate", 1, "input"], ["id", "desiredDate-error", 1, "field-error"], ["for", "additionalInfo"], ["id", "additionalInfo", "formControlName", "additionalInfo", "rows", "3", "maxlength", "1000", 1, "input"], [1, "info-box"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["routerLink", "/solicitacoes"]], template: function RequestFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "div", 0);
            i0.ɵɵconditionalCreate(2, RequestFormPage_Conditional_2_Template, 1, 0, "app-loading-state", 1)(3, RequestFormPage_Conditional_3_Template, 2, 1)(4, RequestFormPage_Conditional_4_Template, 3, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const result_r9 = i0.ɵɵstoreLet(ctx.profile.state());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(result_r9.status === "loading" ? 2 : result_r9.status === "error" ? 3 : 4);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestFormPage, [{
        type: Component,
        args: [{ selector: 'app-request-form-page', imports: [ReactiveFormsModule, RouterLink, LoadingState, EmptyState, ErrorState], template: "@let result = profile.state();\n\n<div class=\"page-narrow wide\">\n  @if (result.status === 'loading') {\n    <app-loading-state message=\"Carregando...\" />\n  } @else if (result.status === 'error') {\n    @if (result.error.status === 404) {\n      <app-empty-state title=\"Profissional n\u00E3o encontrado\" message=\"Este perfil n\u00E3o existe ou n\u00E3o est\u00E1 mais dispon\u00EDvel.\">\n        <a class=\"btn btn-primary\" routerLink=\"/profissionais\">Ver outros profissionais</a>\n      </app-empty-state>\n    } @else {\n      <app-error-state [message]=\"result.error.message\" (retry)=\"profile.reload()\" />\n    }\n  } @else {\n    @let provider = result.data;\n\n    @if (!provider.available) {\n      <app-empty-state\n        title=\"Este profissional n\u00E3o est\u00E1 recebendo pedidos\"\n        message=\"Ele marcou que est\u00E1 sem agenda no momento. Veja outros profissionais da sua regi\u00E3o.\"\n      >\n        <a class=\"btn btn-primary\" routerLink=\"/profissionais\">Ver outros profissionais</a>\n      </app-empty-state>\n    } @else {\n      <a class=\"link-back\" [routerLink]=\"['/profissionais', provider.id]\">\u2039 Voltar ao perfil</a>\n\n      <div class=\"card\">\n        <h1>Pedir or\u00E7amento</h1>\n        <p>Para <strong>{{ provider.professionalName }}</strong> ({{ provider.city }})</p>\n\n        @if (errorMessage(); as message) {\n          <div class=\"alert alert-error\" role=\"alert\">\n            <p>{{ message }}</p>\n            @if (errorStatus() === 409) {\n              <a routerLink=\"/solicitacoes\">Ver minhas solicita\u00E7\u00F5es</a>\n            }\n          </div>\n        }\n\n        <form [formGroup]=\"form\" (ngSubmit)=\"submit(provider)\" novalidate [attr.aria-busy]=\"loading()\">\n          <div class=\"field\">\n            <label for=\"categoryId\">Qual servi\u00E7o voc\u00EA precisa?</label>\n            <select\n              id=\"categoryId\"\n              class=\"input\"\n              formControlName=\"categoryId\"\n              [attr.aria-invalid]=\"fieldError(form.controls.categoryId) ? 'true' : null\"\n              [attr.aria-describedby]=\"fieldError(form.controls.categoryId) ? 'categoryId-error' : null\"\n            >\n              <option [ngValue]=\"null\" disabled>Escolha um servi\u00E7o</option>\n              @for (offering of provider.offerings; track offering.categoryId) {\n                <option [ngValue]=\"offering.categoryId\">{{ offering.categoryName }}</option>\n              }\n            </select>\n            @if (selectedOffering(); as selected) {\n              <p class=\"hint\">\n                Pre\u00E7o informado pelo profissional:\n                <strong>{{ selected.priceInfo ?? 'a combinar' }}</strong>\n              </p>\n            }\n            @if (fieldError(form.controls.categoryId); as message) {\n              <p id=\"categoryId-error\" class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label for=\"description\">Descreva o trabalho</label>\n            <textarea\n              id=\"description\"\n              class=\"input\"\n              formControlName=\"description\"\n              rows=\"5\"\n              maxlength=\"2000\"\n              aria-describedby=\"description-hint\"\n              [attr.aria-invalid]=\"fieldError(form.controls.description) ? 'true' : null\"\n            ></textarea>\n            <p id=\"description-hint\" class=\"hint\">\n              Conte o tamanho do servi\u00E7o, onde fica e o que mais ajudar no or\u00E7amento. N\u00E3o escreva senhas, documentos\n              nem dados de outras pessoas.\n              ({{ form.controls.description.value.length }}/2000)\n            </p>\n            @if (fieldError(form.controls.description); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label for=\"city\">Munic\u00EDpio ou regi\u00E3o da propriedade</label>\n            <input\n              id=\"city\"\n              class=\"input\"\n              type=\"text\"\n              formControlName=\"city\"\n              list=\"city-options\"\n              maxlength=\"100\"\n              autocomplete=\"off\"\n              [attr.aria-invalid]=\"fieldError(form.controls.city) ? 'true' : null\"\n              [attr.aria-describedby]=\"fieldError(form.controls.city) ? 'city-error' : null\"\n            />\n            <datalist id=\"city-options\">\n              @for (area of provider.serviceAreas; track area) {\n                <option [value]=\"area\"></option>\n              }\n            </datalist>\n            @if (fieldError(form.controls.city); as message) {\n              <p id=\"city-error\" class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label for=\"desiredDate\">Data desejada (opcional)</label>\n            <input\n              id=\"desiredDate\"\n              class=\"input\"\n              type=\"date\"\n              formControlName=\"desiredDate\"\n              [attr.min]=\"today\"\n              [attr.aria-invalid]=\"fieldError(form.controls.desiredDate) ? 'true' : null\"\n              [attr.aria-describedby]=\"fieldError(form.controls.desiredDate) ? 'desiredDate-error' : null\"\n            />\n            @if (fieldError(form.controls.desiredDate); as message) {\n              <p id=\"desiredDate-error\" class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label for=\"additionalInfo\">Informa\u00E7\u00F5es adicionais (opcional)</label>\n            <textarea\n              id=\"additionalInfo\"\n              class=\"input\"\n              formControlName=\"additionalInfo\"\n              rows=\"3\"\n              maxlength=\"1000\"\n              [attr.aria-invalid]=\"fieldError(form.controls.additionalInfo) ? 'true' : null\"\n            ></textarea>\n            @if (fieldError(form.controls.additionalInfo); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <p class=\"info-box\">\n            O profissional ver\u00E1 o seu <strong>nome</strong> e o seu <strong>celular</strong> (se voc\u00EA informou) para\n            combinar o servi\u00E7o com voc\u00EA.\n          </p>\n\n          <button class=\"btn btn-primary btn-block\" type=\"submit\" [disabled]=\"loading()\">\n            {{ loading() ? 'Enviando...' : 'Enviar pedido' }}\n          </button>\n        </form>\n      </div>\n    }\n  }\n</div>\n" }]
    }], () => [], { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], servico: [{ type: i0.Input, args: [{ isSignal: true, alias: "servico", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RequestFormPage, { className: "RequestFormPage", filePath: "src/app/features/requests/request-form-page.ts", lineNumber: 27 }); })();
