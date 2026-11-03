import { Component, input } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingState {
    message = input('Carregando...', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    static ɵfac = function LoadingState_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingState)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoadingState, selectors: [["app-loading-state"]], inputs: { message: [1, "message"] }, decls: 4, vars: 1, consts: [["role", "status", 1, "loading"], ["aria-hidden", "true", 1, "spinner"]], template: function LoadingState_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵdomElement(1, "span", 1);
            i0.ɵɵdomElementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.message());
        } }, styles: [".loading[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 2rem 0;\n      color: var(--%NS%muted);\n      font-weight: 600;\n    }\n    .spinner[_ngcontent-%COMP%] {\n      width: 1.6rem;\n      height: 1.6rem;\n      border: 3px solid var(--%NS%green-100);\n      border-top-color: var(--%NS%green-700);\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n    }\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingState, [{
        type: Component,
        args: [{ selector: 'app-loading-state', template: `
    <div class="loading" role="status">
      <span class="spinner" aria-hidden="true"></span>
      <span>{{ message() }}</span>
    </div>
  `, styles: ["\n    .loading {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 2rem 0;\n      color: var(--muted);\n      font-weight: 600;\n    }\n    .spinner {\n      width: 1.6rem;\n      height: 1.6rem;\n      border: 3px solid var(--green-100);\n      border-top-color: var(--green-700);\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n    }\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n  "] }]
    }], null, { message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoadingState, { className: "LoadingState", filePath: "src/app/shared/loading-state/loading-state.ts", lineNumber: 33 }); })();
