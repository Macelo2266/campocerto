import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
export class AdminShell {
    static ɵfac = function AdminShell_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminShell)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminShell, selectors: [["app-admin-shell"]], decls: 21, vars: 2, consts: [[1, "container", "page-section"], ["aria-label", "Se\u00E7\u00F5es da administra\u00E7\u00E3o", 1, "admin-nav"], ["routerLink", "/admin", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 3, "routerLinkActiveOptions"], ["routerLink", "/admin/usuarios", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], ["routerLink", "/admin/avaliacoes", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], ["routerLink", "/admin/solicitacoes", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], ["routerLink", "/admin/categorias", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"]], template: function AdminShell_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h1");
            i0.ɵɵtext(2, "Administra\u00E7\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "nav", 1)(4, "ul")(5, "li")(6, "a", 2);
            i0.ɵɵtext(7, " Resumo ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "li")(9, "a", 3);
            i0.ɵɵtext(10, "Usu\u00E1rios");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "li")(12, "a", 4);
            i0.ɵɵtext(13, "Avalia\u00E7\u00F5es");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "li")(15, "a", 5);
            i0.ɵɵtext(16, "Solicita\u00E7\u00F5es");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "li")(18, "a", 6);
            i0.ɵɵtext(19, "Categorias");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(20, "router-outlet");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(1, _c0));
        } }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet], styles: ["ul[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin: 0 0 1.5rem;\n  padding: 0;\n  list-style: none;\n}\n\na[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 2.75rem;\n  padding: 0 1rem;\n  border: 2px solid var(--%NS%border);\n  border-radius: 999px;\n  background: var(--%NS%surface);\n  color: var(--%NS%green-900);\n  font-weight: 700;\n  text-decoration: none;\n}\n\na[_ngcontent-%COMP%]:hover { background: var(--%NS%green-100); }\na.active[_ngcontent-%COMP%] { background: var(--%NS%green-700); border-color: var(--%NS%green-700); color: #fff; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminShell, [{
        type: Component,
        args: [{ selector: 'app-admin-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], template: "<div class=\"container page-section\">\n  <h1>Administra\u00E7\u00E3o</h1>\n\n  <nav class=\"admin-nav\" aria-label=\"Se\u00E7\u00F5es da administra\u00E7\u00E3o\">\n    <ul>\n      <li>\n        <a routerLink=\"/admin\" routerLinkActive=\"active\" ariaCurrentWhenActive=\"page\" [routerLinkActiveOptions]=\"{ exact: true }\">\n          Resumo\n        </a>\n      </li>\n      <li><a routerLink=\"/admin/usuarios\" routerLinkActive=\"active\" ariaCurrentWhenActive=\"page\">Usu\u00E1rios</a></li>\n      <li><a routerLink=\"/admin/avaliacoes\" routerLinkActive=\"active\" ariaCurrentWhenActive=\"page\">Avalia\u00E7\u00F5es</a></li>\n      <li><a routerLink=\"/admin/solicitacoes\" routerLinkActive=\"active\" ariaCurrentWhenActive=\"page\">Solicita\u00E7\u00F5es</a></li>\n      <li><a routerLink=\"/admin/categorias\" routerLinkActive=\"active\" ariaCurrentWhenActive=\"page\">Categorias</a></li>\n    </ul>\n  </nav>\n\n  <router-outlet />\n</div>\n", styles: ["ul {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin: 0 0 1.5rem;\n  padding: 0;\n  list-style: none;\n}\n\na {\n  display: inline-flex;\n  align-items: center;\n  min-height: 2.75rem;\n  padding: 0 1rem;\n  border: 2px solid var(--border);\n  border-radius: 999px;\n  background: var(--surface);\n  color: var(--green-900);\n  font-weight: 700;\n  text-decoration: none;\n}\n\na:hover { background: var(--green-100); }\na.active { background: var(--green-700); border-color: var(--green-700); color: #fff; }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminShell, { className: "AdminShell", filePath: "src/app/features/admin/admin-shell.ts", lineNumber: 10 }); })();
