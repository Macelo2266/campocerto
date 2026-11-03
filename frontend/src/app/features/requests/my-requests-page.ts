import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServiceRequestService } from '../../core/api/service-request.service';
import { loadResource } from '../../core/http/load-state';
import { STATUS_FILTERS, ServiceRequestStatus, parseStatus } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { parsePositiveInt } from '../providers/search-query';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-my-requests-page',
  imports: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState],
  templateUrl: './my-requests-page.html',
})
export class MyRequestsPage {
  private readonly requests = inject(ServiceRequestService);

  readonly status = input<string>();
  readonly page = input<string>();

  protected readonly filters = STATUS_FILTERS;
  protected readonly formatDate = formatDate;
  protected readonly formatDateOnly = formatDateOnly;

  protected readonly query = computed(() => ({
    status: parseStatus(this.status()) as ServiceRequestStatus | null,
    page: parsePositiveInt(this.page()) ?? 1,
  }));

  protected readonly results = loadResource(
    () => this.query(),
    (query) => this.requests.listMine(query.status, query.page - 1, PAGE_SIZE),
  );
}
