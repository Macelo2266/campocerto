import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/api/admin.service';
import { loadResource } from '../../core/http/load-state';
import { ALL_STATUSES, STATUS_LABELS } from '../../core/models/service-request.model';
import { formatNumber, formatRating } from '../../core/util/format';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import * as i0 from "@angular/core";
function AdminStatsPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 1);
} }
function AdminStatsPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 3);
    i0.ɵɵlistener("retry", function AdminStatsPage_Conditional_4_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stats.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const state_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", state_r3.error.message);
} }
function AdminStatsPage_Conditional_5_For_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "dt");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const status_r5 = ctx.$implicit;
    i0.ɵɵnextContext();
    const s_r6 = i0.ɵɵreadContextLet(0);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusLabels[status_r5]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r6.serviceRequests[status_r5]));
} }
function AdminStatsPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "p")(2, "button", 4);
    i0.ɵɵlistener("click", function AdminStatsPage_Conditional_5_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stats.reload()); });
    i0.ɵɵtext(3, "Atualizar n\u00FAmeros");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "section", 5)(5, "h3", 6);
    i0.ɵɵtext(6, "Pessoas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "dl", 7)(8, "div", 8)(9, "dt");
    i0.ɵɵtext(10, "Total de contas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "dd");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 8)(14, "dt");
    i0.ɵɵtext(15, "Agricultores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "dd");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 8)(19, "dt");
    i0.ɵɵtext(20, "Prestadores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "dd");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 8)(24, "dt");
    i0.ɵɵtext(25, "Administradores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 8)(29, "dt");
    i0.ɵɵtext(30, "Contas ativas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "dd");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 8)(34, "dt");
    i0.ɵɵtext(35, "Suspensas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "dd");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 8)(39, "dt");
    i0.ɵɵtext(40, "Bloqueadas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "dd");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(43, "p")(44, "a", 9);
    i0.ɵɵtext(45, "Ver usu\u00E1rios");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "section", 10)(47, "h3", 11);
    i0.ɵɵtext(48, "Prestadores");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "dl", 7)(50, "div", 8)(51, "dt");
    i0.ɵɵtext(52, "Perfis criados");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "dd");
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 8)(56, "dt");
    i0.ɵɵtext(57, "Recebendo pedidos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "dd");
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 8)(61, "dt");
    i0.ɵɵtext(62, "Com pedidos pausados");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "dd");
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 8)(66, "dt");
    i0.ɵɵtext(67, "Cadastrados sem perfil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "dd");
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(70, "section", 12)(71, "h3", 13);
    i0.ɵɵtext(72, "Solicita\u00E7\u00F5es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "dl", 7)(74, "div", 8)(75, "dt");
    i0.ɵɵtext(76, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "dd");
    i0.ɵɵtext(78);
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(79, AdminStatsPage_Conditional_5_For_80_Template, 5, 2, "div", 8, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "p")(82, "a", 14);
    i0.ɵɵtext(83, "Ver solicita\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(84, "section", 15)(85, "h3", 16);
    i0.ɵɵtext(86, "Avalia\u00E7\u00F5es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "dl", 7)(88, "div", 8)(89, "dt");
    i0.ɵɵtext(90, "Vis\u00EDveis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "dd");
    i0.ɵɵtext(92);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(93, "div", 8)(94, "dt");
    i0.ɵɵtext(95, "Ocultas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(96, "dd");
    i0.ɵɵtext(97);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(98, "div", 8)(99, "dt");
    i0.ɵɵtext(100, "Nota m\u00E9dia");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "dd");
    i0.ɵɵtext(102);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(103, "p")(104, "a", 17);
    i0.ɵɵtext(105, "Moderar avalia\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const state_r3 = i0.ɵɵreadContextLet(0);
    const s_r7 = i0.ɵɵstoreLet(state_r3.data);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.total));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.farmers));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.providers));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.admins));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.active));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.suspended));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.users.blocked));
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.providers.total));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.providers.available));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.providers.total - s_r7.providers.available));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(ctx_r1.providersWithoutProfile(s_r7)));
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(ctx_r1.totalRequests(s_r7)));
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.statuses);
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.reviews.visible));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.fmt(s_r7.reviews.hidden));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r7.reviews.averageRating === null ? "\u2014" : ctx_r1.rating(s_r7.reviews.averageRating));
} }
export class AdminStatsPage {
    admin = inject(AdminService);
    stats = loadResource(() => null, () => this.admin.stats());
    statuses = ALL_STATUSES;
    statusLabels = STATUS_LABELS;
    fmt = formatNumber;
    rating = formatRating;
    totalRequests(stats) {
        return Object.values(stats.serviceRequests).reduce((sum, value) => sum + value, 0);
    }
    /** Prestadores que se cadastraram mas ainda não criaram o perfil (não aparecem na busca). */
    providersWithoutProfile(stats) {
        return Math.max(0, stats.users.providers - stats.providers.total);
    }
    static ɵfac = function AdminStatsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminStatsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminStatsPage, selectors: [["app-admin-stats-page"]], decls: 6, vars: 2, consts: [[1, "sr-only"], ["message", "Carregando indicadores..."], [3, "message"], [3, "retry", "message"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click"], ["aria-labelledby", "people-title", 1, "stat-section"], ["id", "people-title"], [1, "stat-grid"], [1, "stat"], ["routerLink", "/admin/usuarios"], ["aria-labelledby", "providers-title", 1, "stat-section"], ["id", "providers-title"], ["aria-labelledby", "requests-title", 1, "stat-section"], ["id", "requests-title"], ["routerLink", "/admin/solicitacoes"], ["aria-labelledby", "reviews-title", 1, "stat-section"], ["id", "reviews-title"], ["routerLink", "/admin/avaliacoes"]], template: function AdminStatsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "h2", 0);
            i0.ɵɵtext(2, "Resumo da plataforma");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, AdminStatsPage_Conditional_3_Template, 1, 0, "app-loading-state", 1)(4, AdminStatsPage_Conditional_4_Template, 1, 1, "app-error-state", 2)(5, AdminStatsPage_Conditional_5_Template, 106, 16);
        } if (rf & 2) {
            const state_r8 = i0.ɵɵstoreLet(ctx.stats.state());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(state_r8.status === "loading" ? 3 : state_r8.status === "error" ? 4 : 5);
        } }, dependencies: [RouterLink, LoadingState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminStatsPage, [{
        type: Component,
        args: [{ selector: 'app-admin-stats-page', imports: [RouterLink, LoadingState, ErrorState], template: "@let state = stats.state();\n\n<h2 class=\"sr-only\">Resumo da plataforma</h2>\n\n@if (state.status === 'loading') {\n  <app-loading-state message=\"Carregando indicadores...\" />\n} @else if (state.status === 'error') {\n  <app-error-state [message]=\"state.error.message\" (retry)=\"stats.reload()\" />\n} @else {\n  @let s = state.data;\n\n  <p>\n    <button type=\"button\" class=\"btn btn-secondary btn-small\" (click)=\"stats.reload()\">Atualizar n\u00FAmeros</button>\n  </p>\n\n  <section class=\"stat-section\" aria-labelledby=\"people-title\">\n    <h3 id=\"people-title\">Pessoas</h3>\n    <dl class=\"stat-grid\">\n      <div class=\"stat\"><dt>Total de contas</dt><dd>{{ fmt(s.users.total) }}</dd></div>\n      <div class=\"stat\"><dt>Agricultores</dt><dd>{{ fmt(s.users.farmers) }}</dd></div>\n      <div class=\"stat\"><dt>Prestadores</dt><dd>{{ fmt(s.users.providers) }}</dd></div>\n      <div class=\"stat\"><dt>Administradores</dt><dd>{{ fmt(s.users.admins) }}</dd></div>\n      <div class=\"stat\"><dt>Contas ativas</dt><dd>{{ fmt(s.users.active) }}</dd></div>\n      <div class=\"stat\"><dt>Suspensas</dt><dd>{{ fmt(s.users.suspended) }}</dd></div>\n      <div class=\"stat\"><dt>Bloqueadas</dt><dd>{{ fmt(s.users.blocked) }}</dd></div>\n    </dl>\n    <p><a routerLink=\"/admin/usuarios\">Ver usu\u00E1rios</a></p>\n  </section>\n\n  <section class=\"stat-section\" aria-labelledby=\"providers-title\">\n    <h3 id=\"providers-title\">Prestadores</h3>\n    <dl class=\"stat-grid\">\n      <div class=\"stat\"><dt>Perfis criados</dt><dd>{{ fmt(s.providers.total) }}</dd></div>\n      <div class=\"stat\"><dt>Recebendo pedidos</dt><dd>{{ fmt(s.providers.available) }}</dd></div>\n      <div class=\"stat\"><dt>Com pedidos pausados</dt><dd>{{ fmt(s.providers.total - s.providers.available) }}</dd></div>\n      <div class=\"stat\"><dt>Cadastrados sem perfil</dt><dd>{{ fmt(providersWithoutProfile(s)) }}</dd></div>\n    </dl>\n  </section>\n\n  <section class=\"stat-section\" aria-labelledby=\"requests-title\">\n    <h3 id=\"requests-title\">Solicita\u00E7\u00F5es</h3>\n    <dl class=\"stat-grid\">\n      <div class=\"stat\"><dt>Total</dt><dd>{{ fmt(totalRequests(s)) }}</dd></div>\n      @for (status of statuses; track status) {\n        <div class=\"stat\"><dt>{{ statusLabels[status] }}</dt><dd>{{ fmt(s.serviceRequests[status]) }}</dd></div>\n      }\n    </dl>\n    <p><a routerLink=\"/admin/solicitacoes\">Ver solicita\u00E7\u00F5es</a></p>\n  </section>\n\n  <section class=\"stat-section\" aria-labelledby=\"reviews-title\">\n    <h3 id=\"reviews-title\">Avalia\u00E7\u00F5es</h3>\n    <dl class=\"stat-grid\">\n      <div class=\"stat\"><dt>Vis\u00EDveis</dt><dd>{{ fmt(s.reviews.visible) }}</dd></div>\n      <div class=\"stat\"><dt>Ocultas</dt><dd>{{ fmt(s.reviews.hidden) }}</dd></div>\n      <div class=\"stat\">\n        <dt>Nota m\u00E9dia</dt>\n        <dd>{{ s.reviews.averageRating === null ? '\u2014' : rating(s.reviews.averageRating) }}</dd>\n      </div>\n    </dl>\n    <p><a routerLink=\"/admin/avaliacoes\">Moderar avalia\u00E7\u00F5es</a></p>\n  </section>\n}\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminStatsPage, { className: "AdminStatsPage", filePath: "src/app/features/admin/stats-page.ts", lineNumber: 17 }); })();
