import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

/** Pergunta antes de sair de uma tela cujo formulário tem alterações não salvas. */
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  !component.hasUnsavedChanges() ||
  confirm('Você tem alterações que ainda não foram salvas. Deseja sair mesmo assim?');
