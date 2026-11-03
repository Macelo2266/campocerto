import { Component, DestroyRef, Injector, computed, effect, inject, signal, untracked, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../core/api/admin.service';
import { CategoryService } from '../../core/api/category.service';
import { focusElementAfterRender, focusFirstInvalid } from '../../core/forms/focus';
import { applyServerErrors, fieldError } from '../../core/forms/form-errors';
import { notBlank } from '../../core/forms/validators';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function AdminCategoriesPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 0);
} }
function AdminCategoriesPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 3);
    i0.ɵɵlistener("retry", function AdminCategoriesPage_Conditional_4_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.categories.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const state_r3 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", state_r3.error.message);
} }
function AdminCategoriesPage_Conditional_5_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminCategoriesPage_Conditional_5_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminCategoriesPage_Conditional_5_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "O endere\u00E7o (slug) foi criado junto com a categoria e n\u00E3o muda quando voc\u00EA renomeia.");
    i0.ɵɵelementEnd();
} }
function AdminCategoriesPage_Conditional_5_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminCategoriesPage_Conditional_5_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function AdminCategoriesPage_Conditional_5_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancelEdit()); });
    i0.ɵɵtext(1, "Cancelar edi\u00E7\u00E3o");
    i0.ɵɵelementEnd();
} }
function AdminCategoriesPage_Conditional_5_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminCategoriesPage_Conditional_5_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function AdminCategoriesPage_Conditional_5_For_41_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function AdminCategoriesPage_Conditional_5_For_41_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const category_r7 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.requestDeactivation(category_r7)); });
    i0.ɵɵtext(1, " Desativar ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", "Desativar " + category_r7.name);
} }
function AdminCategoriesPage_Conditional_5_For_41_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function AdminCategoriesPage_Conditional_5_For_41_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const category_r7 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.reactivate(category_r7)); });
    i0.ɵɵtext(1, " Reativar ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
    i0.ɵɵattribute("aria-label", "Reativar " + category_r7.name);
} }
function AdminCategoriesPage_Conditional_5_For_41_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 26);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "code");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 27);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "div", 28)(13, "button", 29);
    i0.ɵɵlistener("click", function AdminCategoriesPage_Conditional_5_For_41_Template_button_click_13_listener() { const category_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.edit(category_r7)); });
    i0.ɵɵtext(14, " Editar ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AdminCategoriesPage_Conditional_5_For_41_Conditional_15_Template, 2, 1, "button", 30)(16, AdminCategoriesPage_Conditional_5_For_41_Conditional_16_Template, 2, 2, "button", 31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const category_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", "category-" + category_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r7.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(category_r7.slug);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(category_r7.description ?? "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("badge-ok", category_r7.active)("badge-warn", !category_r7.active);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r7.active ? "Ativa" : "Inativa", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", "Editar " + category_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(category_r7.active ? 15 : 16);
} }
function AdminCategoriesPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 4)(1, "h3", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, AdminCategoriesPage_Conditional_5_Conditional_3_Template, 2, 1, "div", 6);
    i0.ɵɵelementStart(4, "form", 7);
    i0.ɵɵlistener("ngSubmit", function AdminCategoriesPage_Conditional_5_Template_form_ngSubmit_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(5, "div", 8)(6, "label", 9);
    i0.ɵɵtext(7, "Nome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 10);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, AdminCategoriesPage_Conditional_5_Conditional_9_Template, 2, 1, "p", 11);
    i0.ɵɵconditionalCreate(10, AdminCategoriesPage_Conditional_5_Conditional_10_Template, 2, 0, "p", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 8)(12, "label", 13);
    i0.ɵɵtext(13, "Descri\u00E7\u00E3o (opcional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 14);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AdminCategoriesPage_Conditional_5_Conditional_15_Template, 2, 1, "p", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 16)(17, "button", 17);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, AdminCategoriesPage_Conditional_5_Conditional_19_Template, 2, 0, "button", 18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 19);
    i0.ɵɵconditionalCreate(21, AdminCategoriesPage_Conditional_5_Conditional_21_Template, 2, 1, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, AdminCategoriesPage_Conditional_5_Conditional_22_Template, 2, 1, "div", 6);
    i0.ɵɵelementStart(23, "div", 21)(24, "table", 22)(25, "caption", 23);
    i0.ɵɵtext(26, "Categorias de servi\u00E7os");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "thead")(28, "tr")(29, "th", 24);
    i0.ɵɵtext(30, "Nome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 24);
    i0.ɵɵtext(32, "Endere\u00E7o (slug)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "th", 24);
    i0.ɵɵtext(34, "Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "th", 24);
    i0.ɵɵtext(36, "Situa\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "th", 24);
    i0.ɵɵtext(38, "A\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "tbody");
    i0.ɵɵrepeaterCreate(40, AdminCategoriesPage_Conditional_5_For_41_Template, 17, 11, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_3_0;
    let tmp_9_0;
    let tmp_13_0;
    let tmp_17_0;
    let tmp_18_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.isEditing() ? "Editando: " + ctx_r1.editing()?.name : "Nova categoria");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.formError()) ? 3 : -1, tmp_3_0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵattribute("aria-busy", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.name) ? "true" : null)("aria-describedby", ctx_r1.fieldError(ctx_r1.form.controls.name) ? "category-name-error" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_9_0 = ctx_r1.fieldError(ctx_r1.form.controls.name)) ? 9 : -1, tmp_9_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isEditing() ? 10 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-invalid", ctx_r1.fieldError(ctx_r1.form.controls.description) ? "true" : null);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_13_0 = ctx_r1.fieldError(ctx_r1.form.controls.description)) ? 15 : -1, tmp_13_0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Salvando..." : ctx_r1.isEditing() ? "Salvar altera\u00E7\u00F5es" : "Criar categoria", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isEditing() ? 19 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_17_0 = ctx_r1.announcement()) ? 21 : -1, tmp_17_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_18_0 = ctx_r1.pageError()) ? 22 : -1, tmp_18_0);
    i0.ɵɵadvance(18);
    i0.ɵɵrepeater(ctx_r1.items());
} }
function sortByName(list) {
    return [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
export class AdminCategoriesPage {
    fb = inject(NonNullableFormBuilder);
    injector = inject(Injector);
    destroyRef = inject(DestroyRef);
    admin = inject(AdminService);
    publicCategories = inject(CategoryService);
    categories = loadResource(() => null, () => this.admin.listCategories());
    /** Cópia local da lista: create/edit/desativar alteram só a linha afetada. */
    items = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    form = this.fb.group({
        name: ['', [notBlank, Validators.maxLength(100)]],
        description: ['', [Validators.maxLength(500)]],
    });
    editing = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "editing" }] : /* istanbul ignore next */ []));
    saving = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
    formError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "formError" }] : /* istanbul ignore next */ []));
    announcement = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "announcement" }] : /* istanbul ignore next */ []));
    pageError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageError" }] : /* istanbul ignore next */ []));
    pendingDeactivation = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pendingDeactivation" }] : /* istanbul ignore next */ []));
    busy = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    dialogError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dialogError" }] : /* istanbul ignore next */ []));
    isEditing = computed(() => this.editing() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isEditing" }] : /* istanbul ignore next */ []));
    fieldError = fieldError;
    confirmDialog = viewChild.required(ConfirmDialog, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "confirmDialog" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const state = this.categories.state();
            if (state.status === 'ready') {
                untracked(() => this.items.set(sortByName(state.data)));
            }
        });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            focusFirstInvalid(this.injector);
            return;
        }
        const value = this.form.getRawValue();
        const payload = { name: value.name.trim(), description: value.description.trim() || null };
        const editing = this.editing();
        this.saving.set(true);
        this.formError.set(null);
        const request$ = editing
            ? this.admin.updateCategory(editing.id, payload)
            : this.admin.createCategory(payload);
        request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.items.update((list) => sortByName([...list.filter((item) => item.id !== saved.id), saved]));
                this.publicCategories.invalidate();
                this.announcement.set(editing ? `Categoria atualizada: ${saved.name}.` : `Categoria criada: ${saved.name}.`);
                this.resetForm();
                this.saving.set(false);
                focusElementAfterRender(this.injector, `category-${saved.id}`);
            },
            error: (error) => {
                const apiError = toApiError(error);
                applyServerErrors(this.form, apiError.fieldErrors);
                this.formError.set(apiError.message);
                this.saving.set(false);
            },
        });
    }
    edit(category) {
        this.editing.set(category);
        this.announcement.set('');
        this.formError.set(null);
        this.form.reset({ name: category.name, description: category.description ?? '' });
        focusElementAfterRender(this.injector, 'category-name');
    }
    cancelEdit() {
        const editing = this.editing();
        this.resetForm();
        this.formError.set(null);
        if (editing) {
            focusElementAfterRender(this.injector, `category-${editing.id}`);
        }
    }
    requestDeactivation(category) {
        this.pageError.set(null);
        this.dialogError.set(null);
        this.pendingDeactivation.set(category);
        this.confirmDialog().open();
    }
    confirmDeactivation() {
        const category = this.pendingDeactivation();
        if (!category) {
            return;
        }
        this.busy.set(true);
        this.admin
            .deactivateCategory(category.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.items.update((list) => list.map((item) => (item.id === category.id ? { ...item, active: false } : item)));
                this.publicCategories.invalidate();
                this.announcement.set(`Categoria desativada: ${category.name}.`);
                this.busy.set(false);
                this.confirmDialog().close();
                focusElementAfterRender(this.injector, `category-${category.id}`);
            },
            error: (error) => {
                this.dialogError.set(toApiError(error).message);
                this.busy.set(false);
            },
        });
    }
    reactivate(category) {
        this.pageError.set(null);
        this.busy.set(true);
        this.admin
            .reactivateCategory(category.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (fresh) => {
                this.items.update((list) => list.map((item) => (item.id === fresh.id ? fresh : item)));
                this.publicCategories.invalidate();
                this.announcement.set(`Categoria reativada: ${fresh.name}.`);
                this.busy.set(false);
                focusElementAfterRender(this.injector, `category-${fresh.id}`);
            },
            error: (error) => {
                this.pageError.set(toApiError(error).message);
                this.busy.set(false);
            },
        });
    }
    onDialogClosed() {
        this.pendingDeactivation.set(null);
        this.dialogError.set(null);
    }
    resetForm() {
        this.editing.set(null);
        this.form.reset({ name: '', description: '' });
    }
    static ɵfac = function AdminCategoriesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminCategoriesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminCategoriesPage, selectors: [["app-admin-categories-page"]], viewQuery: function AdminCategoriesPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.confirmDialog, ConfirmDialog, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, decls: 7, vars: 6, consts: [["message", "Carregando categorias..."], [3, "message"], ["message", "A categoria some da p\u00E1gina inicial e do filtro de servi\u00E7os, e agricultores n\u00E3o poder\u00E3o mais pedir or\u00E7amento para este servi\u00E7o, nem a prestadores que j\u00E1 o oferecem. Os prestadores continuam com o servi\u00E7o no perfil. Voc\u00EA pode reativar a categoria depois.", "confirmLabel", "Sim, desativar", 3, "confirmed", "closed", "title", "danger", "busy", "error"], [3, "retry", "message"], ["aria-labelledby", "category-form-title", 1, "card", "form-section"], ["id", "category-form-title"], ["role", "alert", 1, "alert", "alert-error"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "category-name"], ["id", "category-name", "type", "text", "formControlName", "name", "maxlength", "100", "autocomplete", "off", 1, "input"], ["id", "category-name-error", 1, "field-error"], [1, "hint"], ["for", "category-description"], ["id", "category-description", "type", "text", "formControlName", "description", "maxlength", "500", "autocomplete", "off", 1, "input"], [1, "field-error"], [1, "actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary"], ["role", "status"], [1, "alert", "alert-info"], ["role", "region", "aria-label", "Lista de categorias", "tabindex", "0", 1, "table-wrap"], [1, "table"], [1, "sr-only"], ["scope", "col"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["scope", "row", "tabindex", "-1", 3, "id"], [1, "badge"], [1, "row-actions"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", "btn-small"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary", "btn-small", 3, "click", "disabled"]], template: function AdminCategoriesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0);
            i0.ɵɵelementStart(1, "h2");
            i0.ɵɵtext(2, "Categorias de servi\u00E7os");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, AdminCategoriesPage_Conditional_3_Template, 1, 0, "app-loading-state", 0)(4, AdminCategoriesPage_Conditional_4_Template, 1, 1, "app-error-state", 1)(5, AdminCategoriesPage_Conditional_5_Template, 42, 15);
            i0.ɵɵelementStart(6, "app-confirm-dialog", 2);
            i0.ɵɵlistener("confirmed", function AdminCategoriesPage_Template_app_confirm_dialog_confirmed_6_listener() { return ctx.confirmDeactivation(); })("closed", function AdminCategoriesPage_Template_app_confirm_dialog_closed_6_listener() { return ctx.onDialogClosed(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const state_r10 = i0.ɵɵstoreLet(ctx.categories.state());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(state_r10.status === "loading" ? 3 : state_r10.status === "error" ? 4 : 5);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("title", "Desativar " + (ctx.pendingDeactivation()?.name ?? "") + "?")("danger", true)("busy", ctx.busy())("error", ctx.dialogError());
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, ConfirmDialog, LoadingState, ErrorState], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminCategoriesPage, [{
        type: Component,
        args: [{ selector: 'app-admin-categories-page', imports: [ReactiveFormsModule, ConfirmDialog, LoadingState, ErrorState], template: "@let state = categories.state();\n\n<h2>Categorias de servi\u00E7os</h2>\n\n@if (state.status === 'loading') {\n  <app-loading-state message=\"Carregando categorias...\" />\n} @else if (state.status === 'error') {\n  <app-error-state [message]=\"state.error.message\" (retry)=\"categories.reload()\" />\n} @else {\n  <section class=\"card form-section\" aria-labelledby=\"category-form-title\">\n    <h3 id=\"category-form-title\">{{ isEditing() ? 'Editando: ' + editing()?.name : 'Nova categoria' }}</h3>\n\n    @if (formError(); as message) {\n      <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n    }\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate [attr.aria-busy]=\"saving()\">\n      <div class=\"field\">\n        <label for=\"category-name\">Nome</label>\n        <input\n          id=\"category-name\"\n          class=\"input\"\n          type=\"text\"\n          formControlName=\"name\"\n          maxlength=\"100\"\n          autocomplete=\"off\"\n          [attr.aria-invalid]=\"fieldError(form.controls.name) ? 'true' : null\"\n          [attr.aria-describedby]=\"fieldError(form.controls.name) ? 'category-name-error' : null\"\n        />\n        @if (fieldError(form.controls.name); as message) {\n          <p id=\"category-name-error\" class=\"field-error\">{{ message }}</p>\n        }\n        @if (isEditing()) {\n          <p class=\"hint\">O endere\u00E7o (slug) foi criado junto com a categoria e n\u00E3o muda quando voc\u00EA renomeia.</p>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label for=\"category-description\">Descri\u00E7\u00E3o (opcional)</label>\n        <input\n          id=\"category-description\"\n          class=\"input\"\n          type=\"text\"\n          formControlName=\"description\"\n          maxlength=\"500\"\n          autocomplete=\"off\"\n          [attr.aria-invalid]=\"fieldError(form.controls.description) ? 'true' : null\"\n        />\n        @if (fieldError(form.controls.description); as message) {\n          <p class=\"field-error\">{{ message }}</p>\n        }\n      </div>\n\n      <div class=\"actions\">\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"saving()\">\n          {{ saving() ? 'Salvando...' : isEditing() ? 'Salvar altera\u00E7\u00F5es' : 'Criar categoria' }}\n        </button>\n        @if (isEditing()) {\n          <button class=\"btn btn-secondary\" type=\"button\" (click)=\"cancelEdit()\">Cancelar edi\u00E7\u00E3o</button>\n        }\n      </div>\n    </form>\n  </section>\n\n  <div role=\"status\">\n    @if (announcement(); as text) {\n      <div class=\"alert alert-info\">{{ text }}</div>\n    }\n  </div>\n\n  @if (pageError(); as message) {\n    <div class=\"alert alert-error\" role=\"alert\">{{ message }}</div>\n  }\n\n  <div class=\"table-wrap\" role=\"region\" aria-label=\"Lista de categorias\" tabindex=\"0\">\n    <table class=\"table\">\n      <caption class=\"sr-only\">Categorias de servi\u00E7os</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">Nome</th>\n          <th scope=\"col\">Endere\u00E7o (slug)</th>\n          <th scope=\"col\">Descri\u00E7\u00E3o</th>\n          <th scope=\"col\">Situa\u00E7\u00E3o</th>\n          <th scope=\"col\">A\u00E7\u00F5es</th>\n        </tr>\n      </thead>\n      <tbody>\n        @for (category of items(); track category.id) {\n          <tr>\n            <th scope=\"row\" tabindex=\"-1\" [id]=\"'category-' + category.id\">{{ category.name }}</th>\n            <td><code>{{ category.slug }}</code></td>\n            <td>{{ category.description ?? '\u2014' }}</td>\n            <td>\n              <span class=\"badge\" [class.badge-ok]=\"category.active\" [class.badge-warn]=\"!category.active\">\n                {{ category.active ? 'Ativa' : 'Inativa' }}\n              </span>\n            </td>\n            <td>\n              <div class=\"row-actions\">\n                <button\n                  type=\"button\"\n                  class=\"btn btn-secondary btn-small\"\n                  [attr.aria-label]=\"'Editar ' + category.name\"\n                  (click)=\"edit(category)\"\n                >\n                  Editar\n                </button>\n                @if (category.active) {\n                  <button\n                    type=\"button\"\n                    class=\"btn btn-secondary btn-small\"\n                    [attr.aria-label]=\"'Desativar ' + category.name\"\n                    (click)=\"requestDeactivation(category)\"\n                  >\n                    Desativar\n                  </button>\n                } @else {\n                  <button\n                    type=\"button\"\n                    class=\"btn btn-secondary btn-small\"\n                    [attr.aria-label]=\"'Reativar ' + category.name\"\n                    [disabled]=\"busy()\"\n                    (click)=\"reactivate(category)\"\n                  >\n                    Reativar\n                  </button>\n                }\n              </div>\n            </td>\n          </tr>\n        }\n      </tbody>\n    </table>\n  </div>\n}\n\n<app-confirm-dialog\n  [title]=\"'Desativar ' + (pendingDeactivation()?.name ?? '') + '?'\"\n  message=\"A categoria some da p\u00E1gina inicial e do filtro de servi\u00E7os, e agricultores n\u00E3o poder\u00E3o mais pedir or\u00E7amento para este servi\u00E7o, nem a prestadores que j\u00E1 o oferecem. Os prestadores continuam com o servi\u00E7o no perfil. Voc\u00EA pode reativar a categoria depois.\"\n  confirmLabel=\"Sim, desativar\"\n  [danger]=\"true\"\n  [busy]=\"busy()\"\n  [error]=\"dialogError()\"\n  (confirmed)=\"confirmDeactivation()\"\n  (closed)=\"onDialogClosed()\"\n/>\n" }]
    }], () => [], { confirmDialog: [{ type: i0.ViewChild, args: [i0.forwardRef(() => ConfirmDialog), { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminCategoriesPage, { className: "AdminCategoriesPage", filePath: "src/app/features/admin/categories-page.ts", lineNumber: 36 }); })();
