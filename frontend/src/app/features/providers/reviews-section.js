import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { ProviderService } from '../../core/api/provider.service';
import { toApiError } from '../../core/http/api-error';
import { formatDate } from '../../core/util/format';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ReviewsSection_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 2);
    i0.ɵɵtext(1, "Este profissional ainda n\u00E3o recebeu avalia\u00E7\u00F5es.");
    i0.ɵɵelementEnd();
} }
function ReviewsSection_For_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const review_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(review_r1.comment);
} }
function ReviewsSection_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 4)(1, "div", 8);
    i0.ɵɵelement(2, "app-rating-stars", 9);
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ReviewsSection_For_6_Conditional_7_Template, 2, 1, "p", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const review_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("average", review_r1.rating)("count", 1)("compact", true);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(review_r1.reviewerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", review_r1.serviceName, " \u00B7 ", ctx_r1.formatDate(review_r1.createdAt));
    i0.ɵɵadvance();
    i0.ɵɵconditional(review_r1.comment ? 7 : -1);
} }
function ReviewsSection_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 5);
} }
function ReviewsSection_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 12);
    i0.ɵɵlistener("click", function ReviewsSection_Conditional_8_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadMore()); });
    i0.ɵɵtext(4, "Tentar de novo");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function ReviewsSection_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function ReviewsSection_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadMore()); });
    i0.ɵɵtext(1, "Ver mais avalia\u00E7\u00F5es");
    i0.ɵɵelementEnd();
} }
const REVIEWS_PAGE_SIZE = 5;
export class ReviewsSection {
    providerService = inject(ProviderService);
    providerId = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "providerId" }] : /* istanbul ignore next */ []));
    reviews = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "reviews" }] : /* istanbul ignore next */ []));
    loadedPages = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loadedPages" }] : /* istanbul ignore next */ []));
    totalPages = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    errorMessage = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    hasMore = computed(() => this.loadedPages() < this.totalPages(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasMore" }] : /* istanbul ignore next */ []));
    formatDate = formatDate;
    subscription;
    constructor() {
        // Se a tela passar a mostrar outro prestador, recomeça do zero
        effect(() => {
            const id = this.providerId();
            untracked(() => this.restart(id));
        });
        inject(DestroyRef).onDestroy(() => this.subscription?.unsubscribe());
    }
    /** Carrega a próxima página (também serve de "tentar de novo" depois de um erro). */
    loadMore() {
        this.fetch(this.providerId(), this.loadedPages());
    }
    restart(id) {
        this.reviews.set([]);
        this.loadedPages.set(0);
        this.totalPages.set(0);
        this.fetch(id, 0);
    }
    fetch(id, page) {
        this.subscription?.unsubscribe();
        this.loading.set(true);
        this.errorMessage.set(null);
        this.subscription = this.providerService.reviews(id, page, REVIEWS_PAGE_SIZE).subscribe({
            next: (result) => {
                // Se chegou avaliação nova entre duas páginas, a lista "desloca": evitamos duplicar
                this.reviews.update((list) => {
                    const known = new Set(list.map((review) => review.id));
                    return [...list, ...result.content.filter((review) => !known.has(review.id))];
                });
                this.loadedPages.set(page + 1);
                this.totalPages.set(result.totalPages);
                this.loading.set(false);
            },
            error: (error) => {
                this.errorMessage.set(toApiError(error).message);
                this.loading.set(false);
            },
        });
    }
    static ɵfac = function ReviewsSection_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReviewsSection)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReviewsSection, selectors: [["app-reviews-section"]], inputs: { providerId: [1, "providerId"] }, decls: 10, vars: 4, consts: [["aria-labelledby", "reviews-title"], ["id", "reviews-title"], [1, "muted"], [1, "review-list"], [1, "card", "review"], ["message", "Carregando avalia\u00E7\u00F5es..."], ["role", "alert", 1, "alert", "alert-error"], ["type", "button", 1, "btn", "btn-secondary"], [1, "review-head"], [3, "average", "count", "compact"], [1, "review-meta"], [1, "review-comment"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"]], template: function ReviewsSection_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h2", 1);
            i0.ɵɵtext(2, "Avalia\u00E7\u00F5es");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, ReviewsSection_Conditional_3_Template, 2, 0, "p", 2);
            i0.ɵɵelementStart(4, "ul", 3);
            i0.ɵɵrepeaterCreate(5, ReviewsSection_For_6_Template, 8, 7, "li", 4, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(7, ReviewsSection_Conditional_7_Template, 1, 0, "app-loading-state", 5);
            i0.ɵɵconditionalCreate(8, ReviewsSection_Conditional_8_Template, 5, 1, "div", 6);
            i0.ɵɵconditionalCreate(9, ReviewsSection_Conditional_9_Template, 2, 0, "button", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.reviews().length === 0 && !ctx.loading() && !ctx.errorMessage() ? 3 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.reviews());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.errorMessage()) ? 8 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasMore() && !ctx.loading() && !ctx.errorMessage() ? 9 : -1);
        } }, dependencies: [RatingStars, LoadingState], styles: [".review-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  margin: 0 0 1rem;\n  padding: 0;\n  list-style: none;\n}\n\n.review-head[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; }\n.review-meta[_ngcontent-%COMP%] { margin: 0.25rem 0 0; font-size: 0.95rem; color: var(--%NS%muted); }\n\n\n.review-comment[_ngcontent-%COMP%] { margin: 0.6rem 0 0; white-space: pre-line; overflow-wrap: anywhere; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReviewsSection, [{
        type: Component,
        args: [{ selector: 'app-reviews-section', imports: [RatingStars, LoadingState], template: "<section aria-labelledby=\"reviews-title\">\n  <h2 id=\"reviews-title\">Avalia\u00E7\u00F5es</h2>\n\n  @if (reviews().length === 0 && !loading() && !errorMessage()) {\n    <p class=\"muted\">Este profissional ainda n\u00E3o recebeu avalia\u00E7\u00F5es.</p>\n  }\n\n  <ul class=\"review-list\">\n    @for (review of reviews(); track review.id) {\n      <li class=\"card review\">\n        <div class=\"review-head\">\n          <app-rating-stars [average]=\"review.rating\" [count]=\"1\" [compact]=\"true\" />\n          <strong>{{ review.reviewerName }}</strong>\n        </div>\n        <p class=\"review-meta\">{{ review.serviceName }} \u00B7 {{ formatDate(review.createdAt) }}</p>\n        @if (review.comment) {\n          <p class=\"review-comment\">{{ review.comment }}</p>\n        }\n      </li>\n    }\n  </ul>\n\n  @if (loading()) {\n    <app-loading-state message=\"Carregando avalia\u00E7\u00F5es...\" />\n  }\n\n  @if (errorMessage(); as message) {\n    <div class=\"alert alert-error\" role=\"alert\">\n      <p>{{ message }}</p>\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"loadMore()\">Tentar de novo</button>\n    </div>\n  }\n\n  @if (hasMore() && !loading() && !errorMessage()) {\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"loadMore()\">Ver mais avalia\u00E7\u00F5es</button>\n  }\n</section>\n", styles: [".review-list {\n  display: grid;\n  gap: 0.75rem;\n  margin: 0 0 1rem;\n  padding: 0;\n  list-style: none;\n}\n\n.review-head { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; }\n.review-meta { margin: 0.25rem 0 0; font-size: 0.95rem; color: var(--muted); }\n\n/* Texto do usu\u00E1rio: preserva as quebras de linha e nunca vira HTML */\n.review-comment { margin: 0.6rem 0 0; white-space: pre-line; overflow-wrap: anywhere; }\n"] }]
    }], () => [], { providerId: [{ type: i0.Input, args: [{ isSignal: true, alias: "providerId", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReviewsSection, { className: "ReviewsSection", filePath: "src/app/features/providers/reviews-section.ts", lineNumber: 19 }); })();
