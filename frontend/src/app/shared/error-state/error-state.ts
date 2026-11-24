import { Component, input, output } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-error-state',
  imports: [Icon],
  template: `
    <div class="alert alert-error error" role="alert">
      <app-icon name="alert-circle" [size]="22" />
      <div>
        <p>{{ message() }}</p>
        <button type="button" class="btn btn-secondary btn-small" (click)="retry.emit()">Tentar de novo</button>
      </div>
    </div>
  `,
  styles: `
    .error { display: flex; gap: 0.75rem; align-items: flex-start; }
    .error app-icon { margin-top: 0.1rem; }
    p { margin: 0 0 0.75rem; }
  `,
})
export class ErrorState {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
