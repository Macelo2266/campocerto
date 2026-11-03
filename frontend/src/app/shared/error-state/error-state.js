import { Component, input, output } from '@angular/core';
import * as i0 from "@angular/core";
export class ErrorState {
    message = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    retry = output();
    static ɵfac = function ErrorState_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorState)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorState, selectors: [["app-error-state"]], inputs: { message: [1, "message"] }, outputs: { retry: "retry" }, decls: 5, vars: 1, consts: [["role", "alert", 1, "alert", "alert-error"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"]], template: function ErrorState_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "p");
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "button", 1);
            i0.ɵɵdomListener("click", function ErrorState_Template_button_click_3_listener() { return ctx.retry.emit(); });
            i0.ɵɵtext(4, "Tentar de novo");
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message());
        } }, styles: ["p[_ngcontent-%COMP%] { margin: 0 0 0.75rem; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorState, [{
        type: Component,
        args: [{ selector: 'app-error-state', template: `
    <div class="alert alert-error" role="alert">
      <p>{{ message() }}</p>
      <button type="button" class="btn btn-secondary" (click)="retry.emit()">Tentar de novo</button>
    </div>
  `, styles: ["\n    p { margin: 0 0 0.75rem; }\n  "] }]
    }], null, { message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: true }] }], retry: [{ type: i0.Output, args: ["retry"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ErrorState, { className: "ErrorState", filePath: "src/app/shared/error-state/error-state.ts", lineNumber: 15 }); })();
