import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { throwError } from 'rxjs';

import { ProviderService } from '../../core/api/provider.service';
import { loadResource } from '../../core/http/load-state';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { ProviderContact } from './provider-contact';
import { ReviewsSection } from './reviews-section';
import { parsePositiveInt } from './search-query';

@Component({
  selector: 'app-provider-profile-page',
  imports: [RouterLink, RatingStars, LoadingState, EmptyState, ErrorState, ReviewsSection, ProviderContact],
  templateUrl: './provider-profile-page.html',
  styleUrl: './provider-profile-page.css',
})
export class ProviderProfilePage {
  private readonly providerService = inject(ProviderService);
  private readonly title = inject(Title);

  // Vem do :id da rota (withComponentInputBinding)
  readonly id = input.required<string>();

  private readonly providerId = computed(() => parsePositiveInt(this.id()));

  protected readonly profile = loadResource(
    () => this.providerId(),
    (id) =>
      id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 })) // /profissionais/abc: mesmo caminho do "não existe"
        : this.providerService.get(id),
  );

  constructor() {
    // O título da aba passa a ser o nome do profissional (também é o que o leitor de tela anuncia)
    effect(() => {
      const state = this.profile.state();
      if (state.status === 'ready') {
        this.title.setTitle(`${state.data.professionalName} | CampoCerto`);
      }
    });
  }
}
