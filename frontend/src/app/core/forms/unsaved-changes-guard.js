/** Pergunta antes de sair de uma tela cujo formulário tem alterações não salvas. */
export const unsavedChangesGuard = (component) => !component.hasUnsavedChanges() ||
    confirm('Você tem alterações que ainda não foram salvas. Deseja sair mesmo assim?');
