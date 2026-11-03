import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  template: `
    <div class="alert alert-error" role="alert">
      <p>{{ message() }}</p>
      <button type="button" class="btn btn-secondary" (click)="retry.emit()">Tentar de novo</button>
    </div>
  `,
  styles: `
    p { margin: 0 0 0.75rem; }
  `,
})
export class ErrorState {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
