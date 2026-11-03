import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
const _c0 = () => [];
function Pagination_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1)(1, "span", 5);
    i0.ɵɵtext(2, "\u2039\u00A0");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, "Anterior ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c0))("queryParams", ctx_r0.paramsFor(ctx_r0.page() - 1));
} }
function Pagination_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 2)(1, "span", 5);
    i0.ɵɵtext(2, "\u2039\u00A0");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, "Anterior ");
    i0.ɵɵelementEnd();
} }
function Pagination_Conditional_0_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵtext(1, " Pr\u00F3xima");
    i0.ɵɵelementStart(2, "span", 5);
    i0.ɵɵtext(3, "\u00A0\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c0))("queryParams", ctx_r0.paramsFor(ctx_r0.page() + 1));
} }
function Pagination_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 2);
    i0.ɵɵtext(1, " Pr\u00F3xima");
    i0.ɵɵelementStart(2, "span", 5);
    i0.ɵɵtext(3, "\u00A0\u203A");
    i0.ɵɵelementEnd()();
} }
function Pagination_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 0);
    i0.ɵɵconditionalCreate(1, Pagination_Conditional_0_Conditional_1_Template, 4, 3, "a", 1)(2, Pagination_Conditional_0_Conditional_2_Template, 4, 0, "span", 2);
    i0.ɵɵelementStart(3, "span", 3);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, Pagination_Conditional_0_Conditional_5_Template, 4, 3, "a", 4)(6, Pagination_Conditional_0_Conditional_6_Template, 4, 0, "span", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasPrevious() ? 1 : 2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("P\u00E1gina ", ctx_r0.page(), " de ", ctx_r0.totalPages());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasNext() ? 5 : 6);
} }
export class Pagination {
    /** Página atual, começando em 1. */
    page = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    totalPages = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    hasPrevious = computed(() => this.page() > 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasPrevious" }] : /* istanbul ignore next */ []));
    hasNext = computed(() => this.page() < this.totalPages(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasNext" }] : /* istanbul ignore next */ []));
    // Página 1 não precisa aparecer na URL
    paramsFor(target) {
        return { page: target <= 1 ? null : target };
    }
    static ɵfac = function Pagination_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Pagination)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Pagination, selectors: [["app-pagination"]], inputs: { page: [1, "page"], totalPages: [1, "totalPages"] }, decls: 1, vars: 1, consts: [["aria-label", "Pagina\u00E7\u00E3o dos resultados", 1, "pagination"], ["rel", "prev", "queryParamsHandling", "merge", 1, "btn", "btn-secondary", 3, "routerLink", "queryParams"], ["aria-disabled", "true", 1, "btn", "btn-secondary", "is-disabled"], ["aria-current", "page", 1, "page-info"], ["rel", "next", "queryParamsHandling", "merge", 1, "btn", "btn-secondary", 3, "routerLink", "queryParams"], ["aria-hidden", "true"]], template: function Pagination_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, Pagination_Conditional_0_Template, 7, 4, "nav", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.totalPages() > 1 ? 0 : -1);
        } }, dependencies: [RouterLink], styles: [".pagination[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem 1rem;\n  margin-top: 1.5rem;\n}\n\n.page-info[_ngcontent-%COMP%] { font-weight: 700; }\n\n.is-disabled[_ngcontent-%COMP%] { opacity: 0.45; cursor: not-allowed; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Pagination, [{
        type: Component,
        args: [{ selector: 'app-pagination', imports: [RouterLink], template: "@if (totalPages() > 1) {\n  <nav class=\"pagination\" aria-label=\"Pagina\u00E7\u00E3o dos resultados\">\n    @if (hasPrevious()) {\n      <a class=\"btn btn-secondary\" rel=\"prev\" [routerLink]=\"[]\" [queryParams]=\"paramsFor(page() - 1)\" queryParamsHandling=\"merge\">\n        <span aria-hidden=\"true\">\u2039&nbsp;</span>Anterior\n      </a>\n    } @else {\n      <span class=\"btn btn-secondary is-disabled\" aria-disabled=\"true\">\n        <span aria-hidden=\"true\">\u2039&nbsp;</span>Anterior\n      </span>\n    }\n\n    <span class=\"page-info\" aria-current=\"page\">P\u00E1gina {{ page() }} de {{ totalPages() }}</span>\n\n    @if (hasNext()) {\n      <a class=\"btn btn-secondary\" rel=\"next\" [routerLink]=\"[]\" [queryParams]=\"paramsFor(page() + 1)\" queryParamsHandling=\"merge\">\n        Pr\u00F3xima<span aria-hidden=\"true\">&nbsp;\u203A</span>\n      </a>\n    } @else {\n      <span class=\"btn btn-secondary is-disabled\" aria-disabled=\"true\">\n        Pr\u00F3xima<span aria-hidden=\"true\">&nbsp;\u203A</span>\n      </span>\n    }\n  </nav>\n}\n", styles: [".pagination {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem 1rem;\n  margin-top: 1.5rem;\n}\n\n.page-info { font-weight: 700; }\n\n.is-disabled { opacity: 0.45; cursor: not-allowed; }\n"] }]
    }], null, { page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: true }] }], totalPages: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalPages", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Pagination, { className: "Pagination", filePath: "src/app/shared/pagination/pagination.ts", lineNumber: 10 }); })();
