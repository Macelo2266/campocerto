import { Component, computed, input } from '@angular/core';
import { formatRating, pluralize } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/util/format';
import * as i0 from "@angular/core";
function RatingStars_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(", com ", ctx_r0.countText());
} }
function RatingStars_Conditional_0_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span");
    i0.ɵɵtext(1, "\u2605");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const star_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("on", star_r2 <= ctx_r0.filled());
} }
function RatingStars_Conditional_0_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 5)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.averageText());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", ctx_r0.countText(), ")");
} }
function RatingStars_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 0)(1, "span", 2);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, RatingStars_Conditional_0_Conditional_3_Template, 1, 1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "span", 3);
    i0.ɵɵrepeaterCreate(5, RatingStars_Conditional_0_For_6_Template, 2, 2, "span", 4, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(7, RatingStars_Conditional_0_Conditional_7_Template, 4, 2, "span", 5);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Nota ", ctx_r0.averageText(), " de 5");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.compact() ? 3 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.stars);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.compact() ? 7 : -1);
} }
function RatingStars_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 1);
    i0.ɵɵtext(1, "Novo na plataforma");
    i0.ɵɵdomElementEnd();
} }
export class RatingStars {
    /** Média (0 a 5). null = ainda sem avaliações. */
    average = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "average" }] : /* istanbul ignore next */ []));
    count = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "count" }] : /* istanbul ignore next */ []));
    /** Modo compacto: só as estrelas (usado em uma avaliação individual). */
    compact = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []));
    stars = [1, 2, 3, 4, 5];
    hasRating = computed(() => this.average() !== null && (this.compact() || this.count() > 0), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasRating" }] : /* istanbul ignore next */ []));
    filled = computed(() => Math.round(this.average() ?? 0), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filled" }] : /* istanbul ignore next */ []));
    averageText = computed(() => formatRating(this.average() ?? 0), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "averageText" }] : /* istanbul ignore next */ []));
    countText = computed(() => `${this.count()} ${pluralize(this.count(), 'avaliação', 'avaliações')}`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "countText" }] : /* istanbul ignore next */ []));
    static ɵfac = function RatingStars_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RatingStars)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RatingStars, selectors: [["app-rating-stars"]], inputs: { average: [1, "average"], count: [1, "count"], compact: [1, "compact"] }, decls: 2, vars: 1, consts: [[1, "rating"], [1, "badge", "badge-new"], [1, "sr-only"], ["aria-hidden", "true", 1, "stars"], [3, "on"], ["aria-hidden", "true", 1, "rating-text"]], template: function RatingStars_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, RatingStars_Conditional_0_Template, 8, 3, "span", 0)(1, RatingStars_Conditional_1_Template, 2, 0, "span", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.hasRating() ? 0 : 1);
        } }, styles: [".rating[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n\n.stars[_ngcontent-%COMP%] { letter-spacing: 0.1rem; font-size: 1.15rem; line-height: 1; }\n.stars[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--%NS%border); }\n.stars[_ngcontent-%COMP%]   .on[_ngcontent-%COMP%] { color: #b7791f; }\n\n.rating-text[_ngcontent-%COMP%] { font-size: 0.95rem; color: var(--%NS%muted); }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RatingStars, [{
        type: Component,
        args: [{ selector: 'app-rating-stars', template: "@if (hasRating()) {\n  <span class=\"rating\">\n    <span class=\"sr-only\">\n      Nota {{ averageText() }} de 5@if (!compact()) {, com {{ countText() }}}\n    </span>\n\n    <span class=\"stars\" aria-hidden=\"true\">\n      @for (star of stars; track star) {\n        <span [class.on]=\"star <= filled()\">\u2605</span>\n      }\n    </span>\n\n    @if (!compact()) {\n      <span class=\"rating-text\" aria-hidden=\"true\"><strong>{{ averageText() }}</strong> ({{ countText() }})</span>\n    }\n  </span>\n} @else {\n  <span class=\"badge badge-new\">Novo na plataforma</span>\n}\n", styles: [".rating {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n\n.stars { letter-spacing: 0.1rem; font-size: 1.15rem; line-height: 1; }\n.stars span { color: var(--border); }\n.stars .on { color: #b7791f; }\n\n.rating-text { font-size: 0.95rem; color: var(--muted); }\n"] }]
    }], null, { average: [{ type: i0.Input, args: [{ isSignal: true, alias: "average", required: false }] }], count: [{ type: i0.Input, args: [{ isSignal: true, alias: "count", required: false }] }], compact: [{ type: i0.Input, args: [{ isSignal: true, alias: "compact", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RatingStars, { className: "RatingStars", filePath: "src/app/shared/rating-stars/rating-stars.ts", lineNumber: 10 }); })();
