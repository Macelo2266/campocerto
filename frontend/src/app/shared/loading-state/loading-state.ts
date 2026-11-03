import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="loading" role="status">
      <span class="spinner" aria-hidden="true"></span>
      <span>{{ message() }}</span>
    </div>
  `,
  styles: `
    .loading {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 2rem 0;
      color: var(--muted);
      font-weight: 600;
    }
    .spinner {
      width: 1.6rem;
      height: 1.6rem;
      border: 3px solid var(--green-100);
      border-top-color: var(--green-700);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class LoadingState {
  readonly message = input('Carregando...');
}
