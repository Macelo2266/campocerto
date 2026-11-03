import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProviderService } from '../../core/api/provider.service';
import { toApiError } from '../../core/http/api-error';
import { Review } from '../../core/models/provider.model';
import { formatDate } from '../../core/util/format';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';

const REVIEWS_PAGE_SIZE = 5;

@Component({
  selector: 'app-reviews-section',
  imports: [RatingStars, LoadingState],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.css',
})
export class ReviewsSection {
  private readonly providerService = inject(ProviderService);

  readonly providerId = input.required<number>();

  protected readonly reviews = signal<Review[]>([]);
  protected readonly loadedPages = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly hasMore = computed(() => this.loadedPages() < this.totalPages());
  protected readonly formatDate = formatDate;

  private subscription?: Subscription;

  constructor() {
    // Se a tela passar a mostrar outro prestador, recomeça do zero
    effect(() => {
      const id = this.providerId();
      untracked(() => this.restart(id));
    });

    inject(DestroyRef).onDestroy(() => this.subscription?.unsubscribe());
  }

  /** Carrega a próxima página (também serve de "tentar de novo" depois de um erro). */
  protected loadMore(): void {
    this.fetch(this.providerId(), this.loadedPages());
  }

  private restart(id: number): void {
    this.reviews.set([]);
    this.loadedPages.set(0);
    this.totalPages.set(0);
    this.fetch(id, 0);
  }

  private fetch(id: number, page: number): void {
    this.subscription?.unsubscribe();
    this.loading.set(true);
    this.errorMessage.set(null);

    this.subscription = this.providerService.reviews(id, page, REVIEWS_PAGE_SIZE).subscribe({
      next: (result) => {
        // Se chegou avaliação nova entre duas páginas, a lista "desloca": evitamos duplicar
        this.reviews.update((list) => {
          const known = new Set(list.map((review) => review.id));
          return [...list, ...result.content.filter((review) => !known.has(review.id))];
        });
        this.loadedPages.set(page + 1);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.errorMessage.set(toApiError(error).message);
        this.loading.set(false);
      },
    });
  }
}
