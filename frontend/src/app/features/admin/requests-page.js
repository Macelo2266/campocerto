import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/api/admin.service';
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
const _c1 = a0 => ["/profissionais", a0];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function AdminRequestsPage_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 6);
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
function AdminRequestsPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 3);
} }
function AdminRequestsPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 7);
    i0.ɵɵlistener("retry", function AdminRequestsPage_Conditional_10_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.results.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r4.error.message);
} }
function AdminRequestsPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 5);
} }
function AdminRequestsPage_Conditional_12_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "span", 15);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "a", 16);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵelement(15, "app-status-badge", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r5.categoryName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.requesterName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c1, item_r5.providerId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.providerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.city);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", item_r5.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(item_r5.createdAt));
} }
function AdminRequestsPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 9)(3, "table", 10)(4, "caption", 11);
    i0.ɵɵtext(5, "Solicita\u00E7\u00F5es de or\u00E7amento da plataforma");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "thead")(7, "tr")(8, "th", 12);
    i0.ɵɵtext(9, "N\u00BA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 12);
    i0.ɵɵtext(11, "Servi\u00E7o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 12);
    i0.ɵɵtext(13, "Cliente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 12);
    i0.ɵɵtext(15, "Prestador");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 12);
    i0.ɵɵtext(17, "Munic\u00EDpio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 12);
    i0.ɵɵtext(19, "Situa\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 12);
    i0.ɵɵtext(21, "Enviada em");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵrepeaterCreate(23, AdminRequestsPage_Conditional_12_For_24_Template, 18, 11, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(25, "app-pagination", 13);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", result_r4.data.totalElements, " solicita\u00E7\u00E3o(\u00F5es)");
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(result_r4.data.content);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r1.query().page)("totalPages", result_r4.data.totalPages);
} }
const PAGE_SIZE = 20;
export class AdminRequestsPage {
    admin = inject(AdminService);
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
    results = loadResource(() => this.query(), (query) => this.admin.listRequests(query.status, query.page - 1, PAGE_SIZE));
    static ɵfac = function AdminRequestsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminRequestsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminRequestsPage, selectors: [["app-admin-requests-page"]], inputs: { status: [1, "status"], page: [1, "page"] }, decls: 13, vars: 2, consts: [[1, "hint"], ["aria-label", "Filtrar solicita\u00E7\u00F5es por situa\u00E7\u00E3o"], [1, "chips", "filter-chips"], ["message", "Carregando solicita\u00E7\u00F5es..."], [3, "message"], ["title", "Nenhuma solicita\u00E7\u00E3o", "message", "N\u00E3o h\u00E1 solicita\u00E7\u00F5es nesta situa\u00E7\u00E3o."], ["routerLink", "/admin/solicitacoes", 1, "chip", "chip-link", 3, "queryParams"], [3, "retry", "message"], [1, "results-count"], ["role", "region", "aria-label", "Lista de solicita\u00E7\u00F5es", "tabindex", "0", 1, "table-wrap"], [1, "table"], [1, "sr-only"], ["scope", "col"], [3, "page", "totalPages"], ["scope", "row"], [1, "clamp-2", "muted"], [3, "routerLink"], [3, "status"]], template: function AdminRequestsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "Solicita\u00E7\u00F5es da plataforma");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 0);
            i0.ɵɵtext(4, "Vis\u00E3o somente de leitura, para acompanhar o movimento e apoiar o suporte.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "nav", 1)(6, "ul", 2);
            i0.ɵɵrepeaterCreate(7, AdminRequestsPage_For_8_Template, 3, 5, "li", null, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, AdminRequestsPage_Conditional_9_Template, 1, 0, "app-loading-state", 3)(10, AdminRequestsPage_Conditional_10_Template, 1, 1, "app-error-state", 4)(11, AdminRequestsPage_Conditional_11_Template, 1, 0, "app-empty-state", 5)(12, AdminRequestsPage_Conditional_12_Template, 26, 3);
        } if (rf & 2) {
            const result_r6 = i0.ɵɵstoreLet(ctx.results.state());
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.filters);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(result_r6.status === "loading" ? 9 : result_r6.status === "error" ? 10 : result_r6.data.content.length === 0 ? 11 : 12);
        } }, dependencies: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminRequestsPage, [{
        type: Component,
        args: [{ selector: 'app-admin-requests-page', imports: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState], template: "@let result = results.state();\n\n<h2>Solicita\u00E7\u00F5es da plataforma</h2>\n<p class=\"hint\">Vis\u00E3o somente de leitura, para acompanhar o movimento e apoiar o suporte.</p>\n\n<nav aria-label=\"Filtrar solicita\u00E7\u00F5es por situa\u00E7\u00E3o\">\n  <ul class=\"chips filter-chips\">\n    @for (filter of filters; track filter.label) {\n      <li>\n        <a\n          class=\"chip chip-link\"\n          routerLink=\"/admin/solicitacoes\"\n          [queryParams]=\"{ status: filter.value, page: null }\"\n          [attr.aria-current]=\"query().status === filter.value ? 'true' : null\"\n        >\n          {{ filter.label }}\n        </a>\n      </li>\n    }\n  </ul>\n</nav>\n\n@if (result.status === 'loading') {\n  <app-loading-state message=\"Carregando solicita\u00E7\u00F5es...\" />\n} @else if (result.status === 'error') {\n  <app-error-state [message]=\"result.error.message\" (retry)=\"results.reload()\" />\n} @else if (result.data.content.length === 0) {\n  <app-empty-state title=\"Nenhuma solicita\u00E7\u00E3o\" message=\"N\u00E3o h\u00E1 solicita\u00E7\u00F5es nesta situa\u00E7\u00E3o.\" />\n} @else {\n  <p class=\"results-count\">{{ result.data.totalElements }} solicita\u00E7\u00E3o(\u00F5es)</p>\n\n  <div class=\"table-wrap\" role=\"region\" aria-label=\"Lista de solicita\u00E7\u00F5es\" tabindex=\"0\">\n    <table class=\"table\">\n      <caption class=\"sr-only\">Solicita\u00E7\u00F5es de or\u00E7amento da plataforma</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">N\u00BA</th>\n          <th scope=\"col\">Servi\u00E7o</th>\n          <th scope=\"col\">Cliente</th>\n          <th scope=\"col\">Prestador</th>\n          <th scope=\"col\">Munic\u00EDpio</th>\n          <th scope=\"col\">Situa\u00E7\u00E3o</th>\n          <th scope=\"col\">Enviada em</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (item of result.data.content; track item.id) {\n          <tr>\n            <th scope=\"row\">{{ item.id }}</th>\n            <td>\n              {{ item.categoryName }}\n              <span class=\"clamp-2 muted\">{{ item.description }}</span>\n            </td>\n            <td>{{ item.requesterName }}</td>\n            <td><a [routerLink]=\"['/profissionais', item.providerId]\">{{ item.providerName }}</a></td>\n            <td>{{ item.city }}</td>\n            <td><app-status-badge [status]=\"item.status\" /></td>\n            <td>{{ formatDate(item.createdAt) }}</td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  <app-pagination [page]=\"query().page\" [totalPages]=\"result.data.totalPages\" />\n}\n" }]
    }], null, { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminRequestsPage, { className: "AdminRequestsPage", filePath: "src/app/features/admin/requests-page.ts", lineNumber: 22 }); })();
