import { Component, effect, inject, input, signal, untracked } from '@angular/core';

import { ProviderService } from '../../core/api/provider.service';
import { toApiError } from '../../core/http/api-error';
import { WhatsappLink } from '../../core/models/provider.model';
import { isWhatsappUrl } from '../../core/util/whatsapp';


@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css',
})
export class WhatsappButton {
  private readonly providerService = inject(ProviderService);

  readonly providerId = input.required<number>();
  readonly categoryId = input<number | null>(null);

  protected readonly loading = signal(false);
  protected readonly link = signal<WhatsappLink | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    // Se o serviço escolhido mudar, a mensagem pronta deixa de valer: recomeça
    effect(() => {
      this.providerId();
      this.categoryId();
      untracked(() => {
        this.link.set(null);
        this.errorMessage.set(null);
      });
    });
  }

  protected prepare(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.providerService.whatsappLink(this.providerId(), this.categoryId()).subscribe({
      next: (link) => {
        if (isWhatsappUrl(link.url)) {
          this.link.set(link);
        } else {
          this.errorMessage.set('Não foi possível gerar o link de contato. Tente novamente mais tarde.');
        }
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.errorMessage.set(toApiError(error).message);
        this.loading.set(false);
      },
    });
  }

  protected close(): void {
    this.link.set(null);
  }
}
