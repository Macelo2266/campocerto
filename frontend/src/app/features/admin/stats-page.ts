import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../core/api/admin.service';
import { loadResource } from '../../core/http/load-state';
import { AdminStats } from '../../core/models/admin.model';
import { ALL_STATUSES, STATUS_LABELS } from '../../core/models/service-request.model';
import { formatNumber, formatRating } from '../../core/util/format';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';

@Component({
  selector: 'app-admin-stats-page',
  imports: [RouterLink, LoadingState, ErrorState],
  templateUrl: './stats-page.html',
})
export class AdminStatsPage {
  private readonly admin = inject(AdminService);

  protected readonly stats = loadResource(() => null, () => this.admin.stats());

  protected readonly statuses = ALL_STATUSES;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly fmt = formatNumber;
  protected readonly rating = formatRating;

  protected totalRequests(stats: AdminStats): number {
    return Object.values(stats.serviceRequests).reduce((sum, value) => sum + value, 0);
  }

  /** Prestadores que se cadastraram mas ainda não criaram o perfil (não aparecem na busca). */
  protected providersWithoutProfile(stats: AdminStats): number {
    return Math.max(0, stats.users.providers - stats.providers.total);
  }
}
