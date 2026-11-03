import { Component, input } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class EmptyState {
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    message = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    static ɵfac = function EmptyState_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmptyState)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmptyState, selectors: [["app-empty-state"]], inputs: { title: [1, "title"], message: [1, "message"] }, ngContentSelectors: _c0, decls: 6, vars: 2, consts: [[1, "empty", "card"]], template: function EmptyState_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵdomElementStart(0, "div", 0)(1, "h2");
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵprojection(5);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message());
        } }, styles: [".empty[_ngcontent-%COMP%] { text-align: center; padding: 2rem 1.25rem; }\n    .empty[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin-top: 0; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmptyState, [{
        type: Component,
        args: [{ selector: 'app-empty-state', template: `
    <div class="empty card">
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
      <ng-content />
    </div>
  `, styles: ["\n    .empty { text-align: center; padding: 2rem 1.25rem; }\n    .empty h2 { margin-top: 0; }\n  "] }]
    }], null, { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmptyState, { className: "EmptyState", filePath: "src/app/shared/empty-state/empty-state.ts", lineNumber: 17 }); })();
