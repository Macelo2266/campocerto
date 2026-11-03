import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { WhatsappButton } from '../../shared/whatsapp-button/whatsapp-button';
import { parsePositiveInt } from './search-query';
import * as i0 from "@angular/core";
const _c0 = a0 => ({ returnUrl: a0 });
const _c1 = a0 => ["/profissionais", a0, "solicitar"];
const _c2 = a0 => ({ servico: a0 });
const _forTrack0 = ($index, $item) => $item.categoryId;
function ProviderContact_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Para pedir um or\u00E7amento ou conversar pelo WhatsApp, entre na sua conta.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 4)(3, "a", 5);
    i0.ɵɵtext(4, "Entrar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 6);
    i0.ɵɵtext(6, "Criar conta");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(2, _c0, ctx_r0.returnUrl()));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(4, _c0, ctx_r0.returnUrl()));
} }
function ProviderContact_Conditional_0_Conditional_4_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", offering_r4.categoryId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(offering_r4.categoryName);
} }
function ProviderContact_Conditional_0_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "label", 8);
    i0.ɵɵtext(2, "Qual servi\u00E7o voc\u00EA procura? (opcional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 9, 0);
    i0.ɵɵlistener("change", function ProviderContact_Conditional_0_Conditional_4_Template_select_change_3_listener() { i0.ɵɵrestoreView(_r2); const service_r3 = i0.ɵɵreference(4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectService(service_r3.value)); });
    i0.ɵɵelementStart(5, "option", 10);
    i0.ɵɵtext(6, "Escolher depois");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(7, ProviderContact_Conditional_0_Conditional_4_For_8_Template, 2, 2, "option", 11, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 4)(10, "a", 12);
    i0.ɵɵtext(11, " Pedir or\u00E7amento ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 13);
    i0.ɵɵelement(13, "app-whatsapp-button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r0.provider().offerings);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(4, _c1, ctx_r0.provider().id))("queryParams", i0.ɵɵpureFunction1(6, _c2, ctx_r0.selectedService()));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("providerId", ctx_r0.provider().id)("categoryId", ctx_r0.selectedService());
} }
function ProviderContact_Conditional_0_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1, " Contas de prestador e de administrador n\u00E3o pedem or\u00E7amentos. Para contratar um servi\u00E7o, use uma conta de agricultor. ");
    i0.ɵɵelementEnd();
} }
function ProviderContact_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "h2", 2);
    i0.ɵɵtext(2, "Contratar este profissional");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ProviderContact_Conditional_0_Conditional_3_Template, 7, 6)(4, ProviderContact_Conditional_0_Conditional_4_Template, 14, 8)(5, ProviderContact_Conditional_0_Conditional_5_Template, 2, 0, "p", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!ctx_r0.auth.isLoggedIn() ? 3 : ctx_r0.auth.role() === "FARMER" ? 4 : 5);
} }
export class ProviderContact {
    auth = inject(AuthService);
    provider = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "provider" }] : /* istanbul ignore next */ []));
    selectedService = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "selectedService" }] : /* istanbul ignore next */ []));
    returnUrl = computed(() => `/profissionais/${this.provider().id}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "returnUrl" }] : /* istanbul ignore next */ []));
    selectService(value) {
        this.selectedService.set(parsePositiveInt(value));
    }
    static ɵfac = function ProviderContact_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProviderContact)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProviderContact, selectors: [["app-provider-contact"]], inputs: { provider: [1, "provider"] }, decls: 1, vars: 1, consts: [["service", ""], ["aria-labelledby", "contact-title", 1, "card"], ["id", "contact-title"], [1, "muted"], [1, "actions"], ["routerLink", "/entrar", 1, "btn", "btn-primary", 3, "queryParams"], ["routerLink", "/cadastrar", 1, "btn", "btn-secondary", 3, "queryParams"], [1, "field"], ["for", "contact-service"], ["id", "contact-service", 1, "input", 3, "change"], ["value", ""], [3, "value"], [1, "btn", "btn-primary", 3, "routerLink", "queryParams"], [1, "whatsapp"], [3, "providerId", "categoryId"]], template: function ProviderContact_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ProviderContact_Conditional_0_Template, 6, 1, "section", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.provider().available ? 0 : -1);
        } }, dependencies: [RouterLink, WhatsappButton], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProviderContact, [{
        type: Component,
        args: [{ selector: 'app-provider-contact', imports: [RouterLink, WhatsappButton], template: "@if (provider().available) {\n  <section class=\"card\" aria-labelledby=\"contact-title\">\n    <h2 id=\"contact-title\">Contratar este profissional</h2>\n\n    @if (!auth.isLoggedIn()) {\n      <p>Para pedir um or\u00E7amento ou conversar pelo WhatsApp, entre na sua conta.</p>\n      <div class=\"actions\">\n        <a class=\"btn btn-primary\" routerLink=\"/entrar\" [queryParams]=\"{ returnUrl: returnUrl() }\">Entrar</a>\n        <a class=\"btn btn-secondary\" routerLink=\"/cadastrar\" [queryParams]=\"{ returnUrl: returnUrl() }\">Criar conta</a>\n      </div>\n    } @else if (auth.role() === 'FARMER') {\n      <div class=\"field\">\n        <label for=\"contact-service\">Qual servi\u00E7o voc\u00EA procura? (opcional)</label>\n        <select #service id=\"contact-service\" class=\"input\" (change)=\"selectService(service.value)\">\n          <option value=\"\">Escolher depois</option>\n          @for (offering of provider().offerings; track offering.categoryId) {\n            <option [value]=\"offering.categoryId\">{{ offering.categoryName }}</option>\n          }\n        </select>\n      </div>\n\n      <div class=\"actions\">\n        <a\n          class=\"btn btn-primary\"\n          [routerLink]=\"['/profissionais', provider().id, 'solicitar']\"\n          [queryParams]=\"{ servico: selectedService() }\"\n        >\n          Pedir or\u00E7amento\n        </a>\n      </div>\n\n      <div class=\"whatsapp\">\n        <app-whatsapp-button [providerId]=\"provider().id\" [categoryId]=\"selectedService()\" />\n      </div>\n    } @else {\n      <p class=\"muted\">\n        Contas de prestador e de administrador n\u00E3o pedem or\u00E7amentos. Para contratar um servi\u00E7o, use uma conta de\n        agricultor.\n      </p>\n    }\n  </section>\n}\n" }]
    }], null, { provider: [{ type: i0.Input, args: [{ isSignal: true, alias: "provider", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProviderContact, { className: "ProviderContact", filePath: "src/app/features/providers/provider-contact.ts", lineNumber: 14 }); })();
