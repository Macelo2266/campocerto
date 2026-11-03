import { Component, input, output, viewChild } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["dialog"];
function ConfirmDialog_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
let nextDialogId = 0;
export class ConfirmDialog {
    title = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    message = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    confirmLabel = input('Confirmar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "confirmLabel" }] : /* istanbul ignore next */ []));
    cancelLabel = input('Voltar', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cancelLabel" }] : /* istanbul ignore next */ []));
    /** Ação destrutiva: o botão de confirmar fica vermelho. */
    danger = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "danger" }] : /* istanbul ignore next */ []));
    /** Requisição em andamento: bloqueia os botões e o Esc. */
    busy = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    /** Erro da requisição, mostrado dentro do diálogo. */
    error = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    confirmed = output();
    /** Disparado sempre que o diálogo fecha (Esc, "Voltar" ou fechado por código). */
    closed = output();
    // Cada diálogo tem ids próprios: o aria-labelledby não pode apontar para o diálogo errado
    uid = nextDialogId++;
    titleId = `confirm-title-${this.uid}`;
    messageId = `confirm-message-${this.uid}`;
    dialog = viewChild.required('dialog', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialog" }] : /* istanbul ignore next */ []));
    open() {
        const element = this.dialog().nativeElement;
        // showModal() lança um erro se o diálogo já estiver aberto
        if (!element.open) {
            element.showModal();
        }
    }
    close() {
        const element = this.dialog().nativeElement;
        if (element.open) {
            element.close();
        }
    }
    // Esc dispara o evento "cancel": enquanto há requisição em andamento, não deixamos fechar
    onCancel(event) {
        if (this.busy()) {
            event.preventDefault();
        }
    }
    static ɵfac = function ConfirmDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmDialog)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfirmDialog, selectors: [["app-confirm-dialog"]], viewQuery: function ConfirmDialog_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.dialog, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { title: [1, "title"], message: [1, "message"], confirmLabel: [1, "confirmLabel"], cancelLabel: [1, "cancelLabel"], danger: [1, "danger"], busy: [1, "busy"], error: [1, "error"] }, outputs: { confirmed: "confirmed", closed: "closed" }, decls: 12, vars: 15, consts: [["dialog", ""], [1, "confirm-dialog", 3, "cancel", "close"], [3, "id"], ["role", "alert", 1, "alert", "alert-error"], [1, "actions"], ["type", "button", "autofocus", "", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", 3, "click", "disabled"]], template: function ConfirmDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "dialog", 1, 0);
            i0.ɵɵdomListener("cancel", function ConfirmDialog_Template_dialog_cancel_0_listener($event) { return ctx.onCancel($event); })("close", function ConfirmDialog_Template_dialog_close_0_listener() { return ctx.closed.emit(); });
            i0.ɵɵdomElementStart(2, "h2", 2);
            i0.ɵɵtext(3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "p", 2);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(6, ConfirmDialog_Conditional_6_Template, 2, 1, "div", 3);
            i0.ɵɵdomElementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵdomListener("click", function ConfirmDialog_Template_button_click_8_listener() { return ctx.close(); });
            i0.ɵɵtext(9);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(10, "button", 6);
            i0.ɵɵdomListener("click", function ConfirmDialog_Template_button_click_10_listener() { return ctx.confirmed.emit(); });
            i0.ɵɵtext(11);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            let tmp_7_0;
            i0.ɵɵattribute("aria-labelledby", ctx.titleId)("aria-describedby", ctx.messageId);
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("id", ctx.titleId);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("id", ctx.messageId);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.message());
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_7_0 = ctx.error()) ? 6 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("disabled", ctx.busy());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.cancelLabel(), " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("btn-danger", ctx.danger())("btn-primary", !ctx.danger());
            i0.ɵɵdomProperty("disabled", ctx.busy());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.busy() ? "Aguarde..." : ctx.confirmLabel(), " ");
        } }, styles: [".confirm-dialog[_ngcontent-%COMP%] {\n  width: min(100% - 2rem, 30rem);\n  padding: 1.5rem;\n  border: 1px solid var(--%NS%border);\n  border-radius: var(--%NS%radius);\n  background: var(--%NS%surface);\n  color: var(--%NS%text);\n  box-shadow: 0 12px 40px rgb(0 0 0 / 0.3);\n}\n\n.confirm-dialog[_ngcontent-%COMP%]::backdrop { background: rgb(0 0 0 / 0.55); }\n\nh2[_ngcontent-%COMP%] { margin-top: 0; font-size: 1.3rem; }\np[_ngcontent-%COMP%] { margin: 0 0 1.25rem; overflow-wrap: anywhere; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmDialog, [{
        type: Component,
        args: [{ selector: 'app-confirm-dialog', template: "<dialog\n  #dialog\n  class=\"confirm-dialog\"\n  [attr.aria-labelledby]=\"titleId\"\n  [attr.aria-describedby]=\"messageId\"\n  (cancel)=\"onCancel($event)\"\n  (close)=\"closed.emit()\"\n>\n  <h2 [id]=\"titleId\">{{ title() }}</h2>\n  <p [id]=\"messageId\">{{ message() }}</p>\n\n  @if (error(); as text) {\n    <div class=\"alert alert-error\" role=\"alert\">{{ text }}</div>\n  }\n\n  <div class=\"actions\">\n    <button type=\"button\" class=\"btn btn-secondary\" autofocus [disabled]=\"busy()\" (click)=\"close()\">\n      {{ cancelLabel() }}\n    </button>\n    <button\n      type=\"button\"\n      class=\"btn\"\n      [class.btn-danger]=\"danger()\"\n      [class.btn-primary]=\"!danger()\"\n      [disabled]=\"busy()\"\n      (click)=\"confirmed.emit()\"\n    >\n      {{ busy() ? 'Aguarde...' : confirmLabel() }}\n    </button>\n  </div>\n</dialog>\n", styles: [".confirm-dialog {\n  width: min(100% - 2rem, 30rem);\n  padding: 1.5rem;\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  background: var(--surface);\n  color: var(--text);\n  box-shadow: 0 12px 40px rgb(0 0 0 / 0.3);\n}\n\n.confirm-dialog::backdrop { background: rgb(0 0 0 / 0.55); }\n\nh2 { margin-top: 0; font-size: 1.3rem; }\np { margin: 0 0 1.25rem; overflow-wrap: anywhere; }\n"] }]
    }], null, { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: true }] }], confirmLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "confirmLabel", required: false }] }], cancelLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "cancelLabel", required: false }] }], danger: [{ type: i0.Input, args: [{ isSignal: true, alias: "danger", required: false }] }], busy: [{ type: i0.Input, args: [{ isSignal: true, alias: "busy", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], confirmed: [{ type: i0.Output, args: ["confirmed"] }], closed: [{ type: i0.Output, args: ["closed"] }], dialog: [{ type: i0.ViewChild, args: ['dialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfirmDialog, { className: "ConfirmDialog", filePath: "src/app/shared/confirm-dialog/confirm-dialog.ts", lineNumber: 10 }); })();
