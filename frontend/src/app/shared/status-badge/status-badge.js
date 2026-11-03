import { Component, computed, input } from '@angular/core';
import { STATUS_LABELS } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/models/service-request.model';
import * as i0 from "@angular/core";
export class StatusBadge {
    status = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    label = computed(() => STATUS_LABELS[this.status()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    static ɵfac = function StatusBadge_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatusBadge)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatusBadge, selectors: [["app-status-badge"]], inputs: { status: [1, "status"] }, decls: 2, vars: 2, consts: [[1, "status"]], template: function StatusBadge_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "span", 0);
            i0.ɵɵtext(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵattribute("data-status", ctx.status());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label());
        } }, styles: [".status[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 0.2rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.92rem;\n      font-weight: 700;\n      background: #ececec;\n      color: #2b2b2b;\n    }\n    [data-status='PENDENTE'][_ngcontent-%COMP%] { background: #fff1d6; color: #5c3b00; }\n    [data-status='EM_NEGOCIACAO'][_ngcontent-%COMP%] { background: #e3eefc; color: #0b3157; }\n    [data-status='ACEITA'][_ngcontent-%COMP%] { background: #e4f0e2; color: #1b3d22; }\n    [data-status='EM_ANDAMENTO'][_ngcontent-%COMP%] { background: #d9efef; color: #0d3b3b; }\n    [data-status='CONCLUIDA'][_ngcontent-%COMP%] { background: #2d6a35; color: #fff; }\n    [data-status='CANCELADA'][_ngcontent-%COMP%] { background: #ececec; color: #2b2b2b; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusBadge, [{
        type: Component,
        args: [{ selector: 'app-status-badge', template: `<span class="status" [attr.data-status]="status()">{{ label() }}</span>`, styles: ["\n    .status {\n      display: inline-block;\n      padding: 0.2rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.92rem;\n      font-weight: 700;\n      background: #ececec;\n      color: #2b2b2b;\n    }\n    [data-status='PENDENTE'] { background: #fff1d6; color: #5c3b00; }\n    [data-status='EM_NEGOCIACAO'] { background: #e3eefc; color: #0b3157; }\n    [data-status='ACEITA'] { background: #e4f0e2; color: #1b3d22; }\n    [data-status='EM_ANDAMENTO'] { background: #d9efef; color: #0d3b3b; }\n    [data-status='CONCLUIDA'] { background: #2d6a35; color: #fff; }\n    [data-status='CANCELADA'] { background: #ececec; color: #2b2b2b; }\n  "] }]
    }], null, { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatusBadge, { className: "StatusBadge", filePath: "src/app/shared/status-badge/status-badge.ts", lineNumber: 26 }); })();
