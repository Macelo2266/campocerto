import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProviderSummary } from '../../core/models/provider.model';
import { Avatar } from '../avatar/avatar';
import { Icon } from '../icon/icon';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-provider-card',
  imports: [RouterLink, RatingStars, Avatar, Icon],
  templateUrl: './provider-card.html',
})
export class ProviderCard {
  readonly provider = input.required<ProviderSummary>();
}
