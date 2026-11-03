import { Component, computed, input } from '@angular/core';

import { STATUS_LABELS, ServiceRequestStatus } from '../../core/models/service-request.model';

@Component({
  selector: 'app-status-badge',
  template: `<span class="status" [attr.data-status]="status()">{{ label() }}</span>`,
  styles: `
    .status {
      display: inline-block;
      padding: 0.2rem 0.75rem;
      border-radius: 999px;
      font-size: 0.92rem;
      font-weight: 700;
      background: #ececec;
      color: #2b2b2b;
    }
    [data-status='PENDENTE'] { background: #fff1d6; color: #5c3b00; }
    [data-status='EM_NEGOCIACAO'] { background: #e3eefc; color: #0b3157; }
    [data-status='ACEITA'] { background: #e4f0e2; color: #1b3d22; }
    [data-status='EM_ANDAMENTO'] { background: #d9efef; color: #0d3b3b; }
    [data-status='CONCLUIDA'] { background: #2d6a35; color: #fff; }
    [data-status='CANCELADA'] { background: #ececec; color: #2b2b2b; }
  `,
})
export class StatusBadge {
  readonly status = input.required<ServiceRequestStatus>();
  protected readonly label = computed(() => STATUS_LABELS[this.status()]);
}
