import {
  Component,
  DestroyRef,
  Injector,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../core/api/admin.service';
import { focusElementAfterRender } from '../../core/forms/focus';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import {
  AdminReview,
  REVIEW_STATUS_BADGE,
  REVIEW_STATUS_FILTERS,
  REVIEW_STATUS_LABELS,
  ReviewStatus,
  parseReviewStatus,
} from '../../core/models/admin.model';
import { formatDate } from '../../core/util/format';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { RatingStars } from '../../shared/rating-stars/rating-stars';
import { parsePositiveInt } from '../providers/search-query';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-admin-reviews-page',
  imports: [RouterLink, RatingStars, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState],
  templateUrl: './reviews-page.html',
})
export class AdminReviewsPage {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly admin = inject(AdminService);

  readonly status = input<string>();
  readonly page = input<string>();

  protected readonly filters = REVIEW_STATUS_FILTERS;
  protected readonly statusLabels = REVIEW_STATUS_LABELS;
  protected readonly statusBadge = REVIEW_STATUS_BADGE;
  protected readonly formatDate = formatDate;

  protected readonly query = computed(() => ({
    status: parseReviewStatus(this.status()),
    page: parsePositiveInt(this.page()) ?? 1,
  }));

  protected readonly results = loadResource(
    () => this.query(),
    (query) => this.admin.listReviews(query.status, query.page - 1, PAGE_SIZE),
  );

  private readonly patched = signal(new Map<number, AdminReview>());

  protected readonly rows = computed(() => {
    const state = this.results.state();
    if (state.status !== 'ready') {
      return [];
    }
    const patched = this.patched();
    return state.data.content.map((review) => patched.get(review.id) ?? review);
  });

  protected readonly pending = signal<AdminReview | null>(null);
  protected readonly busy = signal(false);
  protected readonly dialogError = signal<string | null>(null);
  protected readonly pageError = signal<string | null>(null);
  protected readonly announcement = signal('');

  private readonly confirmDialog = viewChild.required(ConfirmDialog);

  constructor() {
    // Quando a busca muda (outro filtro ou página), as linhas alteradas aqui deixam de valer
    effect(() => {
      this.query();
      untracked(() => this.patched.set(new Map()));
    });
  }

  protected request(review: AdminReview, target: ReviewStatus): void {
    this.pageError.set(null);

    if (target === 'VISIBLE') {
      this.apply(review, target); // restaurar não pede confirmação
      return;
    }

    this.dialogError.set(null);
    this.pending.set(review);
    this.confirmDialog().open();
  }

  protected confirmPending(): void {
    const review = this.pending();
    if (review) {
      this.apply(review, 'HIDDEN');
    }
  }

  protected onDialogClosed(): void {
    this.pending.set(null);
    this.dialogError.set(null);
  }

  private apply(review: AdminReview, target: ReviewStatus): void {
    this.busy.set(true);

    this.admin
      .changeReviewStatus(review.id, target)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fresh) => {
          this.patched.update((map) => new Map(map).set(fresh.id, fresh));
          this.busy.set(false);
          this.announcement.set(
            fresh.status === 'HIDDEN'
              ? `Avaliação ${fresh.id} ocultada. Ela saiu do perfil público e da nota do prestador.`
              : `Avaliação ${fresh.id} restaurada. Ela voltou ao perfil público e à nota do prestador.`,
          );
          this.confirmDialog().close();
          focusElementAfterRender(this.injector, `review-${fresh.id}`);
        },
        error: (error: unknown) => {
          const message = toApiError(error).message;
          if (this.pending()) {
            this.dialogError.set(message);
          } else {
            this.pageError.set(message);
          }
          this.busy.set(false);
        },
      });
  }
}
