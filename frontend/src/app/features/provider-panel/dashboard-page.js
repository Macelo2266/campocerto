import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProviderAccountService, toProfilePayload } from '../../core/api/provider-account.service';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { STATUS_FILTERS, parseStatus } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/profissionais", a0];
const _c1 = () => ({ status: "PENDENTE" });
const _c2 = a0 => ({ status: a0, page: null });
const _c3 = a0 => ["/solicitacoes", a0];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function DashboardPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1, "Perfil criado! Agora voc\u00EA aparece na busca para os agricultores.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1, "Perfil atualizado com sucesso.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 2);
} }
function DashboardPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 5);
    i0.ɵɵlistener("retry", function DashboardPage_Conditional_9_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.profile.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const profileState_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", profileState_r3.error.message);
} }
function DashboardPage_Conditional_10_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1, "Recebendo pedidos");
    i0.ɵɵelementEnd();
} }
function DashboardPage_Conditional_10_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "Pedidos pausados");
    i0.ɵɵelementEnd();
} }
function DashboardPage_Conditional_10_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.toggleResult());
} }
function DashboardPage_Conditional_10_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function DashboardPage_Conditional_10_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 24);
    i0.ɵɵtext(4, "Ver pendentes");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const pendingState_r6 = i0.ɵɵreadContextLet(1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", pendingState_r6.data.totalElements, " ", pendingState_r6.data.totalElements === 1 ? "pedido aguardando" : "pedidos aguardando", " a sua resposta. ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction0(3, _c1));
} }
function DashboardPage_Conditional_10_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(3, _c2, filter_r7.value));
    i0.ɵɵattribute("aria-current", ctx_r1.query().status === filter_r7.value ? "true" : null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r7.label, " ");
} }
function DashboardPage_Conditional_10_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 23);
} }
function DashboardPage_Conditional_10_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 5);
    i0.ɵɵlistener("retry", function DashboardPage_Conditional_10_Conditional_29_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.received.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const receivedState_r9 = i0.ɵɵreadContextLet(2);
    i0.ɵɵproperty("message", receivedState_r9.error.message);
} }
function DashboardPage_Conditional_10_Conditional_30_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 26)(1, "a", 28);
    i0.ɵɵtext(2, "Ver todos");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_Conditional_10_Conditional_30_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 27)(1, "a", 29);
    i0.ɵɵtext(2, "Melhorar o meu perfil");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_Conditional_10_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DashboardPage_Conditional_10_Conditional_30_Conditional_0_Template, 3, 0, "app-empty-state", 26)(1, DashboardPage_Conditional_10_Conditional_30_Conditional_1_Template, 3, 0, "app-empty-state", 27);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r1.query().status !== null || ctx_r1.query().page > 1 ? 0 : 1);
} }
function DashboardPage_Conditional_10_Conditional_31_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const item_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" \u00B7 Data desejada: ", ctx_r1.formatDateOnly(item_r10.desiredDate), " ");
} }
function DashboardPage_Conditional_10_Conditional_31_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 31)(1, "div", 33)(2, "h3", 34)(3, "a", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(5, "app-status-badge", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 37);
    i0.ɵɵtext(7);
    i0.ɵɵconditionalCreate(8, DashboardPage_Conditional_10_Conditional_31_For_2_Conditional_8_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 37);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c3, item_r10.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r10.category.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", item_r10.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r10.requester?.name ?? "Cliente", " \u00B7 ", item_r10.city, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r10.desiredDate ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Recebido em ", ctx_r1.formatDate(item_r10.createdAt));
} }
function DashboardPage_Conditional_10_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 30);
    i0.ɵɵrepeaterCreate(1, DashboardPage_Conditional_10_Conditional_31_For_2_Template, 11, 9, "li", 31, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "app-pagination", 32);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    const receivedState_r9 = i0.ɵɵreadContextLet(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(receivedState_r9.data.content);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r1.query().page)("totalPages", receivedState_r9.data.totalPages);
} }
function DashboardPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "div")(2, "h2", 7);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 8);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "app-rating-stars", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 10);
    i0.ɵɵconditionalCreate(8, DashboardPage_Conditional_10_Conditional_8_Template, 2, 0, "span", 11)(9, DashboardPage_Conditional_10_Conditional_9_Template, 2, 0, "span", 12);
    i0.ɵɵelementStart(10, "div", 13)(11, "a", 14);
    i0.ɵɵtext(12, "Editar perfil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "a", 15);
    i0.ɵɵtext(14, "Ver como aparece na busca");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 16);
    i0.ɵɵlistener("click", function DashboardPage_Conditional_10_Template_button_click_15_listener() { const me_r5 = i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleAvailability(me_r5)); });
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "p", 17);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, DashboardPage_Conditional_10_Conditional_19_Template, 2, 1, "p", 18);
    i0.ɵɵconditionalCreate(20, DashboardPage_Conditional_10_Conditional_20_Template, 2, 1, "div", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "h2");
    i0.ɵɵtext(22, "Pedidos recebidos");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(23, DashboardPage_Conditional_10_Conditional_23_Template, 5, 4, "div", 20);
    i0.ɵɵelementStart(24, "nav", 21)(25, "ul", 22);
    i0.ɵɵrepeaterCreate(26, DashboardPage_Conditional_10_For_27_Template, 3, 5, "li", null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(28, DashboardPage_Conditional_10_Conditional_28_Template, 1, 0, "app-loading-state", 23)(29, DashboardPage_Conditional_10_Conditional_29_Template, 1, 1, "app-error-state", 3)(30, DashboardPage_Conditional_10_Conditional_30_Template, 2, 1)(31, DashboardPage_Conditional_10_Conditional_31_Template, 4, 2);
} if (rf & 2) {
    let tmp_15_0;
    const me_r5 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    const pendingState_r6 = i0.ɵɵreadContextLet(1);
    const receivedState_r9 = i0.ɵɵreadContextLet(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(me_r5.professionalName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(me_r5.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("average", me_r5.ratingAverage)("count", me_r5.ratingCount);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(me_r5.available ? 8 : 9);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(13, _c0, me_r5.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.toggling());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", me_r5.available ? "Pausar novos pedidos" : "Voltar a receber pedidos", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.toggleResult());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.toggleResult() ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_15_0 = ctx_r1.toggleError()) ? 20 : -1, tmp_15_0);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(pendingState_r6.status === "ready" && pendingState_r6.data.totalElements > 0 ? 23 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.filters);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(receivedState_r9.status === "loading" ? 28 : receivedState_r9.status === "error" ? 29 : receivedState_r9.data.content.length === 0 ? 30 : 31);
} }
function DashboardPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 4)(1, "a", 14);
    i0.ɵɵtext(2, "Criar meu perfil");
    i0.ɵɵelementEnd()();
} }
const PAGE_SIZE = 10;
export class DashboardPage {
    account = inject(ProviderAccountService);
    requests = inject(ServiceRequestService);
    destroyRef = inject(DestroyRef);
    // Parâmetros da URL: /painel?status=PENDENTE&page=2&salvo=criado
    status = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "status" }] : /* istanbul ignore next */ []));
    page = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "page" }] : /* istanbul ignore next */ []));
    salvo = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "salvo" }] : /* istanbul ignore next */ []));
    filters = STATUS_FILTERS;
    formatDate = formatDate;
    formatDateOnly = formatDateOnly;
    query = computed(() => ({
        status: parseStatus(this.status()),
        page: parsePositiveInt(this.page()) ?? 1,
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    profile = loadResource(() => null, () => this.account.getMine());
    pending = loadResource(() => null, () => this.requests.listReceived('PENDENTE', 0, 1));
    received = loadResource(() => this.query(), (query) => this.requests.listReceived(query.status, query.page - 1, PAGE_SIZE));
    /** O perfil mais recente depois de pausar/retomar (evita recarregar a tela inteira). */
    updated = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "updated" }] : /* istanbul ignore next */ []));
    current = computed(() => {
        const fresh = this.updated();
        if (fresh) {
            return fresh;
        }
        const state = this.profile.state();
        return state.status === 'ready' ? state.data : null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "current" }] : /* istanbul ignore next */ []));
    toggling = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toggling" }] : /* istanbul ignore next */ []));
    toggleError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toggleError" }] : /* istanbul ignore next */ []));
    toggleResult = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toggleResult" }] : /* istanbul ignore next */ []));
    toggleAvailability(profile) {
        this.toggling.set(true);
        this.toggleError.set(null);
        this.toggleResult.set('');
        this.account
            .save(profile.id, toProfilePayload(profile, !profile.available))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (fresh) => {
                this.updated.set(fresh);
                this.toggling.set(false);
                this.toggleResult.set(fresh.available ? 'Pronto! Você voltou a receber novos pedidos.' : 'Pronto! Seus novos pedidos estão pausados.');
            },
            error: (error) => {
                this.toggleError.set(toApiError(error).message);
                this.toggling.set(false);
            },
        });
    }
    static ɵfac = function DashboardPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPage, selectors: [["app-dashboard-page"]], inputs: { status: [1, "status"], page: [1, "page"], salvo: [1, "salvo"] }, decls: 12, vars: 5, consts: [[1, "container", "page-section"], ["role", "status", 1, "alert", "alert-info"], ["message", "Carregando seu painel..."], [3, "message"], ["title", "Complete o seu perfil para aparecer na busca", "message", "Conte o que voc\u00EA faz, onde atende e quanto cobra. Leva poucos minutos."], [3, "retry", "message"], [1, "card", "summary"], [1, "summary-name"], [1, "muted"], [3, "average", "count"], [1, "summary-side"], [1, "badge", "badge-ok"], [1, "badge", "badge-new"], [1, "actions"], ["routerLink", "/painel/perfil", 1, "btn", "btn-primary"], [1, "btn", "btn-secondary", 3, "routerLink"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["role", "status", 1, "sr-only"], ["aria-hidden", "true", 1, "hint"], ["role", "alert", 1, "alert", "alert-error"], [1, "alert", "alert-info"], ["aria-label", "Filtrar pedidos por situa\u00E7\u00E3o"], [1, "chips", "filter-chips"], ["message", "Carregando pedidos..."], ["routerLink", "/painel", 3, "queryParams"], ["routerLink", "/painel", 1, "chip", "chip-link", 3, "queryParams"], ["title", "Nada por aqui", "message", "Nenhum pedido nesta situa\u00E7\u00E3o."], ["title", "Voc\u00EA ainda n\u00E3o recebeu pedidos", "message", "Quando um agricultor pedir um or\u00E7amento, ele aparece aqui. Perfis completos e com pre\u00E7o recebem mais pedidos."], ["routerLink", "/painel", 1, "btn", "btn-secondary"], ["routerLink", "/painel/perfil", 1, "btn", "btn-secondary"], [1, "request-list"], [1, "card", "card-clickable"], [3, "page", "totalPages"], [1, "request-head"], [1, "request-title"], [1, "stretched", 3, "routerLink"], [3, "status"], [1, "request-meta"]], template: function DashboardPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0)(1)(2);
            i0.ɵɵelementStart(3, "section", 0)(4, "h1");
            i0.ɵɵtext(5, "Painel do prestador");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, DashboardPage_Conditional_6_Template, 2, 0, "div", 1)(7, DashboardPage_Conditional_7_Template, 2, 0, "div", 1);
            i0.ɵɵconditionalCreate(8, DashboardPage_Conditional_8_Template, 1, 0, "app-loading-state", 2)(9, DashboardPage_Conditional_9_Template, 1, 1, "app-error-state", 3)(10, DashboardPage_Conditional_10_Template, 32, 15)(11, DashboardPage_Conditional_11_Template, 3, 0, "app-empty-state", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_4_0;
            const profileState_r11 = i0.ɵɵstoreLet(ctx.profile.state());
            i0.ɵɵadvance();
            i0.ɵɵstoreLet(ctx.pending.state());
            i0.ɵɵadvance();
            i0.ɵɵstoreLet(ctx.received.state());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.salvo() === "criado" ? 6 : ctx.salvo() === "atualizado" ? 7 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(profileState_r11.status === "loading" ? 8 : profileState_r11.status === "error" ? 9 : (tmp_4_0 = ctx.current()) ? 10 : 11, tmp_4_0);
        } }, dependencies: [RouterLink, StatusBadge, RatingStars, Pagination, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPage, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', imports: [RouterLink, StatusBadge, RatingStars, Pagination, LoadingState, EmptyState, ErrorState], template: "@let profileState = profile.state();\n@let pendingState = pending.state();\n@let receivedState = received.state();\n\n<section class=\"container page-section\">\n  <h1>Painel do prestador</h1>\n\n  @if (salvo() === 'criado') {\n    <div class=\"alert alert-info\" role=\"status\">Perfil criado! Agora voc\u00EA aparece na busca para os agricultores.</div>\n  } @else if (salvo() === 'atualizado') {\n    <div class=\"alert alert-info\" role=\"status\">Perfil atualizado com sucesso.</div>\n  }\n\n  @if (profileState.status === 'loading') {\n    <app-loading-state message=\"Carregando seu painel...\" />\n  } @else if (profileState.status === 'error') {\n    <app-error-state [message]=\"profileState.error.message\" (retry)=\"profile.reload()\" />\n  } @else if (current(); as me) {\n    <div class=\"card summary\">\n      <div>\n        <h2 class=\"summary-name\">{{ me.professionalName }}</h2>\n        <p class=\"muted\">{{ me.city }}</p>\n        <app-rating-stars [average]=\"me.ratingAverage\" [count]=\"me.ratingCount\" />\n      </div>\n\n      <div class=\"summary-side\">\n        @if (me.available) {\n          <span class=\"badge badge-ok\">Recebendo pedidos</span>\n        } @else {\n          <span class=\"badge badge-new\">Pedidos pausados</span>\n        }\n\n        <div class=\"actions\">\n          <a class=\"btn btn-primary\" routerLink=\"/painel/perfil\">Editar perfil</a>\n          <a class=\"btn btn-secondary\" [routerLink]=\"['/profissionais', me.id]\">Ver como aparece na busca</a>\n          <button type=\"button\" class=\"btn btn-secondary\" [disabled]=\"toggling()\" (click)=\"toggleAvailability(me)\">\n            {{ me.available ? 'Pausar novos pedidos' : 'Voltar a receber pedidos' }}\n          </button>\n        </div>\n\n        <p class=\"sr-only\" role=\"status\">{{ toggleResult() }}</p>\n        @if (toggleResult()) {\n          <p class=\"hint\" aria-hidden=\"true\">{{ toggleResult() }}</p>\n        }\n        @if (toggleError(); as message) {\n          <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n        }\n      </div>\n    </div>\n\n    <h2>Pedidos recebidos</h2>\n\n    @if (pendingState.status === 'ready' && pendingState.data.totalElements > 0) {\n      <div class=\"alert alert-info\">\n        <strong>\n          {{ pendingState.data.totalElements }}\n          {{ pendingState.data.totalElements === 1 ? 'pedido aguardando' : 'pedidos aguardando' }} a sua resposta.\n        </strong>\n        <a routerLink=\"/painel\" [queryParams]=\"{ status: 'PENDENTE' }\">Ver pendentes</a>\n      </div>\n    }\n\n    <nav aria-label=\"Filtrar pedidos por situa\u00E7\u00E3o\">\n      <ul class=\"chips filter-chips\">\n        @for (filter of filters; track filter.label) {\n          <li>\n            <a\n              class=\"chip chip-link\"\n              routerLink=\"/painel\"\n              [queryParams]=\"{ status: filter.value, page: null }\"\n              [attr.aria-current]=\"query().status === filter.value ? 'true' : null\"\n            >\n              {{ filter.label }}\n            </a>\n          </li>\n        }\n      </ul>\n    </nav>\n\n    @if (receivedState.status === 'loading') {\n      <app-loading-state message=\"Carregando pedidos...\" />\n    } @else if (receivedState.status === 'error') {\n      <app-error-state [message]=\"receivedState.error.message\" (retry)=\"received.reload()\" />\n    } @else if (receivedState.data.content.length === 0) {\n      @if (query().status !== null || query().page > 1) {\n        <app-empty-state title=\"Nada por aqui\" message=\"Nenhum pedido nesta situa\u00E7\u00E3o.\">\n          <a class=\"btn btn-secondary\" routerLink=\"/painel\">Ver todos</a>\n        </app-empty-state>\n      } @else {\n        <app-empty-state\n          title=\"Voc\u00EA ainda n\u00E3o recebeu pedidos\"\n          message=\"Quando um agricultor pedir um or\u00E7amento, ele aparece aqui. Perfis completos e com pre\u00E7o recebem mais pedidos.\"\n        >\n          <a class=\"btn btn-secondary\" routerLink=\"/painel/perfil\">Melhorar o meu perfil</a>\n        </app-empty-state>\n      }\n    } @else {\n      <ul class=\"request-list\">\n        @for (item of receivedState.data.content; track item.id) {\n          <li class=\"card card-clickable\">\n            <div class=\"request-head\">\n              <h3 class=\"request-title\">\n                <a class=\"stretched\" [routerLink]=\"['/solicitacoes', item.id]\">{{ item.category.name }}</a>\n              </h3>\n              <app-status-badge [status]=\"item.status\" />\n            </div>\n            <p class=\"request-meta\">\n              {{ item.requester?.name ?? 'Cliente' }} \u00B7 {{ item.city }}\n              @if (item.desiredDate) {\n                \u00B7 Data desejada: {{ formatDateOnly(item.desiredDate) }}\n              }\n            </p>\n            <p class=\"request-meta\">Recebido em {{ formatDate(item.createdAt) }}</p>\n          </li>\n        }\n      </ul>\n\n      <app-pagination [page]=\"query().page\" [totalPages]=\"receivedState.data.totalPages\" />\n    }\n  } @else {\n    <app-empty-state\n      title=\"Complete o seu perfil para aparecer na busca\"\n      message=\"Conte o que voc\u00EA faz, onde atende e quanto cobra. Leva poucos minutos.\"\n    >\n      <a class=\"btn btn-primary\" routerLink=\"/painel/perfil\">Criar meu perfil</a>\n    </app-empty-state>\n  }\n</section>\n" }]
    }], null, { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }], salvo: [{ type: i0.Input, args: [{ isSignal: true, alias: "salvo", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/features/provider-panel/dashboard-page.ts", lineNumber: 27 }); })();
