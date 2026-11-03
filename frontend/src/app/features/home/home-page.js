import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../core/api/category.service';
import { ProviderService } from '../../core/api/provider.service';
import { AuthService } from '../../core/auth/auth.service';
import { loadResource } from '../../core/http/load-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { ProviderCard } from '../../shared/provider-card/provider-card';
import { categoryIcon } from '../../../../../../../Users/Macelo Araujo/Downloads/campocerto-frontend-corrigido/frontend/src/app/shared/category-icon';
import { toQueryParams } from '../providers/search-query';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = a0 => ({ category: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function HomePage_Conditional_20_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", name_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(name_r1);
} }
function HomePage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, HomePage_Conditional_20_For_1_Template, 2, 2, "option", 25, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cityList_r2 = i0.ɵɵreadContextLet(1);
    i0.ɵɵrepeater(cityList_r2.data);
} }
function HomePage_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 13);
} }
function HomePage_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 26);
    i0.ɵɵlistener("retry", function HomePage_Conditional_27_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.categories.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const categoryList_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵproperty("message", categoryList_r5.error.message);
} }
function HomePage_Conditional_28_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 27)(2, "span", 28);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const category_r6 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(3, _c0, category_r6.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.icon(category_r6.slug));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(category_r6.name);
} }
function HomePage_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 15);
    i0.ɵɵrepeaterCreate(1, HomePage_Conditional_28_For_2_Template, 6, 5, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const categoryList_r5 = i0.ɵɵreadContextLet(0);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(categoryList_r5.data);
} }
function HomePage_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-state", 18);
} }
function HomePage_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 26);
    i0.ɵɵlistener("retry", function HomePage_Conditional_33_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.featured.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const featuredList_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵproperty("message", featuredList_r8.error.message);
} }
function HomePage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1, "Ainda n\u00E3o h\u00E1 profissionais cadastrados na plataforma.");
    i0.ɵɵelementEnd();
} }
function HomePage_Conditional_35_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelement(1, "app-provider-card", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const provider_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("provider", provider_r9);
} }
function HomePage_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 29);
    i0.ɵɵrepeaterCreate(1, HomePage_Conditional_35_For_2_Template, 2, 1, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 30)(4, "a", 31);
    i0.ɵɵtext(5, "Ver todos os profissionais");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const featuredList_r8 = i0.ɵɵreadContextLet(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(featuredList_r8.data.content);
} }
function HomePage_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 24)(1, "div", 33)(2, "h2");
    i0.ɵɵtext(3, "Voc\u00EA presta servi\u00E7os no campo?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Crie o seu perfil e seja encontrado por agricultores da sua regi\u00E3o.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 34);
    i0.ɵɵtext(7, "Cadastrar como prestador");
    i0.ɵɵelementEnd()()();
} }
export class HomePage {
    auth = inject(AuthService);
    router = inject(Router);
    fb = inject(NonNullableFormBuilder);
    categoryService = inject(CategoryService);
    providerService = inject(ProviderService);
    categories = loadResource(() => null, () => this.categoryService.list());
    cities = loadResource(() => null, () => this.providerService.cities());
    featured = loadResource(() => null, () => this.providerService.search({ q: '', category: null, city: '', sort: 'RATING', page: 1, size: 3 }));
    icon = categoryIcon;
    form = this.fb.group({
        q: [''],
        city: [''],
    });
    search() {
        const { q, city } = this.form.getRawValue();
        void this.router.navigate(['/profissionais'], {
            queryParams: toQueryParams({ q, category: '', city, sort: 'RATING' }),
        });
    }
    static ɵfac = function HomePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomePage, selectors: [["app-home-page"]], decls: 65, vars: 8, consts: [[1, "hero"], [1, "container"], [1, "lead"], ["role", "search", "aria-label", "Buscar profissionais", 1, "search-box", "card", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "home-q"], ["id", "home-q", "type", "search", "formControlName", "q", "maxlength", "100", "autocomplete", "off", "placeholder", "Ex.: cerca, ro\u00E7agem, trator", 1, "input"], ["for", "home-city"], ["id", "home-city", "formControlName", "city", 1, "input"], ["value", ""], ["type", "submit", 1, "btn", "btn-primary"], ["aria-labelledby", "services-title", 1, "container", "section"], ["id", "services-title"], ["message", "Carregando servi\u00E7os..."], [3, "message"], [1, "category-grid"], ["aria-labelledby", "featured-title", 1, "container", "section"], ["id", "featured-title"], ["message", "Carregando profissionais..."], [1, "muted"], ["aria-labelledby", "how-title", 1, "container", "section"], ["id", "how-title"], [1, "steps"], ["aria-hidden", "true", 1, "step-number"], [1, "container", "section"], [3, "value"], [3, "retry", "message"], ["routerLink", "/profissionais", 1, "category-card", 3, "queryParams"], ["aria-hidden", "true", 1, "category-icon"], [1, "provider-grid"], [1, "see-all"], ["routerLink", "/profissionais", 1, "btn", "btn-secondary"], [3, "provider"], [1, "cta-band"], ["routerLink", "/cadastrar", 1, "btn", "btn-primary"]], template: function HomePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdeclareLet(0)(1)(2);
            i0.ɵɵelementStart(3, "section", 0)(4, "div", 1)(5, "h1");
            i0.ɵɵtext(6, "Servi\u00E7os rurais, de gente da sua regi\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 2);
            i0.ɵɵtext(8, " Encontre quem faz cerca, ro\u00E7agem, plantio, bomba d'\u00E1gua e muito mais, pertinho da sua propriedade. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "form", 3);
            i0.ɵɵlistener("ngSubmit", function HomePage_Template_form_ngSubmit_9_listener() { return ctx.search(); });
            i0.ɵɵelementStart(10, "div", 4)(11, "label", 5);
            i0.ɵɵtext(12, "O que voc\u00EA precisa?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 4)(15, "label", 7);
            i0.ɵɵtext(16, "Cidade");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "select", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(18, "option", 9);
            i0.ɵɵtext(19, "Todas as cidades");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(20, HomePage_Conditional_20_Template, 2, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "button", 10);
            i0.ɵɵtext(22, "Encontrar profissionais");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(23, "section", 11)(24, "h2", 12);
            i0.ɵɵtext(25, "Escolha um servi\u00E7o");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(26, HomePage_Conditional_26_Template, 1, 0, "app-loading-state", 13)(27, HomePage_Conditional_27_Template, 1, 1, "app-error-state", 14)(28, HomePage_Conditional_28_Template, 3, 0, "ul", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "section", 16)(30, "h2", 17);
            i0.ɵɵtext(31, "Profissionais em destaque");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(32, HomePage_Conditional_32_Template, 1, 0, "app-loading-state", 18)(33, HomePage_Conditional_33_Template, 1, 1, "app-error-state", 14)(34, HomePage_Conditional_34_Template, 2, 0, "p", 19)(35, HomePage_Conditional_35_Template, 6, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "section", 20)(37, "h2", 21);
            i0.ɵɵtext(38, "Como funciona");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "ol", 22)(40, "li")(41, "span", 23);
            i0.ɵɵtext(42, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div")(44, "h3");
            i0.ɵɵtext(45, "Procure");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "p");
            i0.ɵɵtext(47, "Escolha o servi\u00E7o e a cidade para ver quem trabalha na sua regi\u00E3o.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "li")(49, "span", 23);
            i0.ɵɵtext(50, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "div")(52, "h3");
            i0.ɵɵtext(53, "Pe\u00E7a um or\u00E7amento");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "p");
            i0.ɵɵtext(55, "Conte o que precisa ser feito e converse com o profissional.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(56, "li")(57, "span", 23);
            i0.ɵɵtext(58, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div")(60, "h3");
            i0.ɵɵtext(61, "Combine e avalie");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "p");
            i0.ɵɵtext(63, "Depois do servi\u00E7o, conte como foi e ajude outros agricultores a escolher.");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵconditionalCreate(64, HomePage_Conditional_64_Template, 8, 0, "section", 24);
        } if (rf & 2) {
            const categoryList_r10 = i0.ɵɵstoreLet(ctx.categories.state());
            i0.ɵɵadvance();
            const cityList_r11 = i0.ɵɵstoreLet(ctx.cities.state());
            i0.ɵɵadvance();
            const featuredList_r12 = i0.ɵɵstoreLet(ctx.featured.state());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(cityList_r11.status === "ready" ? 20 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(categoryList_r10.status === "loading" ? 26 : categoryList_r10.status === "error" ? 27 : 28);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(featuredList_r12.status === "loading" ? 32 : featuredList_r12.status === "error" ? 33 : featuredList_r12.data.content.length === 0 ? 34 : 35);
            i0.ɵɵadvance(32);
            i0.ɵɵconditional(!ctx.auth.isLoggedIn() ? 64 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, ProviderCard, LoadingState, ErrorState], styles: [".hero[_ngcontent-%COMP%] {\n  padding: 2.5rem 0 2rem;\n  background: linear-gradient(180deg, var(--%NS%green-100), var(--%NS%bg));\n}\n\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 22ch;\n  margin-bottom: 1rem;\n  font-size: clamp(1.8rem, 5vw, 2.8rem);\n}\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 40rem;\n  margin: 0 0 1.5rem;\n  font-size: 1.2rem;\n  color: var(--%NS%muted);\n}\n\n.search-box[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0 1rem;\n  align-items: end;\n  grid-template-columns: 2fr 1fr auto;\n}\n\n.search-box[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] { margin-bottom: 1.15rem; }\n\n@media (max-width: 45rem) {\n  .search-box[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .search-box[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] { margin-bottom: 0; }\n}\n\n.section[_ngcontent-%COMP%] { padding-block: 1.5rem; }\n\n.category-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));\n}\n\n.category-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 4rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--%NS%border);\n  border-radius: var(--%NS%radius);\n  background: var(--%NS%surface);\n  color: var(--%NS%green-900);\n  font-weight: 700;\n  text-decoration: none;\n}\n\n.category-card[_ngcontent-%COMP%]:hover { background: var(--%NS%green-50); border-color: var(--%NS%green-700); }\n.category-icon[_ngcontent-%COMP%] { font-size: 1.7rem; }\n\n.see-all[_ngcontent-%COMP%] { margin-top: 1.25rem; }\n\n.steps[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n}\n\n.steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { display: flex; gap: 0.9rem; }\n.steps[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 0.25rem; }\n.steps[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; }\n\n.step-number[_ngcontent-%COMP%] {\n  flex: none;\n  display: grid;\n  place-items: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background: var(--%NS%green-700);\n  color: #fff;\n  font-weight: 800;\n}\n\n.cta-band[_ngcontent-%COMP%] {\n  padding: 1.75rem 1.5rem;\n  border-radius: var(--%NS%radius);\n  background: var(--%NS%green-100);\n  text-align: center;\n}\n\n.cta-band[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin-top: 0; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePage, [{
        type: Component,
        args: [{ selector: 'app-home-page', imports: [ReactiveFormsModule, RouterLink, ProviderCard, LoadingState, ErrorState], template: "@let categoryList = categories.state();\n@let cityList = cities.state();\n@let featuredList = featured.state();\n\n<section class=\"hero\">\n  <div class=\"container\">\n    <h1>Servi\u00E7os rurais, de gente da sua regi\u00E3o</h1>\n    <p class=\"lead\">\n      Encontre quem faz cerca, ro\u00E7agem, plantio, bomba d'\u00E1gua e muito mais, pertinho da sua propriedade.\n    </p>\n\n    <form class=\"search-box card\" [formGroup]=\"form\" (ngSubmit)=\"search()\" role=\"search\" aria-label=\"Buscar profissionais\">\n      <div class=\"field\">\n        <label for=\"home-q\">O que voc\u00EA precisa?</label>\n        <input\n          id=\"home-q\"\n          class=\"input\"\n          type=\"search\"\n          formControlName=\"q\"\n          maxlength=\"100\"\n          autocomplete=\"off\"\n          placeholder=\"Ex.: cerca, ro\u00E7agem, trator\"\n        />\n      </div>\n\n      <div class=\"field\">\n        <label for=\"home-city\">Cidade</label>\n        <select id=\"home-city\" class=\"input\" formControlName=\"city\">\n          <option value=\"\">Todas as cidades</option>\n          @if (cityList.status === 'ready') {\n            @for (name of cityList.data; track name) {\n              <option [value]=\"name\">{{ name }}</option>\n            }\n          }\n        </select>\n      </div>\n\n      <button class=\"btn btn-primary\" type=\"submit\">Encontrar profissionais</button>\n    </form>\n  </div>\n</section>\n\n<section class=\"container section\" aria-labelledby=\"services-title\">\n  <h2 id=\"services-title\">Escolha um servi\u00E7o</h2>\n\n  @if (categoryList.status === 'loading') {\n    <app-loading-state message=\"Carregando servi\u00E7os...\" />\n  } @else if (categoryList.status === 'error') {\n    <app-error-state [message]=\"categoryList.error.message\" (retry)=\"categories.reload()\" />\n  } @else {\n    <ul class=\"category-grid\">\n      @for (category of categoryList.data; track category.id) {\n        <li>\n          <a class=\"category-card\" routerLink=\"/profissionais\" [queryParams]=\"{ category: category.id }\">\n            <span class=\"category-icon\" aria-hidden=\"true\">{{ icon(category.slug) }}</span>\n            <span>{{ category.name }}</span>\n          </a>\n        </li>\n      }\n    </ul>\n  }\n</section>\n\n<section class=\"container section\" aria-labelledby=\"featured-title\">\n  <h2 id=\"featured-title\">Profissionais em destaque</h2>\n\n  @if (featuredList.status === 'loading') {\n    <app-loading-state message=\"Carregando profissionais...\" />\n  } @else if (featuredList.status === 'error') {\n    <app-error-state [message]=\"featuredList.error.message\" (retry)=\"featured.reload()\" />\n  } @else if (featuredList.data.content.length === 0) {\n    <p class=\"muted\">Ainda n\u00E3o h\u00E1 profissionais cadastrados na plataforma.</p>\n  } @else {\n    <ul class=\"provider-grid\">\n      @for (provider of featuredList.data.content; track provider.id) {\n        <li><app-provider-card [provider]=\"provider\" /></li>\n      }\n    </ul>\n    <p class=\"see-all\"><a class=\"btn btn-secondary\" routerLink=\"/profissionais\">Ver todos os profissionais</a></p>\n  }\n</section>\n\n<section class=\"container section\" aria-labelledby=\"how-title\">\n  <h2 id=\"how-title\">Como funciona</h2>\n  <ol class=\"steps\">\n    <li>\n      <span class=\"step-number\" aria-hidden=\"true\">1</span>\n      <div>\n        <h3>Procure</h3>\n        <p>Escolha o servi\u00E7o e a cidade para ver quem trabalha na sua regi\u00E3o.</p>\n      </div>\n    </li>\n    <li>\n      <span class=\"step-number\" aria-hidden=\"true\">2</span>\n      <div>\n        <h3>Pe\u00E7a um or\u00E7amento</h3>\n        <p>Conte o que precisa ser feito e converse com o profissional.</p>\n      </div>\n    </li>\n    <li>\n      <span class=\"step-number\" aria-hidden=\"true\">3</span>\n      <div>\n        <h3>Combine e avalie</h3>\n        <p>Depois do servi\u00E7o, conte como foi e ajude outros agricultores a escolher.</p>\n      </div>\n    </li>\n  </ol>\n</section>\n\n@if (!auth.isLoggedIn()) {\n  <section class=\"container section\">\n    <div class=\"cta-band\">\n      <h2>Voc\u00EA presta servi\u00E7os no campo?</h2>\n      <p>Crie o seu perfil e seja encontrado por agricultores da sua regi\u00E3o.</p>\n      <a class=\"btn btn-primary\" routerLink=\"/cadastrar\">Cadastrar como prestador</a>\n    </div>\n  </section>\n}\n", styles: [".hero {\n  padding: 2.5rem 0 2rem;\n  background: linear-gradient(180deg, var(--green-100), var(--bg));\n}\n\n.hero h1 {\n  max-width: 22ch;\n  margin-bottom: 1rem;\n  font-size: clamp(1.8rem, 5vw, 2.8rem);\n}\n\n.lead {\n  max-width: 40rem;\n  margin: 0 0 1.5rem;\n  font-size: 1.2rem;\n  color: var(--muted);\n}\n\n.search-box {\n  display: grid;\n  gap: 0 1rem;\n  align-items: end;\n  grid-template-columns: 2fr 1fr auto;\n}\n\n.search-box .btn { margin-bottom: 1.15rem; }\n\n@media (max-width: 45rem) {\n  .search-box { grid-template-columns: 1fr; }\n  .search-box .btn { margin-bottom: 0; }\n}\n\n.section { padding-block: 1.5rem; }\n\n.category-grid {\n  display: grid;\n  gap: 0.75rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));\n}\n\n.category-card {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 4rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  background: var(--surface);\n  color: var(--green-900);\n  font-weight: 700;\n  text-decoration: none;\n}\n\n.category-card:hover { background: var(--green-50); border-color: var(--green-700); }\n.category-icon { font-size: 1.7rem; }\n\n.see-all { margin-top: 1.25rem; }\n\n.steps {\n  display: grid;\n  gap: 1rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n}\n\n.steps li { display: flex; gap: 0.9rem; }\n.steps h3 { margin: 0 0 0.25rem; }\n.steps p { margin: 0; }\n\n.step-number {\n  flex: none;\n  display: grid;\n  place-items: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background: var(--green-700);\n  color: #fff;\n  font-weight: 800;\n}\n\n.cta-band {\n  padding: 1.75rem 1.5rem;\n  border-radius: var(--radius);\n  background: var(--green-100);\n  text-align: center;\n}\n\n.cta-band h2 { margin-top: 0; }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomePage, { className: "HomePage", filePath: "src/app/features/home/home-page.ts", lineNumber: 21 }); })();
