import { Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-empty-state',
  imports: [Icon],
  template: `
    <div class="empty card">
      <span class="empty-art"><app-icon name="inbox" [size]="28" /></span>
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
      <div class="empty-actions"><ng-content /></div>
    </div>
  `,
  styles: `
    .empty {
      max-width: 36rem;
      margin-inline: auto;
      padding: 2.25rem 1.5rem;
      text-align: center;
    }
    .empty h2 { margin: 0 0 0.4rem; font-size: 1.3rem; }
    .empty p { margin: 0 auto 1.25rem; max-width: 28rem; color: var(--muted); }
    .empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
  `,
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
}
