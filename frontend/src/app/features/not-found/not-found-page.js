import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class NotFoundPage {
    static ɵfac = function NotFoundPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotFoundPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotFoundPage, selectors: [["app-not-found-page"]], decls: 8, vars: 0, consts: [[1, "page-narrow"], [1, "card"], ["routerLink", "/", 1, "btn", "btn-primary"]], template: function NotFoundPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "P\u00E1gina n\u00E3o encontrada");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "O endere\u00E7o que voc\u00EA abriu n\u00E3o existe ou foi movido.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "a", 2);
            i0.ɵɵtext(7, "Voltar ao in\u00EDcio");
            i0.ɵɵelementEnd()()();
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotFoundPage, [{
        type: Component,
        args: [{ selector: 'app-not-found-page', imports: [RouterLink], template: "<section class=\"page-narrow\">\n  <div class=\"card\">\n    <h1>P\u00E1gina n\u00E3o encontrada</h1>\n    <p>O endere\u00E7o que voc\u00EA abriu n\u00E3o existe ou foi movido.</p>\n    <a class=\"btn btn-primary\" routerLink=\"/\">Voltar ao in\u00EDcio</a>\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotFoundPage, { className: "NotFoundPage", filePath: "src/app/features/not-found/not-found-page.ts", lineNumber: 9 }); })();
