import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingStars } from '../rating-stars/rating-stars';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/profissionais", a0];
function ProviderCard_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.provider().shortDescription);
} }
function ProviderCard_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r2);
} }
function ProviderCard_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 7);
    i0.ɵɵrepeaterCreate(1, ProviderCard_Conditional_10_For_2_Template, 2, 1, "li", 8, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.provider().categories);
} }
export class ProviderCard {
    provider = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "provider" }] : /* istanbul ignore next */ []));
    static ɵfac = function ProviderCard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProviderCard)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProviderCard, selectors: [["app-provider-card"]], inputs: { provider: [1, "provider"] }, decls: 11, vars: 9, consts: [[1, "card", "provider-card"], [1, "name"], [1, "stretched", 3, "routerLink"], [1, "city"], ["aria-hidden", "true"], [3, "average", "count"], [1, "desc"], ["aria-label", "Servi\u00E7os oferecidos", 1, "chips"], [1, "chip"]], template: function ProviderCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "h3", 1)(2, "a", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "p", 3)(5, "span", 4);
            i0.ɵɵtext(6, "\uD83D\uDCCD");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "app-rating-stars", 5);
            i0.ɵɵconditionalCreate(9, ProviderCard_Conditional_9_Template, 2, 1, "p", 6);
            i0.ɵɵconditionalCreate(10, ProviderCard_Conditional_10_Template, 3, 0, "ul", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c0, ctx.provider().id));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.provider().professionalName);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.provider().city);
            i0.ɵɵadvance();
            i0.ɵɵproperty("average", ctx.provider().ratingAverage)("count", ctx.provider().ratingCount);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.provider().shortDescription ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.provider().categories.length > 0 ? 10 : -1);
        } }, dependencies: [RouterLink, RatingStars], styles: [".provider-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  height: 100%;\n}\n\n.provider-card[_ngcontent-%COMP%]:hover { box-shadow: 0 2px 6px rgb(0 0 0 / 0.12), 0 8px 20px rgb(0 0 0 / 0.08); }\n\n.name[_ngcontent-%COMP%] { margin: 0; font-size: 1.2rem; }\n.name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { text-decoration: none; }\n.name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n\n\n.stretched[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n}\n\n.stretched[_ngcontent-%COMP%]:focus-visible { outline: none; }\n.provider-card[_ngcontent-%COMP%]:has(.stretched:focus-visible) { outline: 3px solid #0b57d0; outline-offset: 3px; }\n\n.city[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); }\n.desc[_ngcontent-%COMP%] { margin: 0; }\n.chips[_ngcontent-%COMP%] { margin-top: auto; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProviderCard, [{
        type: Component,
        args: [{ selector: 'app-provider-card', imports: [RouterLink, RatingStars], template: "<article class=\"card provider-card\">\n  <h3 class=\"name\">\n    <a class=\"stretched\" [routerLink]=\"['/profissionais', provider().id]\">{{ provider().professionalName }}</a>\n  </h3>\n\n  <p class=\"city\"><span aria-hidden=\"true\">\uD83D\uDCCD</span> {{ provider().city }}</p>\n\n  <app-rating-stars [average]=\"provider().ratingAverage\" [count]=\"provider().ratingCount\" />\n\n  @if (provider().shortDescription) {\n    <p class=\"desc\">{{ provider().shortDescription }}</p>\n  }\n\n  @if (provider().categories.length > 0) {\n    <ul class=\"chips\" aria-label=\"Servi\u00E7os oferecidos\">\n      @for (category of provider().categories; track category) {\n        <li class=\"chip\">{{ category }}</li>\n      }\n    </ul>\n  }\n</article>\n", styles: [".provider-card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  height: 100%;\n}\n\n.provider-card:hover { box-shadow: 0 2px 6px rgb(0 0 0 / 0.12), 0 8px 20px rgb(0 0 0 / 0.08); }\n\n.name { margin: 0; font-size: 1.2rem; }\n.name a { text-decoration: none; }\n.name a:hover { text-decoration: underline; }\n\n/* O link \"estica\" e cobre o cart\u00E3o inteiro: o cart\u00E3o todo \u00E9 clic\u00E1vel, e s\u00F3 existe UM link para o teclado */\n.stretched::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n}\n\n.stretched:focus-visible { outline: none; }\n.provider-card:has(.stretched:focus-visible) { outline: 3px solid #0b57d0; outline-offset: 3px; }\n\n.city { margin: 0; color: var(--muted); }\n.desc { margin: 0; }\n.chips { margin-top: auto; }\n"] }]
    }], null, { provider: [{ type: i0.Input, args: [{ isSignal: true, alias: "provider", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProviderCard, { className: "ProviderCard", filePath: "src/app/shared/provider-card/provider-card.ts", lineNumber: 13 }); })();
