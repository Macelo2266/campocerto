import { Component, ElementRef, input, output, viewChild } from '@angular/core';

let nextDialogId = 0;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly confirmLabel = input('Confirmar');
  readonly cancelLabel = input('Voltar');
  /** Ação destrutiva: o botão de confirmar fica vermelho. */
  readonly danger = input(false);
  /** Requisição em andamento: bloqueia os botões e o Esc. */
  readonly busy = input(false);
  /** Erro da requisição, mostrado dentro do diálogo. */
  readonly error = input<string | null>(null);

  readonly confirmed = output<void>();
  /** Disparado sempre que o diálogo fecha (Esc, "Voltar" ou fechado por código). */
  readonly closed = output<void>();

  // Cada diálogo tem ids próprios: o aria-labelledby não pode apontar para o diálogo errado
  private readonly uid = nextDialogId++;
  protected readonly titleId = `confirm-title-${this.uid}`;
  protected readonly messageId = `confirm-message-${this.uid}`;

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    const element = this.dialog().nativeElement;
    // showModal() lança um erro se o diálogo já estiver aberto
    if (!element.open) {
      element.showModal();
    }
  }

  close(): void {
    const element = this.dialog().nativeElement;
    if (element.open) {
      element.close();
    }
  }

  // Esc dispara o evento "cancel": enquanto há requisição em andamento, não deixamos fechar
  protected onCancel(event: Event): void {
    if (this.busy()) {
      event.preventDefault();
    }
  }
}
