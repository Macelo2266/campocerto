import { Component, input, model, signal, viewChild } from '@angular/core';
import { cityKey } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/core/util/city';
import * as i0 from "@angular/core";
const _c0 = ["cityInput"];
function CityListEditor_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "option", 7);
} if (rf & 2) {
    const name_r1 = ctx.$implicit;
    i0.ɵɵdomProperty("value", name_r1);
} }
function CityListEditor_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" A sua cidade principal (", ctx_r1.baseCity(), ") j\u00E1 est\u00E1 inclu\u00EDda. ");
} }
function CityListEditor_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function CityListEditor_Conditional_15_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "li", 12);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementStart(2, "button", 13);
    i0.ɵɵdomListener("click", function CityListEditor_Conditional_15_For_2_Template_button_click_2_listener() { const city_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.remove(city_r4)); });
    i0.ɵɵdomElementStart(3, "span", 14);
    i0.ɵɵtext(4, "\u2715");
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const city_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", city_r4, " ");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Remover " + city_r4);
} }
function CityListEditor_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "ul", 10);
    i0.ɵɵrepeaterCreate(1, CityListEditor_Conditional_15_For_2_Template, 5, 2, "li", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.cities());
} }
export class CityListEditor {
    /** A lista de cidades (ligação nos dois sentidos com a tela que usa o componente). */
    cities = model([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cities" }] : /* istanbul ignore next */ []));
    suggestions = input([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "suggestions" }] : /* istanbul ignore next */ []));
    /** A cidade principal já está incluída automaticamente e não entra na lista. */
    baseCity = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "baseCity" }] : /* istanbul ignore next */ []));
    max = input(30, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    inputId = input('city-editor', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "inputId" }] : /* istanbul ignore next */ []));
    field = viewChild.required('cityInput', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "field" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    statusMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "statusMessage" }] : /* istanbul ignore next */ []));
    add(event) {
        // Enter dentro do campo não pode enviar o formulário inteiro
        event?.preventDefault();
        const input = this.field().nativeElement;
        const name = input.value.trim().replace(/\s+/g, ' ');
        const key = cityKey(name);
        if (name === '') {
            return this.fail('Digite o nome da cidade.');
        }
        if (key === '') {
            return this.fail('Digite um nome de cidade válido.');
        }
        if (key === cityKey(this.baseCity())) {
            return this.fail('A sua cidade principal já está incluída automaticamente.');
        }
        if (this.cities().some((city) => cityKey(city) === key)) {
            return this.fail('Esta cidade já está na lista.');
        }
        if (this.cities().length >= this.max()) {
            return this.fail(`Você pode informar até ${this.max()} cidades.`);
        }
        this.cities.update((list) => [...list, name]);
        input.value = '';
        input.focus();
        this.errorMessage.set(null);
        this.statusMessage.set(`Cidade adicionada: ${name}.`);
    }
    remove(city) {
        this.cities.update((list) => list.filter((item) => item !== city));
        this.errorMessage.set(null);
        this.statusMessage.set(`Cidade removida: ${city}.`);
        // O botão que foi clicado deixou de existir: o foco vai para o campo, e não se perde
        this.field().nativeElement.focus();
    }
    fail(message) {
        this.errorMessage.set(message);
        this.statusMessage.set('');
    }
    static ɵfac = function CityListEditor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CityListEditor)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CityListEditor, selectors: [["app-city-list-editor"]], viewQuery: function CityListEditor_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.field, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { cities: [1, "cities"], suggestions: [1, "suggestions"], baseCity: [1, "baseCity"], max: [1, "max"], inputId: [1, "inputId"] }, outputs: { cities: "citiesChange" }, decls: 18, vars: 11, consts: [["cityInput", ""], [1, "field"], [3, "for"], [1, "add-row"], ["type", "text", "maxlength", "100", "autocomplete", "off", 1, "input", 3, "keydown.enter", "id"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [3, "id"], [3, "value"], [1, "hint", 3, "id"], ["role", "alert", 1, "field-error"], ["aria-label", "Cidades adicionadas", 1, "chips"], ["role", "status", 1, "sr-only"], [1, "chip", "chip-removable"], ["type", "button", 1, "chip-remove", 3, "click"], ["aria-hidden", "true"]], template: function CityListEditor_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1)(1, "label", 2);
            i0.ɵɵtext(2, "Outras cidades que voc\u00EA atende");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "div", 3)(4, "input", 4, 0);
            i0.ɵɵdomListener("keydown.enter", function CityListEditor_Template_input_keydown_enter_4_listener($event) { return ctx.add($event); });
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "button", 5);
            i0.ɵɵdomListener("click", function CityListEditor_Template_button_click_6_listener() { return ctx.add(); });
            i0.ɵɵtext(7, "Adicionar");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(8, "datalist", 6);
            i0.ɵɵrepeaterCreate(9, CityListEditor_For_10_Template, 1, 1, "option", 7, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "p", 8);
            i0.ɵɵtext(12, " Digite o nome e toque em \"Adicionar\". ");
            i0.ɵɵconditionalCreate(13, CityListEditor_Conditional_13_Template, 1, 1);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(14, CityListEditor_Conditional_14_Template, 2, 1, "p", 9);
            i0.ɵɵconditionalCreate(15, CityListEditor_Conditional_15_Template, 3, 0, "ul", 10);
            i0.ɵɵdomElementStart(16, "p", 11);
            i0.ɵɵtext(17);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            let tmp_10_0;
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("htmlFor", ctx.inputId());
            i0.ɵɵadvance(3);
            i0.ɵɵdomProperty("id", ctx.inputId());
            i0.ɵɵattribute("list", ctx.inputId() + "-options")("aria-describedby", ctx.inputId() + "-hint")("aria-invalid", ctx.errorMessage() ? "true" : null);
            i0.ɵɵadvance(4);
            i0.ɵɵdomProperty("id", ctx.inputId() + "-options");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.suggestions());
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("id", ctx.inputId() + "-hint");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.baseCity() ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_10_0 = ctx.errorMessage()) ? 14 : -1, tmp_10_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.cities().length > 0 ? 15 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.statusMessage());
        } }, styles: [".add-row[_ngcontent-%COMP%] { display: flex; gap: 0.5rem; }\n.add-row[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n\n.chips[_ngcontent-%COMP%] { margin-top: 0.75rem; }\n\n.chip-removable[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 0.25rem; padding-right: 0.2rem; }\n\n.chip-remove[_ngcontent-%COMP%] {\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  border: 0;\n  border-radius: 999px;\n  background: none;\n  color: var(--%NS%green-900);\n  font-size: 1rem;\n  cursor: pointer;\n}\n\n.chip-remove[_ngcontent-%COMP%]:hover { background: var(--%NS%green-100); }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CityListEditor, [{
        type: Component,
        args: [{ selector: 'app-city-list-editor', template: "<div class=\"field\">\n  <label [for]=\"inputId()\">Outras cidades que voc\u00EA atende</label>\n\n  <div class=\"add-row\">\n    <input\n      #cityInput\n      class=\"input\"\n      type=\"text\"\n      maxlength=\"100\"\n      autocomplete=\"off\"\n      [id]=\"inputId()\"\n      [attr.list]=\"inputId() + '-options'\"\n      [attr.aria-describedby]=\"inputId() + '-hint'\"\n      [attr.aria-invalid]=\"errorMessage() ? 'true' : null\"\n      (keydown.enter)=\"add($event)\"\n    />\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"add()\">Adicionar</button>\n  </div>\n\n  <datalist [id]=\"inputId() + '-options'\">\n    @for (name of suggestions(); track name) {\n      <option [value]=\"name\"></option>\n    }\n  </datalist>\n\n  <p [id]=\"inputId() + '-hint'\" class=\"hint\">\n    Digite o nome e toque em \"Adicionar\".\n    @if (baseCity()) {\n      A sua cidade principal ({{ baseCity() }}) j\u00E1 est\u00E1 inclu\u00EDda.\n    }\n  </p>\n\n  @if (errorMessage(); as message) {\n    <p class=\"field-error\" role=\"alert\">{{ message }}</p>\n  }\n\n  @if (cities().length > 0) {\n    <ul class=\"chips\" aria-label=\"Cidades adicionadas\">\n      @for (city of cities(); track city) {\n        <li class=\"chip chip-removable\">\n          {{ city }}\n          <button type=\"button\" class=\"chip-remove\" [attr.aria-label]=\"'Remover ' + city\" (click)=\"remove(city)\">\n            <span aria-hidden=\"true\">\u2715</span>\n          </button>\n        </li>\n      }\n    </ul>\n  }\n\n  <!-- Anuncia para leitores de tela o que aconteceu (adicionou, removeu) -->\n  <p class=\"sr-only\" role=\"status\">{{ statusMessage() }}</p>\n</div>\n", styles: [".add-row { display: flex; gap: 0.5rem; }\n.add-row .input { flex: 1; min-width: 0; }\n\n.chips { margin-top: 0.75rem; }\n\n.chip-removable { display: inline-flex; align-items: center; gap: 0.25rem; padding-right: 0.2rem; }\n\n.chip-remove {\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  border: 0;\n  border-radius: 999px;\n  background: none;\n  color: var(--green-900);\n  font-size: 1rem;\n  cursor: pointer;\n}\n\n.chip-remove:hover { background: var(--green-100); }\n"] }]
    }], null, { cities: [{ type: i0.Input, args: [{ isSignal: true, alias: "cities", required: false }] }, { type: i0.Output, args: ["citiesChange"] }], suggestions: [{ type: i0.Input, args: [{ isSignal: true, alias: "suggestions", required: false }] }], baseCity: [{ type: i0.Input, args: [{ isSignal: true, alias: "baseCity", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], inputId: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], field: [{ type: i0.ViewChild, args: ['cityInput', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CityListEditor, { className: "CityListEditor", filePath: "src/app/shared/city-list-editor/city-list-editor.ts", lineNumber: 10 }); })();
