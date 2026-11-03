import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { throwError } from 'rxjs';
import { ProviderService } from '../../core/api/provider.service';
import { loadResource } from '../../core/http/load-state';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { ProviderContact } from './provider-contact';
import { ReviewsSection } from './reviews-section';
import { parsePositiveInt } from './search-query';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.categoryId;
function ProviderProfilePage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 2);
} }
function ProviderProfilePage_Conditional_5_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 4)(1, "a", 6);
    i0.ɵɵtext(2, "Ver outros profissionais");
    i0.ɵɵelementEnd()();
} }
function ProviderProfilePage_Conditional_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 7);
    i0.ɵɵlistener("retry", function ProviderProfilePage_Conditional_5_Conditional_1_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.profile.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const result_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r3.error.message);
} }
function ProviderProfilePage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ProviderProfilePage_Conditional_5_Conditional_0_Template, 3, 0, "app-empty-state", 4)(1, ProviderProfilePage_Conditional_5_Conditional_1_Template, 1, 1, "app-error-state", 5);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵconditional(result_r3.error.status === 404 ? 0 : 1);
} }
function ProviderProfilePage_Conditional_6_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "span", 23);
    i0.ɵɵtext(2, "Dispon\u00EDvel para novos pedidos");
    i0.ɵɵelementEnd()();
} }
function ProviderProfilePage_Conditional_6_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1, " Este profissional n\u00E3o est\u00E1 recebendo novos pedidos no momento. ");
    i0.ɵɵelementEnd();
} }
function ProviderProfilePage_Conditional_6_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "h2", 24);
    i0.ɵɵtext(2, "Sobre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const provider_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(provider_r4.description);
} }
function ProviderProfilePage_Conditional_6_For_19_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(offering_r5.priceInfo);
} }
function ProviderProfilePage_Conditional_6_For_19_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Pre\u00E7o a combinar");
    i0.ɵɵelementEnd();
} }
function ProviderProfilePage_Conditional_6_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ProviderProfilePage_Conditional_6_For_19_Conditional_3_Template, 2, 1, "strong")(4, ProviderProfilePage_Conditional_6_For_19_Conditional_4_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(offering_r5.categoryName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(offering_r5.priceInfo ? 3 : 4);
} }
function ProviderProfilePage_Conditional_6_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const area_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(area_r6);
} }
function ProviderProfilePage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "article", 3)(2, "header", 8)(3, "h1");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 9)(6, "span", 10);
    i0.ɵɵtext(7, "\uD83D\uDCCD");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "app-rating-stars", 11);
    i0.ɵɵconditionalCreate(10, ProviderProfilePage_Conditional_6_Conditional_10_Template, 3, 0, "p")(11, ProviderProfilePage_Conditional_6_Conditional_11_Template, 2, 0, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "app-provider-contact", 13);
    i0.ɵɵconditionalCreate(13, ProviderProfilePage_Conditional_6_Conditional_13_Template, 5, 1, "section", 14);
    i0.ɵɵelementStart(14, "section", 15)(15, "h2", 16);
    i0.ɵɵtext(16, "Servi\u00E7os e pre\u00E7os");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "ul", 17);
    i0.ɵɵrepeaterCreate(18, ProviderProfilePage_Conditional_6_For_19_Template, 5, 2, "li", null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "section", 18)(21, "h2", 19);
    i0.ɵɵtext(22, "Cidades atendidas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "ul", 20);
    i0.ɵɵrepeaterCreate(24, ProviderProfilePage_Conditional_6_For_25_Template, 2, 1, "li", 21, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(26, "app-reviews-section", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r3 = i0.ɵɵreadContextLet(0);
    const provider_r7 = i0.ɵɵstoreLet(result_r3.data);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(provider_r7.professionalName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", provider_r7.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("average", provider_r7.ratingAverage)("count", provider_r7.ratingCount);
    i0.ɵɵadvance();
    i0.ɵɵconditional(provider_r7.available ? 10 : 11);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("provider", provider_r7);
    i0.ɵɵadvance();
    i0.ɵɵconditional(provider_r7.description ? 13 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(provider_r7.offerings);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(provider_r7.serviceAreas);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("providerId", provider_r7.id);
} }
export class ProviderProfilePage {
    providerService = inject(ProviderService);
    title = inject(Title);
    // Vem do :id da rota (withComponentInputBinding)
    id = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []));
    providerId = computed(() => parsePositiveInt(this.id()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "providerId" }] : /* istanbul ignore next */ []));
    profile = loadResource(() => this.providerId(), (id) => id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 })) // /profissionais/abc: mesmo caminho do "não existe"
        : this.providerService.get(id));
    constructor() {
        // O título da aba passa a ser o nome do profissional (também é o que o leitor de tela anuncia)
        effect(() => {
            const state = this.profile.state();
            if (state.status === 'ready') {
                this.title.setTitle(`${state.data.professionalName} | CampoCerto`);
            }
        });
    }
    static ɵfac = function ProviderProfilePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProviderProfilePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProviderProfilePage, selectors: [["app-provider-profile-page"]], inputs: { id: [1, "id"] }, decls: 7, vars: 2, consts: [[1, "container", "page-section"], ["routerLink", "/profissionais", 1, "link-back"], ["message", "Carregando perfil..."], [1, "profile"], ["title", "Profissional n\u00E3o encontrado", "message", "Este perfil n\u00E3o existe ou n\u00E3o est\u00E1 mais dispon\u00EDvel."], [3, "message"], ["routerLink", "/profissionais", 1, "btn", "btn-primary"], [3, "retry", "message"], [1, "card", "profile-header"], [1, "city"], ["aria-hidden", "true"], [3, "average", "count"], ["role", "status", 1, "alert", "alert-info"], [3, "provider"], ["aria-labelledby", "about-title", 1, "card", "profile-section"], ["aria-labelledby", "services-title", 1, "card", "profile-section"], ["id", "services-title"], [1, "price-list"], ["aria-labelledby", "areas-title", 1, "card", "profile-section"], ["id", "areas-title"], [1, "chips"], [1, "chip"], [3, "providerId"], [1, "badge", "badge-ok"], ["id", "about-title"], [1, "description"], [1, "muted"]], template: function ProviderProfilePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "div", 0)(2, "a", 1);
            i0.ɵɵtext(3, "\u2039 Voltar \u00E0 busca");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(4, ProviderProfilePage_Conditional_4_Template, 1, 0, "app-loading-state", 2)(5, ProviderProfilePage_Conditional_5_Template, 2, 1)(6, ProviderProfilePage_Conditional_6_Template, 27, 9, "article", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const result_r8 = i0.ɵɵstoreLet(ctx.profile.state());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(result_r8.status === "loading" ? 4 : result_r8.status === "error" ? 5 : 6);
        } }, dependencies: [RouterLink, RatingStars, LoadingState, EmptyState, ErrorState, ReviewsSection, ProviderContact], styles: [".profile[_ngcontent-%COMP%] { display: grid; gap: 1rem; }\n\n.profile-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin-bottom: 0.25rem; }\n.profile-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0.35rem 0; }\n.city[_ngcontent-%COMP%] { color: var(--%NS%muted); }\n\n.profile-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin-top: 0; }\n\n\n.description[_ngcontent-%COMP%] { margin: 0; white-space: pre-line; overflow-wrap: anywhere; }\n\n.price-list[_ngcontent-%COMP%] { margin: 0; padding: 0; list-style: none; }\n\n.price-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  gap: 0.25rem 1rem;\n  padding: 0.65rem 0;\n  border-bottom: 1px solid var(--%NS%border);\n}\n\n.price-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child { border-bottom: 0; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProviderProfilePage, [{
        type: Component,
        args: [{ selector: 'app-provider-profile-page', imports: [RouterLink, RatingStars, LoadingState, EmptyState, ErrorState, ReviewsSection, ProviderContact], template: "@let result = profile.state();\n\n<div class=\"container page-section\">\n  <a class=\"link-back\" routerLink=\"/profissionais\">\u2039 Voltar \u00E0 busca</a>\n\n  @if (result.status === 'loading') {\n    <app-loading-state message=\"Carregando perfil...\" />\n  } @else if (result.status === 'error') {\n    @if (result.error.status === 404) {\n      <app-empty-state title=\"Profissional n\u00E3o encontrado\" message=\"Este perfil n\u00E3o existe ou n\u00E3o est\u00E1 mais dispon\u00EDvel.\">\n        <a class=\"btn btn-primary\" routerLink=\"/profissionais\">Ver outros profissionais</a>\n      </app-empty-state>\n    } @else {\n      <app-error-state [message]=\"result.error.message\" (retry)=\"profile.reload()\" />\n    }\n  } @else {\n    @let provider = result.data;\n\n    <article class=\"profile\">\n      <header class=\"card profile-header\">\n        <h1>{{ provider.professionalName }}</h1>\n        <p class=\"city\"><span aria-hidden=\"true\">\uD83D\uDCCD</span> {{ provider.city }}</p>\n        <app-rating-stars [average]=\"provider.ratingAverage\" [count]=\"provider.ratingCount\" />\n\n        @if (provider.available) {\n          <p><span class=\"badge badge-ok\">Dispon\u00EDvel para novos pedidos</span></p>\n        } @else {\n          <div class=\"alert alert-info\" role=\"status\">\n            Este profissional n\u00E3o est\u00E1 recebendo novos pedidos no momento.\n          </div>\n        }\n      </header>\n\n      <app-provider-contact [provider]=\"provider\" />\n\n      @if (provider.description) {\n        <section class=\"card profile-section\" aria-labelledby=\"about-title\">\n          <h2 id=\"about-title\">Sobre</h2>\n          <p class=\"description\">{{ provider.description }}</p>\n        </section>\n      }\n\n      <section class=\"card profile-section\" aria-labelledby=\"services-title\">\n        <h2 id=\"services-title\">Servi\u00E7os e pre\u00E7os</h2>\n        <ul class=\"price-list\">\n          @for (offering of provider.offerings; track offering.categoryId) {\n            <li>\n              <span>{{ offering.categoryName }}</span>\n              @if (offering.priceInfo) {\n                <strong>{{ offering.priceInfo }}</strong>\n              } @else {\n                <span class=\"muted\">Pre\u00E7o a combinar</span>\n              }\n            </li>\n          }\n        </ul>\n      </section>\n\n      <section class=\"card profile-section\" aria-labelledby=\"areas-title\">\n        <h2 id=\"areas-title\">Cidades atendidas</h2>\n        <ul class=\"chips\">\n          @for (area of provider.serviceAreas; track area) {\n            <li class=\"chip\">{{ area }}</li>\n          }\n        </ul>\n      </section>\n\n      <app-reviews-section [providerId]=\"provider.id\" />\n    </article>\n  }\n</div>\n", styles: [".profile { display: grid; gap: 1rem; }\n\n.profile-header h1 { margin-bottom: 0.25rem; }\n.profile-header p { margin: 0.35rem 0; }\n.city { color: var(--muted); }\n\n.profile-section h2 { margin-top: 0; }\n\n/* Texto do usu\u00E1rio: preserva quebras de linha, mas nunca \u00E9 interpretado como HTML */\n.description { margin: 0; white-space: pre-line; overflow-wrap: anywhere; }\n\n.price-list { margin: 0; padding: 0; list-style: none; }\n\n.price-list li {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  gap: 0.25rem 1rem;\n  padding: 0.65rem 0;\n  border-bottom: 1px solid var(--border);\n}\n\n.price-list li:last-child { border-bottom: 0; }\n"] }]
    }], () => [], { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProviderProfilePage, { className: "ProviderProfilePage", filePath: "src/app/features/providers/provider-profile-page.ts", lineNumber: 23 }); })();
