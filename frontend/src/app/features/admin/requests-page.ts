import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../core/api/admin.service';
import { loadResource } from '../../core/http/load-state';
import { STATUS_FILTERS, parseStatus } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { parsePositiveInt } from '../providers/search-query';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-admin-requests-page',
  imports: [RouterLink, StatusBadge, Pagination, LoadingState, EmptyState, ErrorState],
  templateUrl: './requests-page.html',
})
export class AdminRequestsPage {
  private readonly admin = inject(AdminService);

  readonly status = input<string>();
  readonly page = input<string>();

  protected readonly filters = STATUS_FILTERS;
  protected readonly formatDate = formatDate;
  protected readonly formatDateOnly = formatDateOnly;

  protected readonly query = computed(() => ({
    status: parseStatus(this.status()),
    page: parsePositiveInt(this.page()) ?? 1,
  }));

  protected readonly results = loadResource(
    () => this.query(),
    (query) => this.admin.listRequests(query.status, query.page - 1, PAGE_SIZE),
  );
}
