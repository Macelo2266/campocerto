import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { AuthService } from '../../core/auth/auth.service';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { ACTION_LABELS, NEEDS_CONFIRMATION, STATUS_HELP, STATUS_LABELS, isOpenStatus, } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly, phoneHref } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { ReviewForm } from '../../shared/review-form/review-form';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { WhatsappButton } from '../../shared/whatsapp-button/whatsapp-button';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/profissionais", a0];
function RequestDetailPage_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵtext(1, "\u2039 Minhas solicita\u00E7\u00F5es");
    i0.ɵɵelementEnd();
} }
function RequestDetailPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵtext(1, "\u2039 Painel do prestador");
    i0.ɵɵelementEnd();
} }
function RequestDetailPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 3);
} }
function RequestDetailPage_Conditional_5_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-empty-state", 4)(1, "a", 6);
    i0.ɵɵtext(2, "Voltar ao in\u00EDcio");
    i0.ɵɵelementEnd()();
} }
function RequestDetailPage_Conditional_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 7);
    i0.ɵɵlistener("retry", function RequestDetailPage_Conditional_5_Conditional_1_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.request.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const state_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", state_r3.error.message);
} }
function RequestDetailPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, RequestDetailPage_Conditional_5_Conditional_0_Template, 3, 0, "app-empty-state", 4)(1, RequestDetailPage_Conditional_5_Conditional_1_Template, 1, 1, "app-error-state", 5);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const state_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵconditional(state_r3.error.status === 404 ? 0 : 1);
} }
function RequestDetailPage_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1, " Pedido enviado! Agora \u00E9 s\u00F3 aguardar a resposta do profissional. Voc\u00EA pode acompanhar por aqui. ");
    i0.ɵɵelementEnd();
} }
function RequestDetailPage_Conditional_6_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function RequestDetailPage_Conditional_6_Conditional_10_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function RequestDetailPage_Conditional_6_Conditional_10_For_5_Template_button_click_0_listener() { const target_r5 = i0.ɵɵrestoreView(_r4).$implicit; const r_r6 = i0.ɵɵnextContext(2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.choose(r_r6, target_r5)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const target_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("btn-primary", target_r5 !== "CANCELADA")("btn-secondary", target_r5 === "CANCELADA");
    i0.ɵɵproperty("disabled", ctx_r1.acting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.actionLabel(target_r5), " ");
} }
function RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " A solicita\u00E7\u00E3o ser\u00E1 cancelada e n\u00E3o poder\u00E1 ser reaberta. ");
} }
function RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " A solicita\u00E7\u00E3o ser\u00E1 marcada como conclu\u00EDda e n\u00E3o poder\u00E1 ser alterada. ");
} }
function RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "p")(2, "strong");
    i0.ɵɵtext(3, "Tem certeza?");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Conditional_4_Template, 1, 0)(5, RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Conditional_5_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 25)(7, "button", 30);
    i0.ɵɵlistener("click", function RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Template_button_click_7_listener() { const target_r8 = i0.ɵɵrestoreView(_r7); const r_r6 = i0.ɵɵnextContext(2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.apply(r_r6, target_r8)); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 31);
    i0.ɵɵlistener("click", function RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.confirming.set(null)); });
    i0.ɵɵtext(10, "N\u00E3o, voltar");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const target_r8 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(target_r8 === "CANCELADA" ? 4 : 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.acting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Sim, ", ctx_r1.actionLabel(target_r8).toLowerCase(), " ");
} }
function RequestDetailPage_Conditional_6_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 15)(1, "h2", 24);
    i0.ɵɵtext(2, "O que voc\u00EA pode fazer agora");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 25);
    i0.ɵɵrepeaterCreate(4, RequestDetailPage_Conditional_6_Conditional_10_For_5_Template, 2, 6, "button", 26, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 27);
    i0.ɵɵconditionalCreate(7, RequestDetailPage_Conditional_6_Conditional_10_Conditional_7_Template, 11, 3, "div", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_5_0;
    const r_r6 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(r_r6.availableTransitions);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_5_0 = ctx_r1.confirming()) ? 7 : -1, tmp_5_0);
} }
function RequestDetailPage_Conditional_6_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Informa\u00E7\u00F5es adicionais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 20);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r6.additionalInfo);
} }
function RequestDetailPage_Conditional_6_Conditional_41_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "a", 33);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const who_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctx, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Ligar para ", who_r9.phone);
} }
function RequestDetailPage_Conditional_6_Conditional_41_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1, "O cliente n\u00E3o informou celular.");
    i0.ɵɵelementEnd();
} }
function RequestDetailPage_Conditional_6_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 21)(1, "h2", 32);
    i0.ɵɵtext(2, "Quem pediu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, RequestDetailPage_Conditional_6_Conditional_41_Conditional_5_Template, 3, 2, "p")(6, RequestDetailPage_Conditional_6_Conditional_41_Conditional_6_Template, 2, 0, "p", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_6_0;
    const who_r9 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(who_r9.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_6_0 = ctx_r1.phoneHref(who_r9.phone)) ? 5 : 6, tmp_6_0);
} }
function RequestDetailPage_Conditional_6_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 22)(1, "h2", 34);
    i0.ɵɵtext(2, "Falar com o profissional");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "app-whatsapp-button", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("providerId", r_r6.provider.id)("categoryId", r_r6.category.id);
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 37);
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 7);
    i0.ɵɵlistener("retry", function RequestDetailPage_Conditional_6_Conditional_43_Conditional_5_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.review.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const reviewState_r11 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", reviewState_r11.error.message);
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const saved_r12 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(saved_r12.comment);
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-rating-stars", 38);
    i0.ɵɵconditionalCreate(1, RequestDetailPage_Conditional_6_Conditional_43_Conditional_6_Conditional_1_Template, 2, 1, "p", 20);
    i0.ɵɵelementStart(2, "p", 13);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const saved_r12 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("average", saved_r12.rating)("count", 1)("compact", true);
    i0.ɵɵadvance();
    i0.ɵɵconditional(saved_r12.comment ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Avaliado em ", ctx_r1.formatDate(saved_r12.createdAt));
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Conte como foi o servi\u00E7o. Sua nota ajuda outros agricultores a escolher.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "app-review-form", 39);
    i0.ɵɵlistener("changed", function RequestDetailPage_Conditional_6_Conditional_43_Conditional_7_Template_app_review_form_changed_2_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.refresh()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("requestId", r_r6.id);
} }
function RequestDetailPage_Conditional_6_Conditional_43_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1, "O cliente ainda n\u00E3o avaliou este servi\u00E7o.");
    i0.ɵɵelementEnd();
} }
function RequestDetailPage_Conditional_6_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "section", 23)(2, "h2", 36);
    i0.ɵɵtext(3, "Avalia\u00E7\u00E3o do servi\u00E7o");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, RequestDetailPage_Conditional_6_Conditional_43_Conditional_4_Template, 1, 0, "app-loading-state", 37)(5, RequestDetailPage_Conditional_6_Conditional_43_Conditional_5_Template, 1, 1, "app-error-state", 5)(6, RequestDetailPage_Conditional_6_Conditional_43_Conditional_6_Template, 4, 5)(7, RequestDetailPage_Conditional_6_Conditional_43_Conditional_7_Template, 3, 1)(8, RequestDetailPage_Conditional_6_Conditional_43_Conditional_8_Template, 2, 0, "p", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    const reviewState_r14 = i0.ɵɵstoreLet(ctx_r1.review.state());
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(reviewState_r14.status === "loading" ? 4 : reviewState_r14.status === "error" ? 5 : (tmp_5_0 = reviewState_r14.status === "ready" && reviewState_r14.data) ? 6 : ctx_r1.auth.role() === "FARMER" ? 7 : 8, tmp_5_0);
} }
function RequestDetailPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, RequestDetailPage_Conditional_6_Conditional_0_Template, 2, 0, "div", 8);
    i0.ɵɵelementStart(1, "article", 9)(2, "header", 10)(3, "h1");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 11);
    i0.ɵɵelement(6, "app-status-badge", 12);
    i0.ɵɵelementStart(7, "span", 13);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(9, RequestDetailPage_Conditional_6_Conditional_9_Template, 2, 1, "div", 14);
    i0.ɵɵconditionalCreate(10, RequestDetailPage_Conditional_6_Conditional_10_Template, 8, 1, "section", 15);
    i0.ɵɵelementStart(11, "section", 16)(12, "h2", 17);
    i0.ɵɵtext(13, "Dados do pedido");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dl", 18)(15, "dt");
    i0.ɵɵtext(16, "Profissional");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "dd")(18, "a", 19);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "dt");
    i0.ɵɵtext(21, "Munic\u00EDpio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dt");
    i0.ɵɵtext(25, "Data desejada");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "dt");
    i0.ɵɵtext(29, "Enviada em");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "dd");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dt");
    i0.ɵɵtext(33, "Atualizada em");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "dd");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "h3");
    i0.ɵɵtext(37, "Descri\u00E7\u00E3o do trabalho");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p", 20);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(40, RequestDetailPage_Conditional_6_Conditional_40_Template, 4, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(41, RequestDetailPage_Conditional_6_Conditional_41_Template, 7, 2, "section", 21);
    i0.ɵɵconditionalCreate(42, RequestDetailPage_Conditional_6_Conditional_42_Template, 4, 2, "section", 22);
    i0.ɵɵconditionalCreate(43, RequestDetailPage_Conditional_6_Conditional_43_Template, 9, 2, "section", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_17_0;
    const r_r6 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.criada() ? 0 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(r_r6.category.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", r_r6.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusHelp[r_r6.status]);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_7_0 = ctx_r1.actionError()) ? 9 : -1, tmp_7_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(r_r6.availableTransitions.length > 0 ? 10 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(17, _c0, r_r6.provider.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(r_r6.provider.professionalName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(r_r6.city);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(r_r6.desiredDate ? ctx_r1.formatDateOnly(r_r6.desiredDate) : "Sem data definida");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(r_r6.createdAt));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(r_r6.updatedAt));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(r_r6.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(r_r6.additionalInfo ? 40 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_17_0 = r_r6.requester) ? 41 : -1, tmp_17_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.auth.role() === "FARMER" && ctx_r1.isOpen(r_r6.status) ? 42 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(r_r6.status === "CONCLUIDA" ? 43 : -1);
} }
export class RequestDetailPage {
    requests = inject(ServiceRequestService);
    destroyRef = inject(DestroyRef);
    auth = inject(AuthService);
    id = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []));
    criada = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "criada" }] : /* istanbul ignore next */ []));
    requestId = computed(() => parsePositiveInt(this.id()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "requestId" }] : /* istanbul ignore next */ []));
    request = loadResource(() => this.requestId(), (id) => id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 }))
        : this.requests.get(id));
    /** Resposta mais recente de uma ação (evita recarregar a página inteira depois de cada clique). */
    updated = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "updated" }] : /* istanbul ignore next */ []));
    current = computed(() => {
        const fresh = this.updated();
        if (fresh) {
            return fresh;
        }
        const state = this.request.state();
        return state.status === 'ready' ? state.data : null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "current" }] : /* istanbul ignore next */ []));
    // Só buscamos a avaliação quando o serviço está concluído
    reviewTarget = computed(() => {
        const current = this.current();
        return current?.status === 'CONCLUIDA' ? current.id : null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "reviewTarget" }] : /* istanbul ignore next */ []));
    review = loadResource(() => this.reviewTarget(), (id) => (id === null ? of(null) : this.requests.getReview(id)));
    acting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "acting" }] : /* istanbul ignore next */ []));
    confirming = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "confirming" }] : /* istanbul ignore next */ []));
    actionError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "actionError" }] : /* istanbul ignore next */ []));
    formatDate = formatDate;
    formatDateOnly = formatDateOnly;
    phoneHref = phoneHref;
    isOpen = isOpenStatus;
    statusHelp = STATUS_HELP;
    statusLabels = STATUS_LABELS;
    constructor() {
        // Outra solicitação na mesma tela (mudou o :id): descarta o que sobrou da anterior
        effect(() => {
            this.requestId();
            untracked(() => {
                this.updated.set(null);
                this.confirming.set(null);
                this.actionError.set(null);
            });
        });
    }
    actionLabel(target) {
        return ACTION_LABELS[target] ?? STATUS_LABELS[target];
    }
    choose(current, target) {
        if (NEEDS_CONFIRMATION.has(target)) {
            this.confirming.set(target); // pede confirmação antes de uma ação sem volta
            return;
        }
        this.apply(current, target);
    }
    apply(current, target) {
        this.acting.set(true);
        this.actionError.set(null);
        this.confirming.set(null);
        this.requests
            .changeStatus(current.id, target)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (fresh) => {
                this.updated.set(fresh);
                this.acting.set(false);
            },
            error: (error) => {
                const apiError = toApiError(error);
                this.actionError.set(apiError.message);
                this.acting.set(false);
                // 409: outra pessoa mudou a solicitação antes. Busca o estado atual e os botões certos
                if (apiError.status === 409) {
                    this.refresh();
                }
            },
        });
    }
    refresh() {
        this.updated.set(null);
        this.request.reload();
        this.review.reload();
    }
    static ɵfac = function RequestDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequestDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RequestDetailPage, selectors: [["app-request-detail-page"]], inputs: { id: [1, "id"], criada: [1, "criada"] }, decls: 7, vars: 3, consts: [[1, "container", "page-section"], ["routerLink", "/solicitacoes", 1, "link-back"], ["routerLink", "/painel", 1, "link-back"], ["message", "Carregando solicita\u00E7\u00E3o..."], ["title", "Solicita\u00E7\u00E3o n\u00E3o encontrada", "message", "Ela n\u00E3o existe ou n\u00E3o est\u00E1 dispon\u00EDvel para voc\u00EA."], [3, "message"], ["routerLink", "/", 1, "btn", "btn-primary"], [3, "retry", "message"], ["role", "status", 1, "alert", "alert-info"], [1, "detail"], [1, "card"], [1, "status-line"], [3, "status"], [1, "muted"], ["role", "alert", 1, "alert", "alert-error"], ["aria-labelledby", "actions-title", 1, "card"], ["aria-labelledby", "data-title", 1, "card"], ["id", "data-title"], [1, "data-list"], [3, "routerLink"], [1, "pre-line"], ["aria-labelledby", "who-title", 1, "card"], ["aria-labelledby", "talk-title", 1, "card"], ["aria-labelledby", "review-title", 1, "card"], ["id", "actions-title"], [1, "actions"], ["type", "button", 1, "btn", 3, "btn-primary", "btn-secondary", "disabled"], ["aria-live", "polite"], [1, "confirm", "alert", "alert-info"], ["type", "button", 1, "btn", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["id", "who-title"], [3, "href"], ["id", "talk-title"], [3, "providerId", "categoryId"], ["id", "review-title"], ["message", "Carregando avalia\u00E7\u00E3o..."], [3, "average", "count", "compact"], [3, "changed", "requestId"]], template: function RequestDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "div", 0);
            i0.ɵɵconditionalCreate(2, RequestDetailPage_Conditional_2_Template, 2, 0, "a", 1)(3, RequestDetailPage_Conditional_3_Template, 2, 0, "a", 2);
            i0.ɵɵconditionalCreate(4, RequestDetailPage_Conditional_4_Template, 1, 0, "app-loading-state", 3)(5, RequestDetailPage_Conditional_5_Template, 2, 1)(6, RequestDetailPage_Conditional_6_Template, 44, 19);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_2_0;
            const state_r15 = i0.ɵɵstoreLet(ctx.request.state());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.auth.role() === "FARMER" ? 2 : ctx.auth.role() === "PROVIDER" ? 3 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(state_r15.status === "loading" && !ctx.current() ? 4 : state_r15.status === "error" ? 5 : (tmp_2_0 = ctx.current()) ? 6 : -1, tmp_2_0);
        } }, dependencies: [RouterLink,
            StatusBadge,
            RatingStars,
            ReviewForm,
            WhatsappButton,
            LoadingState,
            EmptyState,
            ErrorState], styles: [".detail[_ngcontent-%COMP%] { display: grid; gap: 1rem; }\n.detail[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin-bottom: 0.5rem; }\n.detail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin-top: 0; }\n.detail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 1rem 0 0.25rem; font-size: 1.05rem; }\n\n.status-line[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; margin: 0; }\n\n.confirm[_ngcontent-%COMP%] { margin: 1rem 0 0; }\n.confirm[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 0 0.75rem; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestDetailPage, [{
        type: Component,
        args: [{ selector: 'app-request-detail-page', imports: [
                    RouterLink,
                    StatusBadge,
                    RatingStars,
                    ReviewForm,
                    WhatsappButton,
                    LoadingState,
                    EmptyState,
                    ErrorState,
                ], template: "@let state = request.state();\n\n<div class=\"container page-section\">\n  @if (auth.role() === 'FARMER') {\n    <a class=\"link-back\" routerLink=\"/solicitacoes\">\u2039 Minhas solicita\u00E7\u00F5es</a>\n  } @else if (auth.role() === 'PROVIDER') {\n    <a class=\"link-back\" routerLink=\"/painel\">\u2039 Painel do prestador</a>\n  }\n\n  @if (state.status === 'loading' && !current()) {\n    <app-loading-state message=\"Carregando solicita\u00E7\u00E3o...\" />\n  } @else if (state.status === 'error') {\n    @if (state.error.status === 404) {\n      <app-empty-state title=\"Solicita\u00E7\u00E3o n\u00E3o encontrada\" message=\"Ela n\u00E3o existe ou n\u00E3o est\u00E1 dispon\u00EDvel para voc\u00EA.\">\n        <a class=\"btn btn-primary\" routerLink=\"/\">Voltar ao in\u00EDcio</a>\n      </app-empty-state>\n    } @else {\n      <app-error-state [message]=\"state.error.message\" (retry)=\"request.reload()\" />\n    }\n  } @else if (current(); as r) {\n    @if (criada()) {\n      <div class=\"alert alert-info\" role=\"status\">\n        Pedido enviado! Agora \u00E9 s\u00F3 aguardar a resposta do profissional. Voc\u00EA pode acompanhar por aqui.\n      </div>\n    }\n\n    <article class=\"detail\">\n      <header class=\"card\">\n        <h1>{{ r.category.name }}</h1>\n        <p class=\"status-line\">\n          <app-status-badge [status]=\"r.status\" />\n          <span class=\"muted\">{{ statusHelp[r.status] }}</span>\n        </p>\n      </header>\n\n      @if (actionError(); as message) {\n        <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n      }\n\n      @if (r.availableTransitions.length > 0) {\n        <section class=\"card\" aria-labelledby=\"actions-title\">\n          <h2 id=\"actions-title\">O que voc\u00EA pode fazer agora</h2>\n\n          <div class=\"actions\">\n            @for (target of r.availableTransitions; track target) {\n              <button\n                type=\"button\"\n                class=\"btn\"\n                [class.btn-primary]=\"target !== 'CANCELADA'\"\n                [class.btn-secondary]=\"target === 'CANCELADA'\"\n                [disabled]=\"acting()\"\n                (click)=\"choose(r, target)\"\n              >\n                {{ actionLabel(target) }}\n              </button>\n            }\n          </div>\n\n          <div aria-live=\"polite\">\n            @if (confirming(); as target) {\n              <div class=\"confirm alert alert-info\">\n                <p>\n                  <strong>Tem certeza?</strong>\n                  @if (target === 'CANCELADA') {\n                    A solicita\u00E7\u00E3o ser\u00E1 cancelada e n\u00E3o poder\u00E1 ser reaberta.\n                  } @else {\n                    A solicita\u00E7\u00E3o ser\u00E1 marcada como conclu\u00EDda e n\u00E3o poder\u00E1 ser alterada.\n                  }\n                </p>\n                <div class=\"actions\">\n                  <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"acting()\" (click)=\"apply(r, target)\">\n                    Sim, {{ actionLabel(target).toLowerCase() }}\n                  </button>\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"confirming.set(null)\">N\u00E3o, voltar</button>\n                </div>\n              </div>\n            }\n          </div>\n        </section>\n      }\n\n      <section class=\"card\" aria-labelledby=\"data-title\">\n        <h2 id=\"data-title\">Dados do pedido</h2>\n        <dl class=\"data-list\">\n          <dt>Profissional</dt>\n          <dd>\n            <a [routerLink]=\"['/profissionais', r.provider.id]\">{{ r.provider.professionalName }}</a>\n          </dd>\n\n          <dt>Munic\u00EDpio</dt>\n          <dd>{{ r.city }}</dd>\n\n          <dt>Data desejada</dt>\n          <dd>{{ r.desiredDate ? formatDateOnly(r.desiredDate) : 'Sem data definida' }}</dd>\n\n          <dt>Enviada em</dt>\n          <dd>{{ formatDate(r.createdAt) }}</dd>\n\n          <dt>Atualizada em</dt>\n          <dd>{{ formatDate(r.updatedAt) }}</dd>\n        </dl>\n\n        <h3>Descri\u00E7\u00E3o do trabalho</h3>\n        <p class=\"pre-line\">{{ r.description }}</p>\n\n        @if (r.additionalInfo) {\n          <h3>Informa\u00E7\u00F5es adicionais</h3>\n          <p class=\"pre-line\">{{ r.additionalInfo }}</p>\n        }\n      </section>\n\n      @if (r.requester; as who) {\n        <section class=\"card\" aria-labelledby=\"who-title\">\n          <h2 id=\"who-title\">Quem pediu</h2>\n          <p>{{ who.name }}</p>\n          @if (phoneHref(who.phone); as href) {\n            <p><a [href]=\"href\">Ligar para {{ who.phone }}</a></p>\n          } @else {\n            <p class=\"muted\">O cliente n\u00E3o informou celular.</p>\n          }\n        </section>\n      }\n\n      @if (auth.role() === 'FARMER' && isOpen(r.status)) {\n        <section class=\"card\" aria-labelledby=\"talk-title\">\n          <h2 id=\"talk-title\">Falar com o profissional</h2>\n          <app-whatsapp-button [providerId]=\"r.provider.id\" [categoryId]=\"r.category.id\" />\n        </section>\n      }\n\n      @if (r.status === 'CONCLUIDA') {\n        @let reviewState = review.state();\n\n        <section class=\"card\" aria-labelledby=\"review-title\">\n          <h2 id=\"review-title\">Avalia\u00E7\u00E3o do servi\u00E7o</h2>\n\n          @if (reviewState.status === 'loading') {\n            <app-loading-state message=\"Carregando avalia\u00E7\u00E3o...\" />\n          } @else if (reviewState.status === 'error') {\n            <app-error-state [message]=\"reviewState.error.message\" (retry)=\"review.reload()\" />\n          } @else if (reviewState.status === 'ready' && reviewState.data; as saved) {\n            <app-rating-stars [average]=\"saved.rating\" [count]=\"1\" [compact]=\"true\" />\n            @if (saved.comment) {\n              <p class=\"pre-line\">{{ saved.comment }}</p>\n            }\n            <p class=\"muted\">Avaliado em {{ formatDate(saved.createdAt) }}</p>\n          } @else if (auth.role() === 'FARMER') {\n            <p>Conte como foi o servi\u00E7o. Sua nota ajuda outros agricultores a escolher.</p>\n            <app-review-form [requestId]=\"r.id\" (changed)=\"refresh()\" />\n          } @else {\n            <p class=\"muted\">O cliente ainda n\u00E3o avaliou este servi\u00E7o.</p>\n          }\n        </section>\n      }\n    </article>\n  }\n</div>\n", styles: [".detail { display: grid; gap: 1rem; }\n.detail h1 { margin-bottom: 0.5rem; }\n.detail h2 { margin-top: 0; }\n.detail h3 { margin: 1rem 0 0.25rem; font-size: 1.05rem; }\n\n.status-line { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; margin: 0; }\n\n.confirm { margin: 1rem 0 0; }\n.confirm p { margin: 0 0 0.75rem; }\n"] }]
    }], () => [], { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], criada: [{ type: i0.Input, args: [{ isSignal: true, alias: "criada", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RequestDetailPage, { className: "RequestDetailPage", filePath: "src/app/features/requests/request-detail-page.ts", lineNumber: 46 }); })();
