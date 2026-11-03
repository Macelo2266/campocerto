import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { ProviderService } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/api/provider.service';
import { toApiError } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/http/api-error';
import { isWhatsappUrl } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/util/whatsapp';
import * as i0 from "@angular/core";
function WhatsappButton_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 0)(1, "h3");
    i0.ɵɵtext(2, "Mensagem que ser\u00E1 enviada");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p", 3);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "p", 4);
    i0.ɵɵtext(6, " Voc\u00EA vai conversar pelo WhatsApp. Para ficar tudo registrado, pe\u00E7a o or\u00E7amento tamb\u00E9m aqui no CampoCerto. ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "div", 5)(8, "a", 6);
    i0.ɵɵtext(9, " Abrir o WhatsApp");
    i0.ɵɵdomElementStart(10, "span", 7);
    i0.ɵɵtext(11, " (abre em uma nova aba)");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(12, "button", 8);
    i0.ɵɵdomListener("click", function WhatsappButton_Conditional_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(13, "Fechar");
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const contact_r3 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(contact_r3.message);
    i0.ɵɵadvance(4);
    i0.ɵɵdomProperty("href", contact_r3.url, i0.ɵɵsanitizeUrl);
} }
function WhatsappButton_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 9);
    i0.ɵɵdomListener("click", function WhatsappButton_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.prepare()); });
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.loading() ? "Preparando..." : "Conversar pelo WhatsApp", " ");
} }
function WhatsappButton_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
export class WhatsappButton {
    providerService = inject(ProviderService);
    providerId = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "providerId" }] : /* istanbul ignore next */ []));
    categoryId = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "categoryId" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    link = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "link" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    constructor() {
        // Se o serviço escolhido mudar, a mensagem pronta deixa de valer: recomeça
        effect(() => {
            this.providerId();
            this.categoryId();
            untracked(() => {
                this.link.set(null);
                this.errorMessage.set(null);
            });
        });
    }
    prepare() {
        this.loading.set(true);
        this.errorMessage.set(null);
        this.providerService.whatsappLink(this.providerId(), this.categoryId()).subscribe({
            next: (link) => {
                if (isWhatsappUrl(link.url)) {
                    this.link.set(link);
                }
                else {
                    this.errorMessage.set('Não foi possível gerar o link de contato. Tente novamente mais tarde.');
                }
                this.loading.set(false);
            },
            error: (error) => {
                this.errorMessage.set(toApiError(error).message);
                this.loading.set(false);
            },
        });
    }
    close() {
        this.link.set(null);
    }
    static ɵfac = function WhatsappButton_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WhatsappButton)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WhatsappButton, selectors: [["app-whatsapp-button"]], inputs: { providerId: [1, "providerId"], categoryId: [1, "categoryId"] }, decls: 3, vars: 2, consts: [[1, "preview", "card"], ["type", "button", 1, "btn", "btn-secondary", 3, "disabled"], ["role", "alert", 1, "alert", "alert-error"], [1, "message"], [1, "hint"], [1, "actions"], ["target", "_blank", "rel", "noopener noreferrer", 1, "btn", "btn-primary", 3, "href"], [1, "sr-only"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"]], template: function WhatsappButton_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, WhatsappButton_Conditional_0_Template, 14, 2, "div", 0)(1, WhatsappButton_Conditional_1_Template, 2, 2, "button", 1);
            i0.ɵɵconditionalCreate(2, WhatsappButton_Conditional_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_1_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.link()) ? 0 : 1, tmp_0_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_1_0 = ctx.errorMessage()) ? 2 : -1, tmp_1_0);
        } }, styles: [".preview[_ngcontent-%COMP%] { margin-top: 0.75rem; background: var(--%NS%green-50); }\n.preview[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin-top: 0; }\n.message[_ngcontent-%COMP%] { margin: 0 0 0.75rem; padding: 0.75rem; border-radius: 8px; background: #fff; white-space: pre-line; overflow-wrap: anywhere; }\n.alert[_ngcontent-%COMP%] { margin-top: 0.75rem; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WhatsappButton, [{
        type: Component,
        args: [{ selector: 'app-whatsapp-button', template: "@if (link(); as contact) {\n  <div class=\"preview card\">\n    <h3>Mensagem que ser\u00E1 enviada</h3>\n    <p class=\"message\">{{ contact.message }}</p>\n    <p class=\"hint\">\n      Voc\u00EA vai conversar pelo WhatsApp. Para ficar tudo registrado, pe\u00E7a o or\u00E7amento tamb\u00E9m aqui no CampoCerto.\n    </p>\n    <div class=\"actions\">\n      <a class=\"btn btn-primary\" [href]=\"contact.url\" target=\"_blank\" rel=\"noopener noreferrer\">\n        Abrir o WhatsApp<span class=\"sr-only\"> (abre em uma nova aba)</span>\n      </a>\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close()\">Fechar</button>\n    </div>\n  </div>\n} @else {\n  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"prepare()\" [disabled]=\"loading()\">\n    {{ loading() ? 'Preparando...' : 'Conversar pelo WhatsApp' }}\n  </button>\n}\n\n@if (errorMessage(); as message) {\n  <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n}\n", styles: [".preview { margin-top: 0.75rem; background: var(--green-50); }\n.preview h3 { margin-top: 0; }\n.message { margin: 0 0 0.75rem; padding: 0.75rem; border-radius: 8px; background: #fff; white-space: pre-line; overflow-wrap: anywhere; }\n.alert { margin-top: 0.75rem; }\n"] }]
    }], () => [], { providerId: [{ type: i0.Input, args: [{ isSignal: true, alias: "providerId", required: true }] }], categoryId: [{ type: i0.Input, args: [{ isSignal: true, alias: "categoryId", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WhatsappButton, { className: "WhatsappButton", filePath: "src/app/shared/whatsapp-button/whatsapp-button.ts", lineNumber: 13 }); })();
