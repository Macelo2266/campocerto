import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProviderSummary } from '../../core/models/provider.model';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-provider-card',
  imports: [RouterLink, RatingStars],
  templateUrl: './provider-card.html',
  styleUrl: './provider-card.css',
})
export class ProviderCard {
  readonly provider = input.required<ProviderSummary>();
}
