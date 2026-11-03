import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { ProviderPublic } from '../../core/models/provider.model';
import { WhatsappButton } from '../../shared/whatsapp-button/whatsapp-button';
import { parsePositiveInt } from './search-query';

@Component({
  selector: 'app-provider-contact',
  imports: [RouterLink, WhatsappButton],
  templateUrl: './provider-contact.html',
})
export class ProviderContact {
  protected readonly auth = inject(AuthService);

  readonly provider = input.required<ProviderPublic>();

  protected readonly selectedService = signal<number | null>(null);
  protected readonly returnUrl = computed(() => `/profissionais/${this.provider().id}`);

  protected selectService(value: string): void {
    this.selectedService.set(parsePositiveInt(value));
  }
}
