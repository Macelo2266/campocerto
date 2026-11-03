import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { loadResource } from '../../core/http/load-state';
import { STATUS_FILTERS, parseStatus } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
const _c0 = a0 => ({ status: a0, page: null });
const _c1 = a0 => ["/solicitacoes", a0];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function MyRequestsPage_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(3, _c0, filter_r1.value));
    i0.ɵɵattribute("aria-current", ctx_r1.query().status === filter_r1.value ? "true" : null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r1.label, " ");
} }
function MyRequestsPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 3);
} }
function MyRequestsPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 6);
    i0.ɵɵlistener("retry", function MyRequestsPage_Conditional_9_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.results.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r4.error.message);
} }
function MyRequestsPage_Conditional_10_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 7)(1, "a", 9);
    i0.ɵɵtext(2, "Ver todas");
    i0.ɵɵelementEnd()();
} }
function MyRequestsPage_Conditional_10_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 8)(1, "a", 10);
    i0.ɵɵtext(2, "Encontrar profissionais");
    i0.ɵɵelementEnd()();
} }
function MyRequestsPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, MyRequestsPage_Conditional_10_Conditional_0_Template, 3, 0, "app-empty-state", 7)(1, MyRequestsPage_Conditional_10_Conditional_1_Template, 3, 0, "app-empty-state", 8);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.query().status !== null || ctx_r1.query().page > 1 ? 0 : 1);
} }
function MyRequestsPage_Conditional_11_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 Data desejada: ", ctx_r1.formatDateOnly(item_r5.desiredDate), " ");
} }
function MyRequestsPage_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 12)(1, "div", 14)(2, "h2", 15)(3, "a", 16);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(5, "app-status-badge", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 18);
    i0.ɵɵtext(7);
    i0.ɵɵconditionalCreate(8, MyRequestsPage_Conditional_11_For_2_Conditional_8_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c1, item_r5.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.category.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", item_r5.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r5.provider.professionalName, " \u00B7 ", item_r5.city, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r5.desiredDate ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Enviada em ", ctx_r1.formatDate(item_r5.createdAt));
} }
function MyRequestsPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 11);
    i0.ɵɵrepeaterCreate(1, MyRequestsPage_Conditional_11_For_2_Template, 11, 9, "li", 12, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "app-pagination", 13);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(result_r4.data.content);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r1.query().page)("totalPages", result_r4.data.totalPages);
} }
const PAGE_SIZE = 10;
export class MyRequestsPage {
    requests = inject(ServiceRequestService);
    status = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "status" }] : /* istanbul ignore next */ []));
    page = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "page" }] : /* istanbul ignore next */ []));
    filters = STATUS_FILTERS;
    formatDate = formatDate;
    formatDateOnly = formatDateOnly;
    query = computed(() => ({
        status: parseStatus(this.status()),
        page: parsePositiveInt(this.page()) ?? 1,
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    results = loadResource(() => this.query(), (query) => this.requests.listMine(query.status, query.page - 1, PAGE_SIZE));
    static ɵfac = function MyRequestsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyRequestsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyRequestsPage, selectors: [["app-my-requests-page"]], inputs: { status: [1, "status"], page: [1, "page"] }, decls: 12, vars: 2, consts: [[1, "container", "page-section"], ["aria-label", "Filtrar por situa\u00E7\u00E3o"], [1, "chips", "filter-chips"], ["message", "Carregando suas solicita\u00E7\u00F5es..."], [3, "message"], ["routerLink", "/solicitacoes", 1, "chip", "chip-link", 3, "queryParams"], [3, "retry", "message"], ["title", "Nada por aqui", "message", "Voc\u00EA n\u00E3o tem solicita\u00E7\u00F5es nesta situa\u00E7\u00E3o."], ["title", "Voc\u00EA ainda n\u00E3o pediu nenhum or\u00E7amento", "message", "Encontre um profissional e pe\u00E7a um or\u00E7amento. Depois voc\u00EA acompanha tudo por aqui."], ["routerLink", "/solicitacoes", 1, "btn", "btn-secondary"], ["routerLink", "/profissionais", 1, "btn", "btn-primary"], [1, "request-list"], [1, "card", "card-clickable"], [3, "page", "totalPages"], [1, "request-head"], [1, "request-title"], [1, "stretched", 3, "routerLink"], [3, "status"], [1, "request-meta"]], template: function MyRequestsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "section", 0)(2, "h1");
            i0.ɵɵtext(3, "Minhas solicita\u00E7\u00F5es");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "nav", 1)(5, "ul", 2);
            i0.ɵɵrepeaterCreate(6, MyRequestsPage_For_7_Template, 3, 5, "li", null, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, MyRequestsPage_Conditional_8_Template, 1, 0, "app-loading-state", 3)(9, MyRequestsPage_Conditional_9_Template, 1, 1, "app-error-state", 4)(10, MyRequestsPage_Conditional_10_Template, 2, 1)(11, MyRequestsPage_Conditional_11_Template, 4, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const result_r6 = i0.ɵɵstoreLet(ctx.results.state());
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.filters);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(result_r6.status === "loading" ? 8 : result_r6.status === "error" ? 9 : result_r6.data.content.length === 0 ? 10 : 11);
        } }, dependencies: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyRequestsPage, [{
        type: Component,
        args: [{ selector: 'app-my-requests-page', imports: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState], template: "@let result = results.state();\n\n<section class=\"container page-section\">\n  <h1>Minhas solicita\u00E7\u00F5es</h1>\n\n  <nav aria-label=\"Filtrar por situa\u00E7\u00E3o\">\n    <ul class=\"chips filter-chips\">\n      @for (filter of filters; track filter.label) {\n        <li>\n          <a\n            class=\"chip chip-link\"\n            routerLink=\"/solicitacoes\"\n            [queryParams]=\"{ status: filter.value, page: null }\"\n            [attr.aria-current]=\"query().status === filter.value ? 'true' : null\"\n          >\n            {{ filter.label }}\n          </a>\n        </li>\n      }\n    </ul>\n  </nav>\n\n  @if (result.status === 'loading') {\n    <app-loading-state message=\"Carregando suas solicita\u00E7\u00F5es...\" />\n  } @else if (result.status === 'error') {\n    <app-error-state [message]=\"result.error.message\" (retry)=\"results.reload()\" />\n  } @else if (result.data.content.length === 0) {\n    @if (query().status !== null || query().page > 1) {\n      <app-empty-state title=\"Nada por aqui\" message=\"Voc\u00EA n\u00E3o tem solicita\u00E7\u00F5es nesta situa\u00E7\u00E3o.\">\n        <a class=\"btn btn-secondary\" routerLink=\"/solicitacoes\">Ver todas</a>\n      </app-empty-state>\n    } @else {\n      <app-empty-state\n        title=\"Voc\u00EA ainda n\u00E3o pediu nenhum or\u00E7amento\"\n        message=\"Encontre um profissional e pe\u00E7a um or\u00E7amento. Depois voc\u00EA acompanha tudo por aqui.\"\n      >\n        <a class=\"btn btn-primary\" routerLink=\"/profissionais\">Encontrar profissionais</a>\n      </app-empty-state>\n    }\n  } @else {\n    <ul class=\"request-list\">\n      @for (item of result.data.content; track item.id) {\n        <li class=\"card card-clickable\">\n          <div class=\"request-head\">\n            <h2 class=\"request-title\">\n              <a class=\"stretched\" [routerLink]=\"['/solicitacoes', item.id]\">{{ item.category.name }}</a>\n            </h2>\n            <app-status-badge [status]=\"item.status\" />\n          </div>\n          <p class=\"request-meta\">\n            {{ item.provider.professionalName }} \u00B7 {{ item.city }}\n            @if (item.desiredDate) {\n              \u00B7 Data desejada: {{ formatDateOnly(item.desiredDate) }}\n            }\n          </p>\n          <p class=\"request-meta\">Enviada em {{ formatDate(item.createdAt) }}</p>\n        </li>\n      }\n    </ul>\n\n    <app-pagination [page]=\"query().page\" [totalPages]=\"result.data.totalPages\" />\n  }\n</section>\n" }]
    }], null, { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyRequestsPage, { className: "MyRequestsPage", filePath: "src/app/features/requests/my-requests-page.ts", lineNumber: 22 }); })();
