import { Component, Injector, computed, effect, inject, signal, untracked } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../../core/api/category.service';
import { ProviderAccountService } from '../../core/api/provider-account.service';
import { ProviderService } from '../../core/api/provider.service';
import { AuthService } from '../../core/auth/auth.service';
import { focusFirstInvalid } from '../../core/forms/focus';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { brazilianMobile, notBlank } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { cityKey } from '../../core/util/city';
import { formatBrazilianMobile, normalizeBrazilianMobile } from '../../core/util/phone';
import { CityListEditor } from '../../shared/city-list-editor/city-list-editor';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.controls.categoryId.value;
function ProfileFormPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 2);
} }
function ProfileFormPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 5);
    i0.ɵɵlistener("retry", function ProfileFormPage_Conditional_5_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.data.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const state_r3 = i0.ɵɵreadContextLet(3);
    i0.ɵɵproperty("message", state_r3.error.message);
} }
function ProfileFormPage_Conditional_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Depois de salvar, o seu perfil aparece na busca para agricultores da sua regi\u00E3o.");
    i0.ɵɵelementEnd();
} }
function ProfileFormPage_Conditional_6_Conditional_4_Conditional_3_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5);
} }
function ProfileFormPage_Conditional_6_Conditional_4_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵrepeaterCreate(1, ProfileFormPage_Conditional_6_Conditional_4_Conditional_3_For_2_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.serverMessages());
} }
function ProfileFormPage_Conditional_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ProfileFormPage_Conditional_6_Conditional_4_Conditional_3_Template, 3, 0, "ul");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverMessages().length > 0 ? 3 : -1);
} }
function ProfileFormPage_Conditional_6_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_For_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 28);
} if (rf & 2) {
    const name_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", name_r6);
} }
function ProfileFormPage_Conditional_6_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_For_56_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
    i0.ɵɵelementStart(1, "span", 32);
    i0.ɵɵtext(2, " Servi\u00E7o desativado pela plataforma. Se voc\u00EA desmarcar, n\u00E3o poder\u00E1 marcar de novo. ");
    i0.ɵɵelementEnd();
} }
function ProfileFormPage_Conditional_6_For_56_Conditional_9_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ProfileFormPage_Conditional_6_For_56_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45)(1, "label", 46)(2, "span", 47);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, "Pre\u00E7o (opcional) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 48);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, ProfileFormPage_Conditional_6_For_56_Conditional_9_Conditional_6_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_21_0;
    const group_r7 = i0.ɵɵnextContext().$implicit;
    const id_r8 = i0.ɵɵreadContextLet(0);
    const meta_r9 = i0.ɵɵreadContextLet(1);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", "price-" + id_r8);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", meta_r9?.name, ": ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "price-" + id_r8);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(group_r7.controls.priceInfo) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_21_0 = ctx_r1.fieldError(group_r7.controls.priceInfo)) ? 6 : -1, tmp_21_0);
} }
function ProfileFormPage_Conditional_6_For_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdeclareLet(0)(1);
    i0.ɵɵelementStart(2, "div", 35)(3, "label", 43)(4, "input", 44);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ProfileFormPage_Conditional_6_For_56_Conditional_8_Template, 3, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(9, ProfileFormPage_Conditional_6_For_56_Conditional_9_Template, 7, 5, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r7 = ctx.$implicit;
    const ɵ$index_131_r10 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    const id_r11 = i0.ɵɵstoreLet(group_r7.controls.categoryId.value);
    i0.ɵɵadvance();
    const meta_r12 = i0.ɵɵstoreLet(ctx_r1.serviceMeta().get(id_r11));
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroupName", ɵ$index_131_r10);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-invalid", ɵ$index_131_r10 === 0 && ctx_r1.offeringsError() ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(meta_r12?.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(meta_r12?.inactive ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(group_r7.controls.selected.value ? 9 : -1);
} }
function ProfileFormPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "h1");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ProfileFormPage_Conditional_6_Conditional_3_Template, 2, 0, "p");
    i0.ɵɵconditionalCreate(4, ProfileFormPage_Conditional_6_Conditional_4_Template, 4, 2, "div", 6);
    i0.ɵɵelementStart(5, "form", 7);
    i0.ɵɵlistener("ngSubmit", function ProfileFormPage_Conditional_6_Template_form_ngSubmit_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(6, "section", 8)(7, "h2", 9);
    i0.ɵɵtext(8, "Sobre voc\u00EA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 10)(10, "label", 11);
    i0.ɵɵtext(11, "Nome profissional");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 12);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 13);
    i0.ɵɵtext(14, "Como os clientes v\u00E3o conhecer voc\u00EA. Ex.: Z\u00E9 das Cercas.");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, ProfileFormPage_Conditional_6_Conditional_15_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 10)(17, "label", 15);
    i0.ɵɵtext(18, "Descri\u00E7\u00E3o (opcional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "textarea", 16);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 17);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, ProfileFormPage_Conditional_6_Conditional_22_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "section", 18)(24, "h2", 19);
    i0.ɵɵtext(25, "Contato");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 10)(27, "label", 20);
    i0.ɵɵtext(28, "WhatsApp (celular com DDD)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 21);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 22);
    i0.ɵɵtext(31, " O seu n\u00FAmero ");
    i0.ɵɵelementStart(32, "strong");
    i0.ɵɵtext(33, "n\u00E3o aparece");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(34, " na sua p\u00E1gina p\u00FAblica. Ele s\u00F3 \u00E9 usado no bot\u00E3o de WhatsApp, que apenas agricultores com conta conseguem abrir. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(35, ProfileFormPage_Conditional_6_Conditional_35_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "section", 23)(37, "h2", 24);
    i0.ɵɵtext(38, "Onde voc\u00EA atende");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 10)(40, "label", 25);
    i0.ɵɵtext(41, "Sua cidade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "input", 26);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "datalist", 27);
    i0.ɵɵrepeaterCreate(44, ProfileFormPage_Conditional_6_For_45_Template, 1, 1, "option", 28, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(46, ProfileFormPage_Conditional_6_Conditional_46_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "app-city-list-editor", 29);
    i0.ɵɵtwoWayListener("citiesChange", function ProfileFormPage_Conditional_6_Template_app_city_list_editor_citiesChange_47_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.areas, $event) || (ctx_r1.areas = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "section", 30)(49, "h2", 31);
    i0.ɵɵtext(50, "Servi\u00E7os que voc\u00EA faz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "p", 32);
    i0.ɵɵtext(52, " Marque os servi\u00E7os e, se quiser, informe o pre\u00E7o (por exemplo, \"R$ 8 por metro\"). Sem pre\u00E7o, aparece \"a combinar\". ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(53, ProfileFormPage_Conditional_6_Conditional_53_Template, 2, 1, "p", 33);
    i0.ɵɵelementStart(54, "div", 34);
    i0.ɵɵrepeaterCreate(55, ProfileFormPage_Conditional_6_For_56_Template, 10, 7, "div", 35, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "section", 36)(58, "h2", 37);
    i0.ɵɵtext(59, "Disponibilidade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "label", 38)(61, "input", 39);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtext(62, " Estou recebendo novos pedidos ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "p", 32);
    i0.ɵɵtext(64, "Desmarque se estiver sem agenda. Voc\u00EA deixa de aparecer na busca at\u00E9 marcar de novo.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 40)(66, "button", 41);
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "a", 42);
    i0.ɵɵtext(69, "Cancelar");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_9_0;
    let tmp_13_0;
    let tmp_16_0;
    let tmp_20_0;
    let tmp_24_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.isEdit() ? "Editar perfil profissional" : "Criar perfil profissional");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.isEdit() ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_4_0 = ctx_r1.errorMessage()) ? 4 : -1, tmp_4_0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵattribute("aria-busy", ctx_r1.loading());
    i0.ɵɵadvance(7);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.professionalName) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_9_0 = ctx_r1.fieldError(ctx_r1.form.controls.professionalName)) ? 15 : -1, tmp_9_0);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.description) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Conte h\u00E1 quanto tempo trabalha, os materiais que usa e como atende. (", ctx_r1.form.controls.description.value.length, "/1000) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_13_0 = ctx_r1.fieldError(ctx_r1.form.controls.description)) ? 22 : -1, tmp_13_0);
    i0.ɵɵadvance(7);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.whatsapp) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(6);
    i0.ɵɵconditional((tmp_16_0 = ctx_r1.fieldError(ctx_r1.form.controls.whatsapp)) ? 35 : -1, tmp_16_0);
    i0.ɵɵadvance(7);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.city) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.citySuggestions());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_20_0 = ctx_r1.fieldError(ctx_r1.form.controls.city)) ? 46 : -1, tmp_20_0);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("cities", ctx_r1.areas);
    i0.ɵɵproperty("suggestions", ctx_r1.citySuggestions())("baseCity", ctx_r1.form.controls.city.value);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional((tmp_24_0 = ctx_r1.offeringsError()) ? 53 : -1, tmp_24_0);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.form.controls.offerings.controls);
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.loading() ? "Salvando..." : ctx_r1.isEdit() ? "Salvar altera\u00E7\u00F5es" : "Criar perfil", " ");
} }
/** Precisa haver pelo menos um serviço marcado (o backend também exige). */
const atLeastOneService = (control) => {
    const array = control;
    return array.controls.some((group) => group.controls.selected.value) ? null : { noService: true };
};
// Só estes erros do servidor têm um lugar visível na tela, embaixo do campo. Os demais vão para o aviso.
const FIELDS_WITH_INLINE_ERROR = new Set(['professionalName', 'description', 'whatsapp', 'city']);
export class ProfileFormPage {
    fb = inject(NonNullableFormBuilder);
    router = inject(Router);
    injector = inject(Injector);
    auth = inject(AuthService);
    account = inject(ProviderAccountService);
    categoryService = inject(CategoryService);
    providerService = inject(ProviderService);
    // Perfil (pode ainda não existir) e categorias, carregados juntos
    data = loadResource(() => null, () => forkJoin({ profile: this.account.getMine(), categories: this.categoryService.list() }));
    // Sugestões de cidade. Se falhar, o campo continua funcionando, só sem sugestões
    citiesResource = loadResource(() => null, () => this.providerService.cities());
    citySuggestions = computed(() => {
        const state = this.citiesResource.state();
        return state.status === 'ready' ? state.data : [];
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "citySuggestions" }] : /* istanbul ignore next */ []));
    form = this.fb.group({
        professionalName: ['', [notBlank, Validators.maxLength(120)]],
        description: ['', [Validators.maxLength(1000)]],
        whatsapp: ['', [notBlank, brazilianMobile]],
        city: ['', [notBlank, Validators.maxLength(100)]],
        available: [true],
        offerings: new FormArray([], { validators: [atLeastOneService] }),
    });
    areas = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "areas" }] : /* istanbul ignore next */ []));
    initialAreas = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "initialAreas" }] : /* istanbul ignore next */ []));
    ready = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "ready" }] : /* istanbul ignore next */ []));
    profileId = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "profileId" }] : /* istanbul ignore next */ []));
    serviceMeta = signal(new Map(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "serviceMeta" }] : /* istanbul ignore next */ []));
    submitted = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "submitted" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    serverMessages = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "serverMessages" }] : /* istanbul ignore next */ []));
    isEdit = computed(() => this.profileId() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isEdit" }] : /* istanbul ignore next */ []));
    fieldError = fieldError;
    populated = false;
    constructor() {
        // Quando os dados chegam, monta o formulário uma única vez
        effect(() => {
            const state = this.data.state();
            if (state.status === 'ready') {
                untracked(() => this.populate(state.data.profile, state.data.categories));
            }
        });
    }
    hasUnsavedChanges() {
        return this.form.dirty || JSON.stringify(this.areas()) !== JSON.stringify(this.initialAreas());
    }
    populate(profile, categories) {
        if (this.populated) {
            return;
        }
        this.populated = true;
        const offered = new Map((profile?.offerings ?? []).map((o) => [o.categoryId, o]));
        const meta = new Map();
        const groups = [];
        const addRow = (categoryId, name, inactive) => {
            meta.set(categoryId, { name, inactive });
            groups.push(this.fb.group({
                categoryId: this.fb.control(categoryId),
                selected: this.fb.control(offered.has(categoryId)),
                priceInfo: this.fb.control(offered.get(categoryId)?.priceInfo ?? '', [Validators.maxLength(100)]),
            }));
        };
        categories.forEach((category) => addRow(category.id, category.name, false));
        // Categoria que o administrador desativou, mas que este prestador já oferecia: continua na tela
        // marcada. Se não aparecesse, ao salvar o backend a removeria sem a pessoa perceber.
        const activeIds = new Set(categories.map((category) => category.id));
        (profile?.offerings ?? [])
            .filter((offering) => !activeIds.has(offering.categoryId))
            .forEach((offering) => addRow(offering.categoryId, offering.categoryName, true));
        const array = this.form.controls.offerings;
        array.clear();
        groups.forEach((group) => array.push(group));
        // Quem acabou de se cadastrar já informou o celular: aproveitamos no WhatsApp
        const registeredPhone = this.auth.user()?.phone ?? '';
        const suggestedPhone = normalizeBrazilianMobile(registeredPhone) !== null ? registeredPhone : '';
        this.form.patchValue({
            professionalName: profile?.professionalName ?? '',
            description: profile?.description ?? '',
            whatsapp: profile ? formatBrazilianMobile(profile.whatsapp) : suggestedPhone,
            city: profile?.city ?? '',
            available: profile?.available ?? true,
        });
        // A cidade principal o servidor inclui sozinho: aqui só ficam as outras
        const extras = (profile?.serviceAreas ?? []).filter((area) => cityKey(area) !== cityKey(profile?.city ?? ''));
        this.areas.set(extras);
        this.initialAreas.set(extras);
        this.serviceMeta.set(meta);
        this.profileId.set(profile?.id ?? null);
        this.form.markAsPristine();
        this.ready.set(true);
    }
    offeringsError() {
        const control = this.form.controls.offerings;
        return control.errors?.['noService'] && (this.submitted() || control.touched)
            ? 'Selecione pelo menos um serviço.'
            : null;
    }
    submit() {
        this.submitted.set(true);
        this.errorMessage.set(null);
        this.serverMessages.set([]);
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            focusFirstInvalid(this.injector);
            return;
        }
        this.loading.set(true);
        const wasCreate = !this.isEdit();
        this.account.save(this.profileId(), this.toPayload()).subscribe({
            next: () => {
                // Salvo: nada pendente, então o guard de saída não pergunta mais nada
                this.form.markAsPristine();
                this.initialAreas.set(this.areas());
                void this.router.navigate(['/painel'], { queryParams: { salvo: wasCreate ? 'criado' : 'atualizado' } });
            },
            error: (error) => {
                const apiError = toApiError(error);
                const inline = {};
                const others = [];
                for (const [field, message] of Object.entries(apiError.fieldErrors)) {
                    if (FIELDS_WITH_INLINE_ERROR.has(field)) {
                        inline[field] = message;
                    }
                    else {
                        others.push(message);
                    }
                }
                applyServerErrors(this.form, inline);
                this.serverMessages.set(others);
                this.errorMessage.set(apiError.message);
                this.loading.set(false);
            },
        });
    }
    toPayload() {
        const value = this.form.getRawValue();
        return {
            professionalName: value.professionalName.trim(),
            description: value.description.trim() || null,
            whatsapp: value.whatsapp.trim(),
            city: value.city.trim(),
            serviceAreas: this.areas(),
            offerings: value.offerings
                .filter((offering) => offering.selected)
                .map((offering) => ({
                categoryId: offering.categoryId,
                priceInfo: offering.priceInfo.trim() || null,
            })),
            available: value.available,
        };
    }
    static ɵfac = function ProfileFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileFormPage, selectors: [["app-profile-form-page"]], decls: 7, vars: 2, consts: [[1, "page-narrow", "wide"], ["routerLink", "/painel", 1, "link-back"], ["message", "Carregando seu perfil..."], [3, "message"], [1, "card"], [3, "retry", "message"], ["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], ["aria-labelledby", "about-heading", 1, "form-section"], ["id", "about-heading"], [1, "field"], ["for", "professionalName"], ["id", "professionalName", "type", "text", "formControlName", "professionalName", "maxlength", "120", "autocomplete", "organization", "aria-describedby", "professionalName-hint", 1, "input"], ["id", "professionalName-hint", 1, "hint"], [1, "field-error"], ["for", "description"], ["id", "description", "formControlName", "description", "rows", "5", "maxlength", "1000", "aria-describedby", "description-hint", 1, "input"], ["id", "description-hint", 1, "hint"], ["aria-labelledby", "contact-heading", 1, "form-section"], ["id", "contact-heading"], ["for", "whatsapp"], ["id", "whatsapp", "type", "tel", "formControlName", "whatsapp", "maxlength", "20", "autocomplete", "tel", "inputmode", "tel", "placeholder", "(83) 99999-0000", "aria-describedby", "whatsapp-hint", 1, "input"], ["id", "whatsapp-hint", 1, "hint"], ["aria-labelledby", "where-heading", 1, "form-section"], ["id", "where-heading"], ["for", "city"], ["id", "city", "type", "text", "formControlName", "city", "list", "city-suggestions", "maxlength", "100", "autocomplete", "off", 1, "input"], ["id", "city-suggestions"], [3, "value"], [3, "citiesChange", "cities", "suggestions", "baseCity"], ["aria-labelledby", "services-heading", 1, "form-section"], ["id", "services-heading"], [1, "hint"], ["role", "alert", 1, "field-error"], ["formArrayName", "offerings"], [1, "service-row", 3, "formGroupName"], ["aria-labelledby", "availability-heading", 1, "form-section"], ["id", "availability-heading"], [1, "check"], ["type", "checkbox", "formControlName", "available"], [1, "actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["routerLink", "/painel", 1, "btn", "btn-secondary"], [1, "choice"], ["type", "checkbox", "formControlName", "selected"], [1, "price-field"], [3, "for"], [1, "sr-only"], ["type", "text", "formControlName", "priceInfo", "maxlength", "100", "placeholder", "Ex.: R$ 8 por metro", 1, "input", 3, "id"]], template: function ProfileFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "a", 1);
            i0.ɵɵtext(2, "\u2039 Voltar ao painel");
            i0.ɵɵelementEnd();
            i0.ɵɵdeclareLet(3);
            i0.ɵɵconditionalCreate(4, ProfileFormPage_Conditional_4_Template, 1, 0, "app-loading-state", 2)(5, ProfileFormPage_Conditional_5_Template, 1, 1, "app-error-state", 3)(6, ProfileFormPage_Conditional_6_Template, 70, 20, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            const state_r13 = i0.ɵɵstoreLet(ctx.data.state());
            i0.ɵɵadvance();
            i0.ɵɵconditional(state_r13.status === "loading" ? 4 : state_r13.status === "error" ? 5 : ctx.ready() ? 6 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, i1.FormGroupName, i1.FormArrayName, RouterLink, CityListEditor, LoadingState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileFormPage, [{
        type: Component,
        args: [{ selector: 'app-profile-form-page', imports: [ReactiveFormsModule, RouterLink, CityListEditor, LoadingState, ErrorState], template: "<div class=\"page-narrow wide\">\n  <a class=\"link-back\" routerLink=\"/painel\">\u2039 Voltar ao painel</a>\n\n  @let state = data.state();\n\n  @if (state.status === 'loading') {\n    <app-loading-state message=\"Carregando seu perfil...\" />\n  } @else if (state.status === 'error') {\n    <app-error-state [message]=\"state.error.message\" (retry)=\"data.reload()\" />\n  } @else if (ready()) {\n    <div class=\"card\">\n      <h1>{{ isEdit() ? 'Editar perfil profissional' : 'Criar perfil profissional' }}</h1>\n\n      @if (!isEdit()) {\n        <p>Depois de salvar, o seu perfil aparece na busca para agricultores da sua regi\u00E3o.</p>\n      }\n\n      @if (errorMessage(); as message) {\n        <div class=\"alert alert-error\" role=\"alert\">\n          <p>{{ message }}</p>\n          @if (serverMessages().length > 0) {\n            <ul>\n              @for (item of serverMessages(); track item) {\n                <li>{{ item }}</li>\n              }\n            </ul>\n          }\n        </div>\n      }\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate [attr.aria-busy]=\"loading()\">\n        <section class=\"form-section\" aria-labelledby=\"about-heading\">\n          <h2 id=\"about-heading\">Sobre voc\u00EA</h2>\n\n          <div class=\"field\">\n            <label for=\"professionalName\">Nome profissional</label>\n            <input\n              id=\"professionalName\"\n              class=\"input\"\n              type=\"text\"\n              formControlName=\"professionalName\"\n              maxlength=\"120\"\n              autocomplete=\"organization\"\n              aria-describedby=\"professionalName-hint\"\n              [attr.aria-invalid]=\"fieldError(form.controls.professionalName) ? 'true' : null\"\n            />\n            <p id=\"professionalName-hint\" class=\"hint\">Como os clientes v\u00E3o conhecer voc\u00EA. Ex.: Z\u00E9 das Cercas.</p>\n            @if (fieldError(form.controls.professionalName); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label for=\"description\">Descri\u00E7\u00E3o (opcional)</label>\n            <textarea\n              id=\"description\"\n              class=\"input\"\n              formControlName=\"description\"\n              rows=\"5\"\n              maxlength=\"1000\"\n              aria-describedby=\"description-hint\"\n              [attr.aria-invalid]=\"fieldError(form.controls.description) ? 'true' : null\"\n            ></textarea>\n            <p id=\"description-hint\" class=\"hint\">\n              Conte h\u00E1 quanto tempo trabalha, os materiais que usa e como atende.\n              ({{ form.controls.description.value.length }}/1000)\n            </p>\n            @if (fieldError(form.controls.description); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n        </section>\n\n        <section class=\"form-section\" aria-labelledby=\"contact-heading\">\n          <h2 id=\"contact-heading\">Contato</h2>\n\n          <div class=\"field\">\n            <label for=\"whatsapp\">WhatsApp (celular com DDD)</label>\n            <input\n              id=\"whatsapp\"\n              class=\"input\"\n              type=\"tel\"\n              formControlName=\"whatsapp\"\n              maxlength=\"20\"\n              autocomplete=\"tel\"\n              inputmode=\"tel\"\n              placeholder=\"(83) 99999-0000\"\n              aria-describedby=\"whatsapp-hint\"\n              [attr.aria-invalid]=\"fieldError(form.controls.whatsapp) ? 'true' : null\"\n            />\n            <p id=\"whatsapp-hint\" class=\"hint\">\n              O seu n\u00FAmero <strong>n\u00E3o aparece</strong> na sua p\u00E1gina p\u00FAblica. Ele s\u00F3 \u00E9 usado no bot\u00E3o de WhatsApp,\n              que apenas agricultores com conta conseguem abrir.\n            </p>\n            @if (fieldError(form.controls.whatsapp); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n        </section>\n\n        <section class=\"form-section\" aria-labelledby=\"where-heading\">\n          <h2 id=\"where-heading\">Onde voc\u00EA atende</h2>\n\n          <div class=\"field\">\n            <label for=\"city\">Sua cidade</label>\n            <input\n              id=\"city\"\n              class=\"input\"\n              type=\"text\"\n              formControlName=\"city\"\n              list=\"city-suggestions\"\n              maxlength=\"100\"\n              autocomplete=\"off\"\n              [attr.aria-invalid]=\"fieldError(form.controls.city) ? 'true' : null\"\n            />\n            <datalist id=\"city-suggestions\">\n              @for (name of citySuggestions(); track name) {\n                <option [value]=\"name\"></option>\n              }\n            </datalist>\n            @if (fieldError(form.controls.city); as message) {\n              <p class=\"field-error\">{{ message }}</p>\n            }\n          </div>\n\n          <app-city-list-editor\n            [(cities)]=\"areas\"\n            [suggestions]=\"citySuggestions()\"\n            [baseCity]=\"form.controls.city.value\"\n          />\n        </section>\n\n        <section class=\"form-section\" aria-labelledby=\"services-heading\">\n          <h2 id=\"services-heading\">Servi\u00E7os que voc\u00EA faz</h2>\n          <p class=\"hint\">\n            Marque os servi\u00E7os e, se quiser, informe o pre\u00E7o (por exemplo, \"R$ 8 por metro\"). Sem pre\u00E7o, aparece \"a\n            combinar\".\n          </p>\n\n          @if (offeringsError(); as message) {\n            <p class=\"field-error\" role=\"alert\">{{ message }}</p>\n          }\n\n          <div formArrayName=\"offerings\">\n            @for (group of form.controls.offerings.controls; track group.controls.categoryId.value; let i = $index) {\n              @let id = group.controls.categoryId.value;\n              @let meta = serviceMeta().get(id);\n\n              <div class=\"service-row\" [formGroupName]=\"i\">\n                <label class=\"choice\">\n                  <input\n                    type=\"checkbox\"\n                    formControlName=\"selected\"\n                    [attr.aria-invalid]=\"i === 0 && offeringsError() ? 'true' : null\"\n                  />\n                  <span>\n                    <strong>{{ meta?.name }}</strong>\n                    @if (meta?.inactive) {\n                      <br />\n                      <span class=\"hint\">\n                        Servi\u00E7o desativado pela plataforma. Se voc\u00EA desmarcar, n\u00E3o poder\u00E1 marcar de novo.\n                      </span>\n                    }\n                  </span>\n                </label>\n\n                @if (group.controls.selected.value) {\n                  <div class=\"price-field\">\n                    <label [for]=\"'price-' + id\">\n                      <span class=\"sr-only\">{{ meta?.name }}: </span>Pre\u00E7o (opcional)\n                    </label>\n                    <input\n                      [id]=\"'price-' + id\"\n                      class=\"input\"\n                      type=\"text\"\n                      formControlName=\"priceInfo\"\n                      maxlength=\"100\"\n                      placeholder=\"Ex.: R$ 8 por metro\"\n                      [attr.aria-invalid]=\"fieldError(group.controls.priceInfo) ? 'true' : null\"\n                    />\n                    @if (fieldError(group.controls.priceInfo); as message) {\n                      <p class=\"field-error\">{{ message }}</p>\n                    }\n                  </div>\n                }\n              </div>\n            }\n          </div>\n        </section>\n\n        <section class=\"form-section\" aria-labelledby=\"availability-heading\">\n          <h2 id=\"availability-heading\">Disponibilidade</h2>\n          <label class=\"check\">\n            <input type=\"checkbox\" formControlName=\"available\" />\n            Estou recebendo novos pedidos\n          </label>\n          <p class=\"hint\">Desmarque se estiver sem agenda. Voc\u00EA deixa de aparecer na busca at\u00E9 marcar de novo.</p>\n        </section>\n\n        <div class=\"actions\">\n          <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"loading()\">\n            {{ loading() ? 'Salvando...' : isEdit() ? 'Salvar altera\u00E7\u00F5es' : 'Criar perfil' }}\n          </button>\n          <a class=\"btn btn-secondary\" routerLink=\"/painel\">Cancelar</a>\n        </div>\n      </form>\n    </div>\n  }\n</div>\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileFormPage, { className: "ProfileFormPage", filePath: "src/app/features/provider-panel/profile-form-page.ts", lineNumber: 57 }); })();
