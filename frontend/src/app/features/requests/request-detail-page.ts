import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { ServiceRequestService } from '../../core/api/service-request.service';
import { AuthService } from '../../core/auth/auth.service';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import { Review } from '../../core/models/provider.model';
import {
  ACTION_LABELS,
  NEEDS_CONFIRMATION,
  STATUS_HELP,
  STATUS_LABELS,
  ServiceRequest,
  ServiceRequestStatus,
  isOpenStatus,
} from '../../core/models/service-request.model';
import { formatDate, formatDateOnly, phoneHref } from '../../core/util/format';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { ReviewForm } from '../../shared/review-form/review-form';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { WhatsappButton } from '../../shared/whatsapp-button/whatsapp-button';
import { parsePositiveInt } from '../providers/search-query';

@Component({
  selector: 'app-request-detail-page',
  imports: [
    RouterLink,
    StatusBadge,
    RatingStars,
    ReviewForm,
    WhatsappButton,
    LoadingState,
    EmptyState,
    ErrorState,
  ],
  templateUrl: './request-detail-page.html',
  styleUrl: './request-detail-page.css',
})
export class RequestDetailPage {
  private readonly requests = inject(ServiceRequestService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly auth = inject(AuthService);

  readonly id = input.required<string>();
  readonly criada = input<string>();

  private readonly requestId = computed(() => parsePositiveInt(this.id()));

  protected readonly request = loadResource(
    () => this.requestId(),
    (id) =>
      id === null
        ? throwError(() => new HttpErrorResponse({ status: 404 }))
        : this.requests.get(id),
  );

  /** Resposta mais recente de uma ação (evita recarregar a página inteira depois de cada clique). */
  private readonly updated = signal<ServiceRequest | null>(null);

  protected readonly current = computed<ServiceRequest | null>(() => {
    const fresh = this.updated();
    if (fresh) {
      return fresh;
    }
    const state = this.request.state();
    return state.status === 'ready' ? state.data : null;
  });

  // Só buscamos a avaliação quando o serviço está concluído
  private readonly reviewTarget = computed(() => {
    const current = this.current();
    return current?.status === 'CONCLUIDA' ? current.id : null;
  });

  protected readonly review = loadResource(
    () => this.reviewTarget(),
    (id): Observable<Review | null> => (id === null ? of(null) : this.requests.getReview(id)),
  );

  protected readonly acting = signal(false);
  protected readonly confirming = signal<ServiceRequestStatus | null>(null);
  protected readonly actionError = signal<string | null>(null);

  protected readonly formatDate = formatDate;
  protected readonly formatDateOnly = formatDateOnly;
  protected readonly phoneHref = phoneHref;
  protected readonly isOpen = isOpenStatus;
  protected readonly statusHelp = STATUS_HELP;
  protected readonly statusLabels = STATUS_LABELS;

  constructor() {
    // Outra solicitação na mesma tela (mudou o :id): descarta o que sobrou da anterior
    effect(() => {
      this.requestId();
      untracked(() => {
        this.updated.set(null);
        this.confirming.set(null);
        this.actionError.set(null);
      });
    });
  }

  protected actionLabel(target: ServiceRequestStatus): string {
    return ACTION_LABELS[target] ?? STATUS_LABELS[target];
  }

  protected choose(current: ServiceRequest, target: ServiceRequestStatus): void {
    if (NEEDS_CONFIRMATION.has(target)) {
      this.confirming.set(target); // pede confirmação antes de uma ação sem volta
      return;
    }
    this.apply(current, target);
  }

  protected apply(current: ServiceRequest, target: ServiceRequestStatus): void {
    this.acting.set(true);
    this.actionError.set(null);
    this.confirming.set(null);

    this.requests
      .changeStatus(current.id, target)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fresh) => {
          this.updated.set(fresh);
          this.acting.set(false);
        },
        error: (error: unknown) => {
          const apiError = toApiError(error);
          this.actionError.set(apiError.message);
          this.acting.set(false);
          // 409: outra pessoa mudou a solicitação antes. Busca o estado atual e os botões certos
          if (apiError.status === 409) {
            this.refresh();
          }
        },
      });
  }

  protected refresh(): void {
    this.updated.set(null);
    this.request.reload();
    this.review.reload();
  }
}
