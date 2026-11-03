import { afterNextRender } from '@angular/core';
/**
 * Depois de um envio inválido, leva o foco ao primeiro campo com erro (leitor de tela e teclado
 * agradecem). Espera a próxima renderização, quando o aria-invalid já está no HTML.
 */
export function focusFirstInvalid(injector) {
    afterNextRender(() => document.querySelector('[aria-invalid="true"]')?.focus(), { injector });
}
/** Depois da próxima renderização, leva o foco ao elemento com este id (se ele existir). */
export function focusElementAfterRender(injector, id) {
    afterNextRender(() => document.getElementById(id)?.focus(), { injector });
}
