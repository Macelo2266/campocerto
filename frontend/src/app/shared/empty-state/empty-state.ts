import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty card">
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
      <ng-content />
    </div>
  `,
  styles: `
    .empty { text-align: center; padding: 2rem 1.25rem; }
    .empty h2 { margin-top: 0; }
  `,
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
}
