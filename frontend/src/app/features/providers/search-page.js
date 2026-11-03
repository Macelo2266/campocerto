import { Component, computed, effect, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../core/api/category.service';
import { ProviderService } from '../../core/api/provider.service';
import { loadResource } from '../../core/http/load-state';
import { SORT_OPTIONS } from '../../core/models/provider.model';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { ProviderCard } from '../../shared/provider-card/provider-card';
import { DEFAULT_SORT, PAGE_SIZE, parsePositiveInt, parseSort, toQueryParams } from './search-query';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => ({ page: null });
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function SearchPage_Conditional_17_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.name);
} }
function SearchPage_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, SearchPage_Conditional_17_For_1_Template, 2, 2, "option", 12, _forTrack1);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const categoryList_r2 = i0.ɵɵreadContextLet(0);
    i0.ɵɵrepeater(categoryList_r2.data);
} }
function SearchPage_Conditional_24_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", ctx_r2.query().city);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.query().city);
} }
function SearchPage_Conditional_24_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", name_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(name_r4);
} }
function SearchPage_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, SearchPage_Conditional_24_Conditional_0_Template, 2, 2, "option", 12);
    i0.ɵɵrepeaterCreate(1, SearchPage_Conditional_24_For_2_Template, 2, 2, "option", 12, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const cityList_r5 = i0.ɵɵreadContextLet(1);
    i0.ɵɵconditional(ctx_r2.cityMissing(cityList_r5.data, ctx_r2.query().city) ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(cityList_r5.data);
} }
function SearchPage_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r6.label);
} }
function SearchPage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function SearchPage_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clear()); });
    i0.ɵɵtext(1, "Limpar filtros");
    i0.ɵɵelementEnd();
} }
function SearchPage_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const result_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.countText(result_r8.data.totalElements), " ");
} }
function SearchPage_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 17);
} }
function SearchPage_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 20);
    i0.ɵɵlistener("retry", function SearchPage_Conditional_38_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.results.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵproperty("message", result_r8.error.message);
} }
function SearchPage_Conditional_39_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 21)(1, "a", 23);
    i0.ɵɵtext(2, " Ver a primeira p\u00E1gina ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction0(1, _c0));
} }
function SearchPage_Conditional_39_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-empty-state", 22)(1, "button", 19);
    i0.ɵɵlistener("click", function SearchPage_Conditional_39_Conditional_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.clear()); });
    i0.ɵɵtext(2, "Limpar filtros");
    i0.ɵɵelementEnd()();
} }
function SearchPage_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, SearchPage_Conditional_39_Conditional_0_Template, 3, 2, "app-empty-state", 21)(1, SearchPage_Conditional_39_Conditional_1_Template, 3, 0, "app-empty-state", 22);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵconditional(result_r8.data.totalElements > 0 ? 0 : 1);
} }
function SearchPage_Conditional_40_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelement(1, "app-provider-card", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const provider_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("provider", provider_r11);
} }
function SearchPage_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 24);
    i0.ɵɵtext(1, "Resultados da busca");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "ul", 25);
    i0.ɵɵrepeaterCreate(3, SearchPage_Conditional_40_For_4_Template, 2, 1, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "app-pagination", 26);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const result_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(result_r8.data.content);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r2.query().page)("totalPages", result_r8.data.totalPages);
} }
export class SearchPage {
    router = inject(Router);
    fb = inject(NonNullableFormBuilder);
    providerService = inject(ProviderService);
    categoryService = inject(CategoryService);
    // Ligados aos parâmetros da URL por withComponentInputBinding()
    q = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "q" }] : /* istanbul ignore next */ []));
    category = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "category" }] : /* istanbul ignore next */ []));
    city = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "city" }] : /* istanbul ignore next */ []));
    sort = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "sort" }] : /* istanbul ignore next */ []));
    page = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "page" }] : /* istanbul ignore next */ []));
    sortOptions = SORT_OPTIONS;
    /** A URL, já sanitizada, é a fonte da verdade da busca. */
    query = computed(() => ({
        q: (this.q() ?? '').slice(0, 100),
        category: parsePositiveInt(this.category()),
        city: (this.city() ?? '').slice(0, 100),
        sort: parseSort(this.sort()),
        page: parsePositiveInt(this.page()) ?? 1,
        size: PAGE_SIZE,
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    hasFilters = computed(() => {
        const query = this.query();
        return query.q !== '' || query.category !== null || query.city !== '' || query.sort !== DEFAULT_SORT;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasFilters" }] : /* istanbul ignore next */ []));
    results = loadResource(() => this.query(), (query) => this.providerService.search(query));
    categories = loadResource(() => null, () => this.categoryService.list());
    cities = loadResource(() => null, () => this.providerService.cities());
    form = this.fb.group({
        q: [''],
        category: [''],
        city: [''],
        sort: this.fb.control(DEFAULT_SORT),
    });
    constructor() {
        // Mantém o formulário igual à URL (por exemplo, quando a pessoa usa o botão Voltar)
        effect(() => {
            const query = this.query();
            this.form.patchValue({
                q: query.q,
                category: query.category === null ? '' : String(query.category),
                city: query.city,
                sort: query.sort,
            }, { emitEvent: false });
        });
    }
    search() {
        void this.router.navigate(['/profissionais'], { queryParams: toQueryParams(this.form.getRawValue()) });
    }
    clear() {
        void this.router.navigate(['/profissionais']);
    }
    countText(total) {
        if (total === 0) {
            return 'Nenhum profissional encontrado';
        }
        return total === 1 ? '1 profissional encontrado' : `${total} profissionais encontrados`;
    }
    // A URL pode trazer uma cidade que não está na lista: mantemos como opção para o filtro não "sumir"
    cityMissing(cities, city) {
        return city !== '' && !cities.some((name) => name.localeCompare(city, 'pt-BR', { sensitivity: 'base' }) === 0);
    }
    static ɵfac = function SearchPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SearchPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchPage, selectors: [["app-search-page"]], inputs: { q: [1, "q"], category: [1, "category"], city: [1, "city"], sort: [1, "sort"], page: [1, "page"] }, decls: 41, vars: 9, consts: [[1, "container", "page-section"], ["role", "search", "aria-label", "Buscar profissionais", 1, "filters", "card", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "q"], ["id", "q", "type", "search", "formControlName", "q", "maxlength", "100", "autocomplete", "off", "placeholder", "Ex.: cerca, ro\u00E7agem, trator", 1, "input"], ["for", "category"], ["id", "category", "formControlName", "category", 1, "input"], ["value", ""], ["for", "city"], ["id", "city", "formControlName", "city", 1, "input"], ["for", "sort"], ["id", "sort", "formControlName", "sort", 1, "input"], [3, "value"], [1, "filter-actions"], ["type", "submit", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-secondary"], ["role", "status", 1, "results-count"], ["message", "Buscando profissionais..."], [3, "message"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [3, "retry", "message"], ["title", "Esta p\u00E1gina n\u00E3o existe", "message", "Os resultados terminaram antes dela."], ["title", "Nenhum profissional encontrado", "message", "Tente outro servi\u00E7o ou outra cidade, ou limpe os filtros para ver todos os profissionais."], ["routerLink", "/profissionais", "queryParamsHandling", "merge", 1, "btn", "btn-primary", 3, "queryParams"], [1, "sr-only"], [1, "provider-grid"], [3, "page", "totalPages"], [3, "provider"]], template: function SearchPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0)(1)(2);
            i0.ɵɵelementStart(3, "section", 0)(4, "h1");
            i0.ɵɵtext(5, "Encontrar profissionais");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 1);
            i0.ɵɵlistener("ngSubmit", function SearchPage_Template_form_ngSubmit_6_listener() { return ctx.search(); });
            i0.ɵɵelementStart(7, "div", 2)(8, "label", 3);
            i0.ɵɵtext(9, "O que voc\u00EA precisa?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "input", 4);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 2)(12, "label", 5);
            i0.ɵɵtext(13, "Servi\u00E7o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "select", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(15, "option", 7);
            i0.ɵɵtext(16, "Todos os servi\u00E7os");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, SearchPage_Conditional_17_Template, 2, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 2)(19, "label", 8);
            i0.ɵɵtext(20, "Cidade");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "select", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(22, "option", 7);
            i0.ɵɵtext(23, "Todas as cidades");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(24, SearchPage_Conditional_24_Template, 3, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 2)(26, "label", 10);
            i0.ɵɵtext(27, "Ordenar por");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 11);
            i0.ɵɵcontrolCreate();
            i0.ɵɵrepeaterCreate(29, SearchPage_For_30_Template, 2, 2, "option", 12, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 13)(32, "button", 14);
            i0.ɵɵtext(33, "Buscar");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(34, SearchPage_Conditional_34_Template, 2, 0, "button", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "p", 16);
            i0.ɵɵconditionalCreate(36, SearchPage_Conditional_36_Template, 1, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(37, SearchPage_Conditional_37_Template, 1, 0, "app-loading-state", 17)(38, SearchPage_Conditional_38_Template, 1, 1, "app-error-state", 18)(39, SearchPage_Conditional_39_Template, 2, 1)(40, SearchPage_Conditional_40_Template, 6, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const categoryList_r12 = i0.ɵɵstoreLet(ctx.categories.state());
            i0.ɵɵadvance();
            const cityList_r13 = i0.ɵɵstoreLet(ctx.cities.state());
            i0.ɵɵadvance();
            const result_r14 = i0.ɵɵstoreLet(ctx.results.state());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(categoryList_r12.status === "ready" ? 17 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(cityList_r13.status === "ready" ? 24 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.sortOptions);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.hasFilters() ? 34 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(result_r14.status === "ready" ? 36 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(result_r14.status === "loading" ? 37 : result_r14.status === "error" ? 38 : result_r14.data.content.length === 0 ? 39 : 40);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, ProviderCard, Pagination, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchPage, [{
        type: Component,
        args: [{ selector: 'app-search-page', imports: [ReactiveFormsModule, RouterLink, ProviderCard, Pagination, LoadingState, EmptyState, ErrorState], template: "@let categoryList = categories.state();\n@let cityList = cities.state();\n@let result = results.state();\n\n<section class=\"container page-section\">\n  <h1>Encontrar profissionais</h1>\n\n  <form class=\"filters card\" [formGroup]=\"form\" (ngSubmit)=\"search()\" role=\"search\" aria-label=\"Buscar profissionais\">\n    <div class=\"field\">\n      <label for=\"q\">O que voc\u00EA precisa?</label>\n      <input\n        id=\"q\"\n        class=\"input\"\n        type=\"search\"\n        formControlName=\"q\"\n        maxlength=\"100\"\n        autocomplete=\"off\"\n        placeholder=\"Ex.: cerca, ro\u00E7agem, trator\"\n      />\n    </div>\n\n    <div class=\"field\">\n      <label for=\"category\">Servi\u00E7o</label>\n      <select id=\"category\" class=\"input\" formControlName=\"category\">\n        <option value=\"\">Todos os servi\u00E7os</option>\n        @if (categoryList.status === 'ready') {\n          @for (item of categoryList.data; track item.id) {\n            <option [value]=\"item.id\">{{ item.name }}</option>\n          }\n        }\n      </select>\n    </div>\n\n    <div class=\"field\">\n      <label for=\"city\">Cidade</label>\n      <select id=\"city\" class=\"input\" formControlName=\"city\">\n        <option value=\"\">Todas as cidades</option>\n        @if (cityList.status === 'ready') {\n          @if (cityMissing(cityList.data, query().city)) {\n            <option [value]=\"query().city\">{{ query().city }}</option>\n          }\n          @for (name of cityList.data; track name) {\n            <option [value]=\"name\">{{ name }}</option>\n          }\n        }\n      </select>\n    </div>\n\n    <div class=\"field\">\n      <label for=\"sort\">Ordenar por</label>\n      <select id=\"sort\" class=\"input\" formControlName=\"sort\">\n        @for (option of sortOptions; track option.value) {\n          <option [value]=\"option.value\">{{ option.label }}</option>\n        }\n      </select>\n    </div>\n\n    <div class=\"filter-actions\">\n      <button class=\"btn btn-primary\" type=\"submit\">Buscar</button>\n      @if (hasFilters()) {\n        <button class=\"btn btn-secondary\" type=\"button\" (click)=\"clear()\">Limpar filtros</button>\n      }\n    </div>\n  </form>\n\n  <p class=\"results-count\" role=\"status\">\n    @if (result.status === 'ready') {\n      {{ countText(result.data.totalElements) }}\n    }\n  </p>\n\n  @if (result.status === 'loading') {\n    <app-loading-state message=\"Buscando profissionais...\" />\n  } @else if (result.status === 'error') {\n    <app-error-state [message]=\"result.error.message\" (retry)=\"results.reload()\" />\n  } @else if (result.data.content.length === 0) {\n    @if (result.data.totalElements > 0) {\n      <app-empty-state title=\"Esta p\u00E1gina n\u00E3o existe\" message=\"Os resultados terminaram antes dela.\">\n        <a class=\"btn btn-primary\" routerLink=\"/profissionais\" queryParamsHandling=\"merge\" [queryParams]=\"{ page: null }\">\n          Ver a primeira p\u00E1gina\n        </a>\n      </app-empty-state>\n    } @else {\n      <app-empty-state\n        title=\"Nenhum profissional encontrado\"\n        message=\"Tente outro servi\u00E7o ou outra cidade, ou limpe os filtros para ver todos os profissionais.\"\n      >\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"clear()\">Limpar filtros</button>\n      </app-empty-state>\n    }\n  } @else {\n    <h2 class=\"sr-only\">Resultados da busca</h2>\n    <ul class=\"provider-grid\">\n      @for (provider of result.data.content; track provider.id) {\n        <li><app-provider-card [provider]=\"provider\" /></li>\n      }\n    </ul>\n    <app-pagination [page]=\"query().page\" [totalPages]=\"result.data.totalPages\" />\n  }\n</section>\n" }]
    }], () => [], { q: [{ type: i0.Input, args: [{ isSignal: true, alias: "q", required: false }] }], category: [{ type: i0.Input, args: [{ isSignal: true, alias: "category", required: false }] }], city: [{ type: i0.Input, args: [{ isSignal: true, alias: "city", required: false }] }], sort: [{ type: i0.Input, args: [{ isSignal: true, alias: "sort", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SearchPage, { className: "SearchPage", filePath: "src/app/features/providers/search-page.ts", lineNumber: 21 }); })();
