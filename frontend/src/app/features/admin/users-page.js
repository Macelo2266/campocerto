import { Component, DestroyRef, Injector, computed, effect, inject, input, signal, untracked, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../core/api/admin.service';
import { AuthService } from '../../core/auth/auth.service';
import { focusElementAfterRender } from '../../core/forms/focus';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { ROLE_OPTIONS, USER_STATUS_BADGE, USER_STATUS_LABELS, USER_STATUS_OPTIONS, parseRole, parseUserStatus, } from '../../core/models/admin.model';
import { ROLE_LABELS } from '../../core/models/user.model';
import { formatDate } from '../../core/util/format';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { parsePositiveInt } from '../providers/search-query';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function AdminUsersPage_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r1.label);
} }
function AdminUsersPage_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r2.label);
} }
function AdminUsersPage_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function AdminUsersPage_Conditional_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.clear()); });
    i0.ɵɵtext(1, "Limpar filtros");
    i0.ɵɵelementEnd();
} }
function AdminUsersPage_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminUsersPage_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminUsersPage_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 16);
} }
function AdminUsersPage_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 21);
    i0.ɵɵlistener("retry", function AdminUsersPage_Conditional_32_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.results.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const result_r6 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", result_r6.error.message);
} }
function AdminUsersPage_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-empty-state", 18)(1, "button", 20);
    i0.ɵɵlistener("click", function AdminUsersPage_Conditional_33_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.clear()); });
    i0.ɵɵtext(2, "Limpar filtros");
    i0.ɵɵelementEnd()();
} }
function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const user_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.request(user_r9, "ACTIVE")); });
    i0.ɵɵtext(1, " Reativar ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r3.busy());
    i0.ɵɵattribute("aria-label", "Reativar " + user_r9.name);
} }
function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const user_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.request(user_r9, "SUSPENDED")); });
    i0.ɵɵtext(1, " Suspender ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵattribute("aria-label", "Suspender " + user_r9.name);
} }
function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const user_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.request(user_r9, "BLOCKED")); });
    i0.ɵɵtext(1, " Bloquear ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵattribute("aria-label", "Bloquear " + user_r9.name);
} }
function AdminUsersPage_Conditional_34_For_24_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵconditionalCreate(1, AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_1_Template, 2, 2, "button", 32);
    i0.ɵɵconditionalCreate(2, AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_2_Template, 2, 1, "button", 33);
    i0.ɵɵconditionalCreate(3, AdminUsersPage_Conditional_34_For_24_Conditional_15_Conditional_3_Template, 2, 1, "button", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(user_r9.status !== "ACTIVE" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(user_r9.status === "ACTIVE" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(user_r9.status !== "BLOCKED" ? 3 : -1);
} }
function AdminUsersPage_Conditional_34_For_24_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.whyNot(user_r9));
} }
function AdminUsersPage_Conditional_34_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 29);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵconditionalCreate(15, AdminUsersPage_Conditional_34_For_24_Conditional_15_Template, 4, 3, "div", 30)(16, AdminUsersPage_Conditional_34_For_24_Conditional_16_Template, 2, 1, "span", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r9 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", "user-" + user_r9.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r9.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r9.phone ?? "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.roleLabels[user_r9.role]);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge " + ctx_r3.statusBadge[user_r9.status]);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.statusLabels[user_r9.status]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.formatDate(user_r9.createdAt));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r3.canChange(user_r9) ? 15 : 16);
} }
function AdminUsersPage_Conditional_34_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, "As altera\u00E7\u00F5es aparecem na linha na hora. A lista filtrada s\u00F3 se ajusta na pr\u00F3xima busca.");
    i0.ɵɵelementEnd();
} }
function AdminUsersPage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 23)(3, "table", 24)(4, "caption", 25);
    i0.ɵɵtext(5, "Usu\u00E1rios da plataforma");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "thead")(7, "tr")(8, "th", 26);
    i0.ɵɵtext(9, "Nome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 26);
    i0.ɵɵtext(11, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 26);
    i0.ɵɵtext(13, "Celular");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 26);
    i0.ɵɵtext(15, "Tipo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 26);
    i0.ɵɵtext(17, "Situa\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 26);
    i0.ɵɵtext(19, "Cadastro");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 26);
    i0.ɵɵtext(21, "A\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵrepeaterCreate(23, AdminUsersPage_Conditional_34_For_24_Template, 17, 10, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(25, AdminUsersPage_Conditional_34_Conditional_25_Template, 2, 0, "p", 27);
    i0.ɵɵelement(26, "app-pagination", 28);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    const result_r6 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", result_r6.data.totalElements, " usu\u00E1rio(s) encontrado(s)");
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r3.rows());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r3.rows().length > 0 && ctx_r3.hasFilters() ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("page", ctx_r3.query().page)("totalPages", result_r6.data.totalPages);
} }
const PAGE_SIZE = 20;
export class AdminUsersPage {
    router = inject(Router);
    fb = inject(NonNullableFormBuilder);
    injector = inject(Injector);
    destroyRef = inject(DestroyRef);
    admin = inject(AdminService);
    auth = inject(AuthService);
    // Parâmetros da URL: /admin/usuarios?q=joao&role=FARMER&status=ACTIVE&page=2
    q = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "q" }] : /* istanbul ignore next */ []));
    role = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "role" }] : /* istanbul ignore next */ []));
    status = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "status" }] : /* istanbul ignore next */ []));
    page = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "page" }] : /* istanbul ignore next */ []));
    roleOptions = ROLE_OPTIONS;
    statusOptions = USER_STATUS_OPTIONS;
    statusLabels = USER_STATUS_LABELS;
    statusBadge = USER_STATUS_BADGE;
    roleLabels = ROLE_LABELS;
    formatDate = formatDate;
    query = computed(() => ({
        q: (this.q() ?? '').slice(0, 100),
        role: parseRole(this.role()),
        status: parseUserStatus(this.status()),
        page: parsePositiveInt(this.page()) ?? 1,
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "query" }] : /* istanbul ignore next */ []));
    hasFilters = computed(() => {
        const query = this.query();
        return query.q !== '' || query.role !== null || query.status !== null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasFilters" }] : /* istanbul ignore next */ []));
    results = loadResource(() => this.query(), (query) => this.admin.listUsers(query, query.page - 1, PAGE_SIZE));
    // Linhas alteradas aqui, por cima da lista carregada (a linha muda sem recarregar a tabela)
    patched = signal(new Map(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "patched" }] : /* istanbul ignore next */ []));
    rows = computed(() => {
        const state = this.results.state();
        if (state.status !== 'ready') {
            return [];
        }
        const patched = this.patched();
        return state.data.content.map((user) => patched.get(user.id) ?? user);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    form = this.fb.group({
        q: [''],
        role: [''],
        status: [''],
    });
    // Ação aguardando confirmação
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
    // O diálogo fica no nível mais alto do template: um viewChild.required não pode estar dentro de um @if
    confirmDialog = viewChild.required(ConfirmDialog, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "confirmDialog" }] : /* istanbul ignore next */ []));
    currentAdminId = computed(() => this.auth.user()?.id ?? null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentAdminId" }] : /* istanbul ignore next */ []));
    dialogTitle = computed(() => {
        const pending = this.pending();
        if (!pending) {
            return '';
        }
        return `${pending.target === 'BLOCKED' ? 'Bloquear' : 'Suspender'} ${pending.user.name}?`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogTitle" }] : /* istanbul ignore next */ []));
    dialogMessage = computed(() => {
        const pending = this.pending();
        if (!pending) {
            return '';
        }
        const effects = 'A pessoa será desconectada na hora e não poderá entrar. Se for prestador, o perfil sai da busca e ninguém mais consegue pedir orçamento a ele.';
        return pending.target === 'BLOCKED'
            ? `${effects} Hoje o bloqueio e a suspensão têm o mesmo efeito prático; o bloqueio serve para registrar casos mais graves. Você pode reativar depois.`
            : `${effects} Você pode reativar depois.`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogMessage" }] : /* istanbul ignore next */ []));
    dialogConfirmLabel = computed(() => this.pending()?.target === 'BLOCKED' ? 'Sim, bloquear' : 'Sim, suspender', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogConfirmLabel" }] : /* istanbul ignore next */ []));
    constructor() {
        // Mantém o formulário igual à URL e descarta as linhas alteradas quando a busca muda
        effect(() => {
            const query = this.query();
            this.form.patchValue({ q: query.q, role: query.role ?? '', status: query.status ?? '' }, { emitEvent: false });
            untracked(() => this.patched.set(new Map()));
        });
    }
    /** O backend recusa alterar a própria conta e a de outro admin (403): aqui só escondemos os botões. */
    canChange(user) {
        return user.role !== 'ADMIN' && user.id !== this.currentAdminId();
    }
    whyNot(user) {
        return user.id === this.currentAdminId() ? 'Você' : 'Administrador';
    }
    search() {
        const value = this.form.getRawValue();
        void this.router.navigate(['/admin/usuarios'], {
            queryParams: { q: value.q.trim() || null, role: value.role || null, status: value.status || null },
        });
    }
    clear() {
        void this.router.navigate(['/admin/usuarios']);
    }
    request(user, target) {
        this.pageError.set(null);
        if (target === 'ACTIVE') {
            this.apply(user, target); // reativar devolve acesso: não precisa de confirmação
            return;
        }
        this.dialogError.set(null);
        this.pending.set({ user, target });
        this.confirmDialog().open();
    }
    confirmPending() {
        const pending = this.pending();
        if (pending) {
            this.apply(pending.user, pending.target);
        }
    }
    onDialogClosed() {
        this.pending.set(null);
        this.dialogError.set(null);
    }
    apply(user, target) {
        this.busy.set(true);
        this.admin
            .changeUserStatus(user.id, target)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (fresh) => {
                this.patched.update((map) => new Map(map).set(fresh.id, fresh));
                this.busy.set(false);
                this.announcement.set(`${fresh.name}: situação alterada para ${USER_STATUS_LABELS[fresh.status].toLowerCase()}.`);
                this.confirmDialog().close();
                // O botão clicado pode ter sumido: o foco vai para o nome da pessoa
                focusElementAfterRender(this.injector, `user-${fresh.id}`);
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
    static ɵfac = function AdminUsersPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminUsersPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminUsersPage, selectors: [["app-admin-users-page"]], viewQuery: function AdminUsersPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.confirmDialog, ConfirmDialog, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { q: [1, "q"], role: [1, "role"], status: [1, "status"], page: [1, "page"] }, decls: 36, vars: 12, consts: [["role", "search", "aria-label", "Buscar usu\u00E1rios", 1, "filters", "card", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "user-q"], ["id", "user-q", "type", "search", "formControlName", "q", "maxlength", "100", "autocomplete", "off", 1, "input"], ["for", "user-role"], ["id", "user-role", "formControlName", "role", 1, "input"], ["value", ""], [3, "value"], ["for", "user-status"], ["id", "user-status", "formControlName", "status", 1, "input"], [1, "filter-actions"], ["type", "submit", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-secondary"], ["role", "status"], [1, "alert", "alert-info"], ["role", "alert", 1, "alert", "alert-error"], ["message", "Carregando usu\u00E1rios..."], [3, "message"], ["title", "Nenhum usu\u00E1rio encontrado", "message", "Tente outro nome ou limpe os filtros."], [3, "confirmed", "closed", "title", "message", "confirmLabel", "danger", "busy", "error"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [3, "retry", "message"], [1, "results-count"], ["role", "region", "aria-label", "Lista de usu\u00E1rios", "tabindex", "0", 1, "table-wrap"], [1, "table"], [1, "sr-only"], ["scope", "col"], [1, "hint"], [3, "page", "totalPages"], ["scope", "row", "tabindex", "-1", 3, "id"], [1, "row-actions"], [1, "muted"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-small"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click"]], template: function AdminUsersPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "Usu\u00E1rios");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 0);
            i0.ɵɵlistener("ngSubmit", function AdminUsersPage_Template_form_ngSubmit_3_listener() { return ctx.search(); });
            i0.ɵɵelementStart(4, "div", 1)(5, "label", 2);
            i0.ɵɵtext(6, "Nome ou e-mail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "input", 3);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 1)(9, "label", 4);
            i0.ɵɵtext(10, "Tipo de conta");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "select", 5);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(12, "option", 6);
            i0.ɵɵtext(13, "Todos");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(14, AdminUsersPage_For_15_Template, 2, 2, "option", 7, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 1)(17, "label", 8);
            i0.ɵɵtext(18, "Situa\u00E7\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "select", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(20, "option", 6);
            i0.ɵɵtext(21, "Todas");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(22, AdminUsersPage_For_23_Template, 2, 2, "option", 7, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 10)(25, "button", 11);
            i0.ɵɵtext(26, "Buscar");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(27, AdminUsersPage_Conditional_27_Template, 2, 0, "button", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 13);
            i0.ɵɵconditionalCreate(29, AdminUsersPage_Conditional_29_Template, 2, 1, "div", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(30, AdminUsersPage_Conditional_30_Template, 2, 1, "div", 15);
            i0.ɵɵconditionalCreate(31, AdminUsersPage_Conditional_31_Template, 1, 0, "app-loading-state", 16)(32, AdminUsersPage_Conditional_32_Template, 1, 1, "app-error-state", 17)(33, AdminUsersPage_Conditional_33_Template, 3, 0, "app-empty-state", 18)(34, AdminUsersPage_Conditional_34_Template, 27, 4);
            i0.ɵɵelementStart(35, "app-confirm-dialog", 19);
            i0.ɵɵlistener("confirmed", function AdminUsersPage_Template_app_confirm_dialog_confirmed_35_listener() { return ctx.confirmPending(); })("closed", function AdminUsersPage_Template_app_confirm_dialog_closed_35_listener() { return ctx.onDialogClosed(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_8_0;
            let tmp_9_0;
            const result_r12 = i0.ɵɵstoreLet(ctx.results.state());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.roleOptions);
            i0.ɵɵadvance(5);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.statusOptions);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.hasFilters() ? 27 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_8_0 = ctx.announcement()) ? 29 : -1, tmp_8_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_9_0 = ctx.pageError()) ? 30 : -1, tmp_9_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(result_r12.status === "loading" ? 31 : result_r12.status === "error" ? 32 : result_r12.data.content.length === 0 ? 33 : 34);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("title", ctx.dialogTitle())("message", ctx.dialogMessage())("confirmLabel", ctx.dialogConfirmLabel())("danger", true)("busy", ctx.busy())("error", ctx.dialogError());
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminUsersPage, [{
        type: Component,
        args: [{ selector: 'app-admin-users-page', imports: [ReactiveFormsModule, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState], template: "@let result = results.state();\n\n<h2>Usu\u00E1rios</h2>\n\n<form class=\"filters card\" [formGroup]=\"form\" (ngSubmit)=\"search()\" role=\"search\" aria-label=\"Buscar usu\u00E1rios\">\n  <div class=\"field\">\n    <label for=\"user-q\">Nome ou e-mail</label>\n    <input id=\"user-q\" class=\"input\" type=\"search\" formControlName=\"q\" maxlength=\"100\" autocomplete=\"off\" />\n  </div>\n\n  <div class=\"field\">\n    <label for=\"user-role\">Tipo de conta</label>\n    <select id=\"user-role\" class=\"input\" formControlName=\"role\">\n      <option value=\"\">Todos</option>\n      @for (option of roleOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <div class=\"field\">\n    <label for=\"user-status\">Situa\u00E7\u00E3o</label>\n    <select id=\"user-status\" class=\"input\" formControlName=\"status\">\n      <option value=\"\">Todas</option>\n      @for (option of statusOptions; track option.value) {\n        <option [value]=\"option.value\">{{ option.label }}</option>\n      }\n    </select>\n  </div>\n\n  <div class=\"filter-actions\">\n    <button class=\"btn btn-primary\" type=\"submit\">Buscar</button>\n    @if (hasFilters()) {\n      <button class=\"btn btn-secondary\" type=\"button\" (click)=\"clear()\">Limpar filtros</button>\n    }\n  </div>\n</form>\n\n<!-- Regi\u00E3o fixa: o leitor de tela anuncia o texto que aparece aqui dentro -->\n<div role=\"status\">\n  @if (announcement(); as text) {\n    <div class=\"alert alert-info\">{{ text }}</div>\n  }\n</div>\n\n@if (pageError(); as message) {\n  <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n}\n\n@if (result.status === 'loading') {\n  <app-loading-state message=\"Carregando usu\u00E1rios...\" />\n} @else if (result.status === 'error') {\n  <app-error-state [message]=\"result.error.message\" (retry)=\"results.reload()\" />\n} @else if (result.data.content.length === 0) {\n  <app-empty-state title=\"Nenhum usu\u00E1rio encontrado\" message=\"Tente outro nome ou limpe os filtros.\">\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"clear()\">Limpar filtros</button>\n  </app-empty-state>\n} @else {\n  <p class=\"results-count\">{{ result.data.totalElements }} usu\u00E1rio(s) encontrado(s)</p>\n\n  <div class=\"table-wrap\" role=\"region\" aria-label=\"Lista de usu\u00E1rios\" tabindex=\"0\">\n    <table class=\"table\">\n      <caption class=\"sr-only\">Usu\u00E1rios da plataforma</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">Nome</th>\n          <th scope=\"col\">E-mail</th>\n          <th scope=\"col\">Celular</th>\n          <th scope=\"col\">Tipo</th>\n          <th scope=\"col\">Situa\u00E7\u00E3o</th>\n          <th scope=\"col\">Cadastro</th>\n          <th scope=\"col\">A\u00E7\u00F5es</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (user of rows(); track user.id) {\n          <tr>\n            <th scope=\"row\" tabindex=\"-1\" [id]=\"'user-' + user.id\">{{ user.name }}</th>\n            <td>{{ user.email }}</td>\n            <td>{{ user.phone ?? '\u2014' }}</td>\n            <td>{{ roleLabels[user.role] }}</td>\n            <td><span [class]=\"'badge ' + statusBadge[user.status]\">{{ statusLabels[user.status] }}</span></td>\n            <td>{{ formatDate(user.createdAt) }}</td>\n            <td>\n              @if (canChange(user)) {\n                <div class=\"row-actions\">\n                  @if (user.status !== 'ACTIVE') {\n                    <button\n                      type=\"button\"\n                      class=\"btn btn-secondary btn-small\"\n                      [attr.aria-label]=\"'Reativar ' + user.name\"\n                      [disabled]=\"busy()\"\n                      (click)=\"request(user, 'ACTIVE')\"\n                    >\n                      Reativar\n                    </button>\n                  }\n                  @if (user.status === 'ACTIVE') {\n                    <button\n                      type=\"button\"\n                      class=\"btn btn-secondary btn-small\"\n                      [attr.aria-label]=\"'Suspender ' + user.name\"\n                      (click)=\"request(user, 'SUSPENDED')\"\n                    >\n                      Suspender\n                    </button>\n                  }\n                  @if (user.status !== 'BLOCKED') {\n                    <button\n                      type=\"button\"\n                      class=\"btn btn-secondary btn-small\"\n                      [attr.aria-label]=\"'Bloquear ' + user.name\"\n                      (click)=\"request(user, 'BLOCKED')\"\n                    >\n                      Bloquear\n                    </button>\n                  }\n                </div>\n              } @else {\n                <span class=\"muted\">{{ whyNot(user) }}</span>\n              }\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n\n  @if (rows().length > 0 && hasFilters()) {\n    <p class=\"hint\">As altera\u00E7\u00F5es aparecem na linha na hora. A lista filtrada s\u00F3 se ajusta na pr\u00F3xima busca.</p>\n  }\n\n  <app-pagination [page]=\"query().page\" [totalPages]=\"result.data.totalPages\" />\n}\n\n<app-confirm-dialog\n  [title]=\"dialogTitle()\"\n  [message]=\"dialogMessage()\"\n  [confirmLabel]=\"dialogConfirmLabel()\"\n  [danger]=\"true\"\n  [busy]=\"busy()\"\n  [error]=\"dialogError()\"\n  (confirmed)=\"confirmPending()\"\n  (closed)=\"onDialogClosed()\"\n/>\n" }]
    }], () => [], { q: [{ type: i0.Input, args: [{ isSignal: true, alias: "q", required: false }] }], role: [{ type: i0.Input, args: [{ isSignal: true, alias: "role", required: false }] }], status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }], confirmDialog: [{ type: i0.ViewChild, args: [i0.forwardRef(() => ConfirmDialog), { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminUsersPage, { className: "AdminUsersPage", filePath: "src/app/features/admin/users-page.ts", lineNumber: 48 }); })();
