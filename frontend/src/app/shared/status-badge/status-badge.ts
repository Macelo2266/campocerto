import { Component, computed, input } from '@angular/core';

import { STATUS_LABELS, ServiceRequestStatus } from '../../core/models/service-request.model';

@Component({
  selector: 'app-status-badge',
  template: `<span class="status" [attr.data-status]="status()">{{ label() }}</span>`,
  styles: `
    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.2rem 0.8rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 700;
      line-height: 1.5;
      background: #ececec;
      color: #2b2b2b;
    }
    .status::before {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.7;
    }
    [data-status='PENDENTE'] { background: #fcf1d4; color: #5c3b00; }
    [data-status='EM_NEGOCIACAO'] { background: #e3eefc; color: #0b3157; }
    [data-status='ACEITA'] { background: #e1f0e3; color: #123524; }
    [data-status='EM_ANDAMENTO'] { background: #d9efef; color: #0d3b3b; }
    [data-status='CONCLUIDA'] { background: #25683f; color: #fff; }
    [data-status='CANCELADA'] { background: #ececec; color: #2b2b2b; }
  `,
})
export class StatusBadge {
  readonly status = input.required<ServiceRequestStatus>();
  protected readonly label = computed(() => STATUS_LABELS[this.status()]);
}
