import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
function App_Conditional_11_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 14);
    i0.ɵɵtext(2, " Administra\u00E7\u00E3o ");
    i0.ɵɵelementEnd()();
} }
function App_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "a", 12);
    i0.ɵɵtext(2, " Minha conta ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(3, App_Conditional_11_Conditional_3_Template, 3, 0, "li");
    i0.ɵɵelementStart(4, "li")(5, "button", 13);
    i0.ɵɵlistener("click", function App_Conditional_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(6, " Sair ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.auth.role() === "ADMIN" ? 3 : -1);
} }
function App_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 15);
    i0.ɵɵtext(2, " Entrar ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "li")(4, "a", 16);
    i0.ɵɵtext(5, " Cadastre-se ");
    i0.ɵɵelementEnd()();
} }
export class App {
    auth = inject(AuthService);
    router = inject(Router);
    year = new Date().getFullYear();
    logout() {
        this.auth.logout();
        void this.router.navigateByUrl('/');
    }
    // Um link "#conteudo" com <base href="/"> levaria para a home; por isso movemos o foco à mão
    skipToContent(event) {
        event.preventDefault();
        document.getElementById('conteudo')?.focus();
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 27, vars: 4, consts: [["href", "#conteudo", 1, "skip-link", 3, "click"], [1, "site-header"], [1, "container", "header-inner"], ["routerLink", "/", "aria-label", "CampoCerto, p\u00E1gina inicial", 1, "brand"], ["aria-label", "Principal"], [1, "nav-list"], ["routerLink", "/", "routerLinkActive", "active", 1, "nav-link", 3, "routerLinkActiveOptions"], ["id", "conteudo", "tabindex", "-1"], [1, "site-footer"], [1, "container"], ["href", "mailto:contato@campocerto.example"], [1, "footer-small"], ["routerLink", "/conta", "routerLinkActive", "active", 1, "nav-link"], ["type", "button", 1, "nav-link", "nav-button", 3, "click"], ["routerLink", "/admin", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/entrar", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/cadastrar", 1, "nav-link", "nav-cta"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0);
            i0.ɵɵlistener("click", function App_Template_a_click_0_listener($event) { return ctx.skipToContent($event); });
            i0.ɵɵtext(1, "Pular para o conte\u00FAdo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "header", 1)(3, "div", 2)(4, "a", 3);
            i0.ɵɵtext(5, "\uD83C\uDF3E CampoCerto");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "nav", 4)(7, "ul", 5)(8, "li")(9, "a", 6);
            i0.ɵɵtext(10, " In\u00EDcio ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, App_Conditional_11_Template, 7, 1)(12, App_Conditional_12_Template, 6, 0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(13, "main", 7);
            i0.ɵɵelement(14, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "footer", 8)(16, "div", 9)(17, "p")(18, "strong");
            i0.ɵɵtext(19, "CampoCerto");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(20, ": encontre prestadores de servi\u00E7os rurais na sua regi\u00E3o.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p");
            i0.ɵɵtext(22, "Contato: ");
            i0.ɵɵelementStart(23, "a", 10);
            i0.ɵɵtext(24, "contato@campocerto.example");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "p", 11);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(3, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.auth.isLoggedIn() ? 11 : 12);
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate1("\u00A9 ", ctx.year, " CampoCerto. Projeto de portf\u00F3lio.");
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive], styles: ["[_nghost-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100vh;\r\n}\r\n\r\nmain[_ngcontent-%COMP%] { flex: 1; }\r\nmain[_ngcontent-%COMP%]:focus { outline: none; }\r\n\r\n.site-header[_ngcontent-%COMP%] { background: var(--%NS%green-800); color: #fff; }\r\n\r\n.header-inner[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 0.5rem 1.5rem;\r\n  padding-block: 0.6rem;\r\n}\r\n\r\n.brand[_ngcontent-%COMP%] { color: #fff; font-size: 1.4rem; font-weight: 800; text-decoration: none; }\r\n\r\n.nav-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  gap: 0.25rem 0.75rem;\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  min-height: 2.75rem;\r\n  padding: 0 0.75rem;\r\n  border: 2px solid transparent;\r\n  border-radius: 8px;\r\n  background: none;\r\n  color: #fff;\r\n  font: inherit;\r\n  font-weight: 600;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%]:hover { background: rgb(255 255 255 / 0.15); }\r\n.nav-link.active[_ngcontent-%COMP%] { text-decoration: underline; text-underline-offset: 6px; }\r\n.nav-button[_ngcontent-%COMP%] { border-color: rgb(255 255 255 / 0.7); }\r\n.nav-cta[_ngcontent-%COMP%] { background: #fff; color: var(--%NS%green-900); }\r\n.nav-cta[_ngcontent-%COMP%]:hover { background: var(--%NS%green-100); }\r\n\r\n.site-header[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:focus-visible { outline-color: #fff; }\r\n\r\n.site-footer[_ngcontent-%COMP%] {\r\n  margin-top: 3rem;\r\n  padding-block: 1.5rem;\r\n  background: var(--%NS%green-900);\r\n  color: #e6efe4;\r\n}\r\n\r\n.site-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 0 0.4rem; }\r\n.site-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { color: #fff; }\r\n.footer-small[_ngcontent-%COMP%] { font-size: 0.9rem; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', imports: [RouterOutlet, RouterLink, RouterLinkActive], template: "<a class=\"skip-link\" href=\"#conteudo\" (click)=\"skipToContent($event)\">Pular para o conte\u00FAdo</a>\r\n\r\n<header class=\"site-header\">\r\n  <div class=\"container header-inner\">\r\n    <a class=\"brand\" routerLink=\"/\" aria-label=\"CampoCerto, p\u00E1gina inicial\">\uD83C\uDF3E CampoCerto</a>\r\n\r\n    <nav aria-label=\"Principal\">\r\n      <ul class=\"nav-list\">\r\n        <li>\r\n          <a class=\"nav-link\" routerLink=\"/\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\">\r\n            In\u00EDcio\r\n          </a>\r\n        </li>\r\n\r\n\r\n        @if (auth.isLoggedIn()) {\r\n          <li>\r\n            <a class=\"nav-link\" routerLink=\"/conta\" routerLinkActive=\"active\">\r\n              Minha conta\r\n            </a>\r\n          </li>\r\n\r\n          @if (auth.role() === 'ADMIN') {\r\n            <li>\r\n              <a class=\"nav-link\" routerLink=\"/admin\" routerLinkActive=\"active\">\r\n                Administra\u00E7\u00E3o\r\n              </a>\r\n            </li>\r\n          }\r\n\r\n          <li>\r\n            <button\r\n              type=\"button\"\r\n              class=\"nav-link nav-button\"\r\n              (click)=\"logout()\">\r\n              Sair\r\n            </button>\r\n          </li>\r\n        } @else {\r\n          <li>\r\n            <a class=\"nav-link\" routerLink=\"/entrar\" routerLinkActive=\"active\">\r\n              Entrar\r\n            </a>\r\n          </li>\r\n\r\n          <li>\r\n            <a class=\"nav-link nav-cta\" routerLink=\"/cadastrar\">\r\n              Cadastre-se\r\n            </a>\r\n          </li>\r\n        }\r\n      </ul>\r\n    </nav>\r\n  </div>\r\n</header>\r\n\r\n<main id=\"conteudo\" tabindex=\"-1\">\r\n  <router-outlet />\r\n</main>\r\n\r\n<footer class=\"site-footer\">\r\n  <div class=\"container\">\r\n    <p><strong>CampoCerto</strong>: encontre prestadores de servi\u00E7os rurais na sua regi\u00E3o.</p>\r\n    <p>Contato: <a href=\"mailto:contato@campocerto.example\">contato@campocerto.example</a></p>\r\n    <p class=\"footer-small\">\u00A9 {{ year }} CampoCerto. Projeto de portf\u00F3lio.</p>\r\n  </div>\r\n</footer>\r\n", styles: [":host {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100vh;\r\n}\r\n\r\nmain { flex: 1; }\r\nmain:focus { outline: none; }\r\n\r\n.site-header { background: var(--green-800); color: #fff; }\r\n\r\n.header-inner {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 0.5rem 1.5rem;\r\n  padding-block: 0.6rem;\r\n}\r\n\r\n.brand { color: #fff; font-size: 1.4rem; font-weight: 800; text-decoration: none; }\r\n\r\n.nav-list {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  gap: 0.25rem 0.75rem;\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\n.nav-link {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  min-height: 2.75rem;\r\n  padding: 0 0.75rem;\r\n  border: 2px solid transparent;\r\n  border-radius: 8px;\r\n  background: none;\r\n  color: #fff;\r\n  font: inherit;\r\n  font-weight: 600;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.nav-link:hover { background: rgb(255 255 255 / 0.15); }\r\n.nav-link.active { text-decoration: underline; text-underline-offset: 6px; }\r\n.nav-button { border-color: rgb(255 255 255 / 0.7); }\r\n.nav-cta { background: #fff; color: var(--green-900); }\r\n.nav-cta:hover { background: var(--green-100); }\r\n\r\n.site-header :focus-visible { outline-color: #fff; }\r\n\r\n.site-footer {\r\n  margin-top: 3rem;\r\n  padding-block: 1.5rem;\r\n  background: var(--green-900);\r\n  color: #e6efe4;\r\n}\r\n\r\n.site-footer p { margin: 0 0 0.4rem; }\r\n.site-footer a { color: #fff; }\r\n.footer-small { font-size: 0.9rem; }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 12 }); })();
