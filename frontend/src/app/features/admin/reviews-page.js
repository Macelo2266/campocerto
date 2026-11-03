import { Component, DestroyRef, Injector, computed, effect, inject, input, signal, untracked, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/api/admin.service';
import { focusElementAfterRender } from '../../core/forms/focus';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { REVIEW_STATUS_BADGE, REVIEW_STATUS_FILTERS, REVIEW_STATUS_LABELS, parseReviewStatus, } from '../../core/models/admin.model';
import { formatDate } from '../../core/util/format';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
const _c0 = a0 => ({ status: a0, page: null });
const _c1 = a0 => ["/profissionais", a0];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function AdminReviewsPage_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 10);
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
function AdminReviewsPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminReviewsPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminReviewsPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 6);
} }
function AdminReviewsPage_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 11);
    i0.ɵɵlistener("retry", function AdminReviewsPage_Conditional_13_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.results.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r4.error.message);
} }
function AdminReviewsPage_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 8);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.query().status === "HIDDEN" ? "N\u00E3o h\u00E1 avalia\u00E7\u00F5es ocultas." : "Ainda n\u00E3o h\u00E1 avalia\u00E7\u00F5es para mostrar.");
} }
function AdminReviewsPage_Conditional_15_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const review_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(review_r5.comment);
} }
function AdminReviewsPage_Conditional_15_For_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "Sem coment\u00E1rio.");
    i0.ɵɵelementEnd();
} }
function AdminReviewsPage_Conditional_15_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function AdminReviewsPage_Conditional_15_For_2_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const review_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.request(review_r5, "HIDDEN")); });
    i0.ɵɵtext(1, " Ocultar ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const review_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", "Ocultar avalia\u00E7\u00E3o " + review_r5.id);
} }
function AdminReviewsPage_Conditional_15_For_2_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function AdminReviewsPage_Conditional_15_For_2_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const review_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.request(review_r5, "VISIBLE")); });
    i0.ɵɵtext(1, " Restaurar ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const review_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
    i0.ɵɵattribute("aria-label", "Restaurar avalia\u00E7\u00E3o " + review_r5.id);
} }
function AdminReviewsPage_Conditional_15_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 13)(1, "div", 15)(2, "h3", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 17);
    i0.ɵɵelement(7, "app-rating-stars", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, AdminReviewsPage_Conditional_15_For_2_Conditional_8_Template, 2, 1, "p", 19)(9, AdminReviewsPage_Conditional_15_For_2_Conditional_9_Template, 2, 0, "p", 20);
    i0.ɵɵelementStart(10, "p", 21);
    i0.ɵɵtext(11);
    i0.ɵɵelementStart(12, "a", 22);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 23);
    i0.ɵɵconditionalCreate(16, AdminReviewsPage_Conditional_15_For_2_Conditional_16_Template, 2, 1, "button", 24)(17, AdminReviewsPage_Conditional_15_For_2_Conditional_17_Template, 2, 2, "button", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const review_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "review-" + review_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Avalia\u00E7\u00E3o ", review_r5.id, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap("badge " + ctx_r1.statusBadge[review_r5.status]);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.statusLabels[review_r5.status]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("average", review_r5.rating)("count", 1)("compact", true);
    i0.ɵɵadvance();
    i0.ɵɵconditional(review_r5.comment ? 8 : 9);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Por ", review_r5.reviewerName, " sobre ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(15, _c1, review_r5.providerId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(review_r5.providerName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" \u00B7 Solicita\u00E7\u00E3o n\u00BA ", review_r5.serviceRequestId, " \u00B7 ", ctx_r1.formatDate(review_r5.createdAt), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(review_r5.status === "VISIBLE" ? 16 : 17);
} }
function AdminReviewsPage_Conditional_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 0);
    i0.ɵɵtext(1, "As altera\u00E7\u00F5es aparecem no cart\u00E3o na hora. A lista filtrada s\u00F3 se ajusta ao recarregar.");
    i0.ɵɵelementEnd();
} }
function AdminReviewsPage_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 12);
    i0.ɵɵrepeaterCreate(1, AdminReviewsPage_Conditional_15_For_2_Template, 18, 17, "li", 13, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, AdminReviewsPage_Conditional_15_Conditional_3_Template, 2, 0, "p", 0);
    i0.ɵɵelement(4, "app-pagination", 14);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const result_r4 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.rows());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.rows().length > 0 && ctx_r1.query().status !== null ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("page", ctx_r1.query().page)("totalPages", result_r4.data.totalPages);
} }
const PAGE_SIZE = 10;
export class AdminReviewsPage {
    injector = inject(Injector);
    destroyRef = inject(DestroyRef);
    admin = inject(AdminService);
    status = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "status" }] : /* istanbul ignore next */ []));
    page = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "page" }] : /* istanbul ignore next */ []));
    filters = REVIEW_STATUS_FILTERS;
    statusLabels = REVIEW_STATUS_LABELS;
    statusBadge = REVIEW_STATUS_BADGE;
    formatDate = formatDate;
    query = computed(() => ({
        status: parseReviewStatus(this.status()),
        page: parsePositiveInt(this.page()) ?? 1,
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    results = loadResource(() => this.query(), (query) => this.admin.listReviews(query.status, query.page - 1, PAGE_SIZE));
    patched = signal(new Map(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "patched" }] : /* istanbul ignore next */ []));
    rows = computed(() => {
        const state = this.results.state();
        if (state.status !== 'ready') {
            return [];
        }
        const patched = this.patched();
        return state.data.content.map((review) => patched.get(review.id) ?? review);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    pending = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pending" }] : /* istanbul ignore next */ []));
    busy = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    dialogError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogError" }] : /* istanbul ignore next */ []));
    pageError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageError" }] : /* istanbul ignore next */ []));
    announcement = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "announcement" }] : /* istanbul ignore next */ []));
    confirmDialog = viewChild.required(ConfirmDialog, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "confirmDialog" }] : /* istanbul ignore next */ []));
    constructor() {
        // Quando a busca muda (outro filtro ou página), as linhas alteradas aqui deixam de valer
        effect(() => {
            this.query();
            untracked(() => this.patched.set(new Map()));
        });
    }
    request(review, target) {
        this.pageError.set(null);
        if (target === 'VISIBLE') {
            this.apply(review, target); // restaurar não pede confirmação
            return;
        }
        this.dialogError.set(null);
        this.pending.set(review);
        this.confirmDialog().open();
    }
    confirmPending() {
        const review = this.pending();
        if (review) {
            this.apply(review, 'HIDDEN');
        }
    }
    onDialogClosed() {
        this.pending.set(null);
        this.dialogError.set(null);
    }
    apply(review, target) {
        this.busy.set(true);
        this.admin
            .changeReviewStatus(review.id, target)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (fresh) => {
                this.patched.update((map) => new Map(map).set(fresh.id, fresh));
                this.busy.set(false);
                this.announcement.set(fresh.status === 'HIDDEN'
                    ? `Avaliação ${fresh.id} ocultada. Ela saiu do perfil público e da nota do prestador.`
                    : `Avaliação ${fresh.id} restaurada. Ela voltou ao perfil público e à nota do prestador.`);
                this.confirmDialog().close();
                focusElementAfterRender(this.injector, `review-${fresh.id}`);
            },
            error: (error) => {
                const message = toApiError(error).message;
                if (this.pending()) {
                    this.dialogError.set(message);
                }
                else {
                    this.pageError.set(message);
                }
                this.busy.set(false);
            },
        });
    }
    static ɵfac = function AdminReviewsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminReviewsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminReviewsPage, selectors: [["app-admin-reviews-page"]], viewQuery: function AdminReviewsPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.confirmDialog, ConfirmDialog, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { status: [1, "status"], page: [1, "page"] }, decls: 17, vars: 8, consts: [[1, "hint"], ["aria-label", "Filtrar avalia\u00E7\u00F5es por situa\u00E7\u00E3o"], [1, "chips", "filter-chips"], ["role", "status"], [1, "alert", "alert-info"], ["role", "alert", 1, "alert", "alert-error"], ["message", "Carregando avalia\u00E7\u00F5es..."], [3, "message"], ["title", "Nenhuma avalia\u00E7\u00E3o aqui", 3, "message"], ["message", "A avalia\u00E7\u00E3o deixa de aparecer no perfil do prestador e sai do c\u00E1lculo da nota dele. Ela fica guardada e voc\u00EA pode restaur\u00E1-la depois.", "confirmLabel", "Sim, ocultar", 3, "confirmed", "closed", "title", "danger", "busy", "error"], ["routerLink", "/admin/avaliacoes", 1, "chip", "chip-link", 3, "queryParams"], [3, "retry", "message"], [1, "request-list"], [1, "card"], [3, "page", "totalPages"], [1, "request-head"], ["tabindex", "-1", 1, "request-title", 3, "id"], [1, "review-line"], [3, "average", "count", "compact"], [1, "pre-line"], [1, "muted"], [1, "request-meta"], [3, "routerLink"], [1, "actions"], ["type", "button", 1, "btn", "btn-secondary", "btn-small"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click", "disabled"]], template: function AdminReviewsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "Avalia\u00E7\u00F5es");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 0);
            i0.ɵɵtext(4, " Oculte avalia\u00E7\u00F5es com ofensas, dados pessoais ou conte\u00FAdo falso. Uma avalia\u00E7\u00E3o oculta sai do perfil p\u00FAblico e da nota do prestador, mas continua guardada e pode ser restaurada.\n");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "nav", 1)(6, "ul", 2);
            i0.ɵɵrepeaterCreate(7, AdminReviewsPage_For_8_Template, 3, 5, "li", null, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 3);
            i0.ɵɵconditionalCreate(10, AdminReviewsPage_Conditional_10_Template, 2, 1, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, AdminReviewsPage_Conditional_11_Template, 2, 1, "div", 5);
            i0.ɵɵconditionalCreate(12, AdminReviewsPage_Conditional_12_Template, 1, 0, "app-loading-state", 6)(13, AdminReviewsPage_Conditional_13_Template, 1, 1, "app-error-state", 7)(14, AdminReviewsPage_Conditional_14_Template, 1, 1, "app-empty-state", 8)(15, AdminReviewsPage_Conditional_15_Template, 5, 3);
            i0.ɵɵelementStart(16, "app-confirm-dialog", 9);
            i0.ɵɵlistener("confirmed", function AdminReviewsPage_Template_app_confirm_dialog_confirmed_16_listener() { return ctx.confirmPending(); })("closed", function AdminReviewsPage_Template_app_confirm_dialog_closed_16_listener() { return ctx.onDialogClosed(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            const result_r8 = i0.ɵɵstoreLet(ctx.results.state());
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.filters);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_2_0 = ctx.announcement()) ? 10 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.pageError()) ? 11 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(result_r8.status === "loading" ? 12 : result_r8.status === "error" ? 13 : result_r8.data.content.length === 0 ? 14 : 15);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("title", "Ocultar a avalia\u00E7\u00E3o " + (ctx.pending()?.id ?? "") + "?")("danger", true)("busy", ctx.busy())("error", ctx.dialogError());
        } }, dependencies: [RouterLink, RatingStars, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminReviewsPage, [{
        type: Component,
        args: [{ selector: 'app-admin-reviews-page', imports: [RouterLink, RatingStars, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState], template: "@let result = results.state();\n\n<h2>Avalia\u00E7\u00F5es</h2>\n<p class=\"hint\">\n  Oculte avalia\u00E7\u00F5es com ofensas, dados pessoais ou conte\u00FAdo falso. Uma avalia\u00E7\u00E3o oculta sai do perfil p\u00FAblico e da nota\n  do prestador, mas continua guardada e pode ser restaurada.\n</p>\n\n<nav aria-label=\"Filtrar avalia\u00E7\u00F5es por situa\u00E7\u00E3o\">\n  <ul class=\"chips filter-chips\">\n    @for (filter of filters; track filter.label) {\n      <li>\n        <a\n          class=\"chip chip-link\"\n          routerLink=\"/admin/avaliacoes\"\n          [queryParams]=\"{ status: filter.value, page: null }\"\n          [attr.aria-current]=\"query().status === filter.value ? 'true' : null\"\n        >\n          {{ filter.label }}\n        </a>\n      </li>\n    }\n  </ul>\n</nav>\n\n<div role=\"status\">\n  @if (announcement(); as text) {\n    <div class=\"alert alert-info\">{{ text }}</div>\n  }\n</div>\n\n@if (pageError(); as message) {\n  <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n}\n\n@if (result.status === 'loading') {\n  <app-loading-state message=\"Carregando avalia\u00E7\u00F5es...\" />\n} @else if (result.status === 'error') {\n  <app-error-state [message]=\"result.error.message\" (retry)=\"results.reload()\" />\n} @else if (result.data.content.length === 0) {\n  <app-empty-state\n    title=\"Nenhuma avalia\u00E7\u00E3o aqui\"\n    [message]=\"query().status === 'HIDDEN' ? 'N\u00E3o h\u00E1 avalia\u00E7\u00F5es ocultas.' : 'Ainda n\u00E3o h\u00E1 avalia\u00E7\u00F5es para mostrar.'\"\n  />\n} @else {\n  <ul class=\"request-list\">\n    @for (review of rows(); track review.id) {\n      <li class=\"card\">\n        <div class=\"request-head\">\n          <h3 class=\"request-title\" tabindex=\"-1\" [id]=\"'review-' + review.id\">\n            Avalia\u00E7\u00E3o {{ review.id }}\n          </h3>\n          <span [class]=\"'badge ' + statusBadge[review.status]\">{{ statusLabels[review.status] }}</span>\n        </div>\n\n        <p class=\"review-line\">\n          <app-rating-stars [average]=\"review.rating\" [count]=\"1\" [compact]=\"true\" />\n        </p>\n\n        @if (review.comment) {\n          <p class=\"pre-line\">{{ review.comment }}</p>\n        } @else {\n          <p class=\"muted\">Sem coment\u00E1rio.</p>\n        }\n\n        <p class=\"request-meta\">\n          Por {{ review.reviewerName }} sobre\n          <a [routerLink]=\"['/profissionais', review.providerId]\">{{ review.providerName }}</a>\n          \u00B7 Solicita\u00E7\u00E3o n\u00BA {{ review.serviceRequestId }} \u00B7 {{ formatDate(review.createdAt) }}\n        </p>\n\n        <div class=\"actions\">\n          @if (review.status === 'VISIBLE') {\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-small\"\n              [attr.aria-label]=\"'Ocultar avalia\u00E7\u00E3o ' + review.id\"\n              (click)=\"request(review, 'HIDDEN')\"\n            >\n              Ocultar\n            </button>\n          } @else {\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-small\"\n              [attr.aria-label]=\"'Restaurar avalia\u00E7\u00E3o ' + review.id\"\n              [disabled]=\"busy()\"\n              (click)=\"request(review, 'VISIBLE')\"\n            >\n              Restaurar\n            </button>\n          }\n        </div>\n      </li>\n    }\n  </ul>\n\n  @if (rows().length > 0 && query().status !== null) {\n    <p class=\"hint\">As altera\u00E7\u00F5es aparecem no cart\u00E3o na hora. A lista filtrada s\u00F3 se ajusta ao recarregar.</p>\n  }\n\n  <app-pagination [page]=\"query().page\" [totalPages]=\"result.data.totalPages\" />\n}\n\n<app-confirm-dialog\n  [title]=\"'Ocultar a avalia\u00E7\u00E3o ' + (pending()?.id ?? '') + '?'\"\n  message=\"A avalia\u00E7\u00E3o deixa de aparecer no perfil do prestador e sai do c\u00E1lculo da nota dele. Ela fica guardada e voc\u00EA pode restaur\u00E1-la depois.\"\n  confirmLabel=\"Sim, ocultar\"\n  [danger]=\"true\"\n  [busy]=\"busy()\"\n  [error]=\"dialogError()\"\n  (confirmed)=\"confirmPending()\"\n  (closed)=\"onDialogClosed()\"\n/>\n" }]
    }], () => [], { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }], confirmDialog: [{ type: i0.ViewChild, args: [i0.forwardRef(() => ConfirmDialog), { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminReviewsPage, { className: "AdminReviewsPage", filePath: "src/app/features/admin/reviews-page.ts", lineNumber: 44 }); })();
