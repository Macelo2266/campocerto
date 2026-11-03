import { Component, computed, input } from '@angular/core';

import { formatRating, pluralize } from '../../core/util/format';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.css',
})
export class RatingStars {
  /** Média (0 a 5). null = ainda sem avaliações. */
  readonly average = input<number | null>(null);
  readonly count = input(0);
  readonly compact = input(false);

  protected readonly stars = [1, 2, 3, 4, 5];

  protected readonly hasRating = computed(
    () => this.average() !== null && (this.compact() || this.count() > 0),
  );
  protected readonly filled = computed(() => Math.round(this.average() ?? 0));
  protected readonly averageText = computed(() => formatRating(this.average() ?? 0));
  protected readonly countText = computed(
    () => `${this.count()} ${pluralize(this.count(), 'avaliação', 'avaliações')}`,
  );
}
