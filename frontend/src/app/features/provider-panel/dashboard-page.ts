import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProviderAccountService, toProfilePayload } from '../../core/api/provider-account.service';
import { ServiceRequestService } from '../../core/api/service-request.service';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { ProviderProfile } from '../../core/models/provider.model';
import { STATUS_FILTERS, parseStatus } from '../../core/models/service-request.model';
import { formatDate, formatDateOnly } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { parsePositiveInt } from '../providers/search-query';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, StatusBadge, RatingStars, Pagination, LoadingState, EmptyState, ErrorState],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  private readonly account = inject(ProviderAccountService);
  private readonly requests = inject(ServiceRequestService);
  private readonly destroyRef = inject(DestroyRef);

  // Parâmetros da URL: /painel?status=PENDENTE&page=2&salvo=criado
  readonly status = input<string>();
  readonly page = input<string>();
  readonly salvo = input<string>();

  protected readonly filters = STATUS_FILTERS;
  protected readonly formatDate = formatDate;
  protected readonly formatDateOnly = formatDateOnly;

  protected readonly query = computed(() => ({
    status: parseStatus(this.status()),
    page: parsePositiveInt(this.page()) ?? 1,
  }));

  protected readonly profile = loadResource(() => null, () => this.account.getMine());
  protected readonly pending = loadResource(() => null, () => this.requests.listReceived('PENDENTE', 0, 1));
  protected readonly received = loadResource(
    () => this.query(),
    (query) => this.requests.listReceived(query.status, query.page - 1, PAGE_SIZE),
  );

  /** O perfil mais recente depois de pausar/retomar (evita recarregar a tela inteira). */
  private readonly updated = signal<ProviderProfile | null>(null);

  protected readonly current = computed<ProviderProfile | null>(() => {
    const fresh = this.updated();
    if (fresh) {
      return fresh;
    }
    const state = this.profile.state();
    return state.status === 'ready' ? state.data : null;
  });

  protected readonly toggling = signal(false);
  protected readonly toggleError = signal<string | null>(null);
  protected readonly toggleResult = signal('');

  protected toggleAvailability(profile: ProviderProfile): void {
    this.toggling.set(true);
    this.toggleError.set(null);
    this.toggleResult.set('');

    this.account
      .save(profile.id, toProfilePayload(profile, !profile.available))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fresh) => {
          this.updated.set(fresh);
          this.toggling.set(false);
          this.toggleResult.set(
            fresh.available ? 'Pronto! Você voltou a receber novos pedidos.' : 'Pronto! Seus novos pedidos estão pausados.',
          );
        },
        error: (error: unknown) => {
          this.toggleError.set(toApiError(error).message);
          this.toggling.set(false);
        },
      });
  }
}
