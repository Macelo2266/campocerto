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
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../core/api/admin.service';
import { AuthService } from '../../core/auth/auth.service';
import { focusElementAfterRender } from '../../core/forms/focus';
import { toApiError } from '../../core/http/api-error';
import { loadResource } from '../../core/http/load-state';
import {
  AdminUser,
  ROLE_OPTIONS,
  USER_STATUS_BADGE,
  USER_STATUS_LABELS,
  USER_STATUS_OPTIONS,
  UserStatus,
  parseRole,
  parseUserStatus,
} from '../../core/models/admin.model';
import { ROLE_LABELS } from '../../core/models/user.model';
import { formatDate } from '../../core/util/format';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { parsePositiveInt } from '../providers/search-query';

const PAGE_SIZE = 20;

@Component({
  selector: 'app-admin-users-page',
  imports: [ReactiveFormsModule, Pagination, ConfirmDialog, LoadingState, EmptyState, ErrorState],
  templateUrl: './users-page.html',
})
export class AdminUsersPage {
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly admin = inject(AdminService);
  private readonly auth = inject(AuthService);

  // Parâmetros da URL: /admin/usuarios?q=joao&role=FARMER&status=ACTIVE&page=2
  readonly q = input<string>();
  readonly role = input<string>();
  readonly status = input<string>();
  readonly page = input<string>();

  protected readonly roleOptions = ROLE_OPTIONS;
  protected readonly statusOptions = USER_STATUS_OPTIONS;
  protected readonly statusLabels = USER_STATUS_LABELS;
  protected readonly statusBadge = USER_STATUS_BADGE;
  protected readonly roleLabels = ROLE_LABELS;
  protected readonly formatDate = formatDate;

  protected readonly query = computed(() => ({
    q: (this.q() ?? '').slice(0, 100),
    role: parseRole(this.role()),
    status: parseUserStatus(this.status()),
    page: parsePositiveInt(this.page()) ?? 1,
  }));

  protected readonly hasFilters = computed(() => {
    const query = this.query();
    return query.q !== '' || query.role !== null || query.status !== null;
  });

  protected readonly results = loadResource(
    () => this.query(),
    (query) => this.admin.listUsers(query, query.page - 1, PAGE_SIZE),
  );

  // Linhas alteradas aqui, por cima da lista carregada (a linha muda sem recarregar a tabela)
  private readonly patched = signal(new Map<number, AdminUser>());

  protected readonly rows = computed(() => {
    const state = this.results.state();
    if (state.status !== 'ready') {
      return [];
    }
    const patched = this.patched();
    return state.data.content.map((user) => patched.get(user.id) ?? user);
  });

  protected readonly form = this.fb.group({
    q: [''],
    role: [''],
    status: [''],
  });

  // Ação aguardando confirmação
  protected readonly pending = signal<{ user: AdminUser; target: UserStatus } | null>(null);
  protected readonly busy = signal(false);
  protected readonly dialogError = signal<string | null>(null);
  protected readonly pageError = signal<string | null>(null);
  protected readonly announcement = signal('');

  // O diálogo fica no nível mais alto do template: um viewChild.required não pode estar dentro de um @if
  private readonly confirmDialog = viewChild.required(ConfirmDialog);

  private readonly currentAdminId = computed(() => this.auth.user()?.id ?? null);

  protected readonly dialogTitle = computed(() => {
    const pending = this.pending();
    if (!pending) {
      return '';
    }
    return `${pending.target === 'BLOCKED' ? 'Bloquear' : 'Suspender'} ${pending.user.name}?`;
  });

  protected readonly dialogMessage = computed(() => {
    const pending = this.pending();
    if (!pending) {
      return '';
    }
    const effects =
      'A pessoa será desconectada na hora e não poderá entrar. Se for prestador, o perfil sai da busca e ninguém mais consegue pedir orçamento a ele.';
    return pending.target === 'BLOCKED'
      ? `${effects} Hoje o bloqueio e a suspensão têm o mesmo efeito prático; o bloqueio serve para registrar casos mais graves. Você pode reativar depois.`
      : `${effects} Você pode reativar depois.`;
  });

  protected readonly dialogConfirmLabel = computed(() =>
    this.pending()?.target === 'BLOCKED' ? 'Sim, bloquear' : 'Sim, suspender',
  );

  constructor() {
    // Mantém o formulário igual à URL e descarta as linhas alteradas quando a busca muda
    effect(() => {
      const query = this.query();
      this.form.patchValue(
        { q: query.q, role: query.role ?? '', status: query.status ?? '' },
        { emitEvent: false },
      );
      untracked(() => this.patched.set(new Map()));
    });
  }

  /** O backend recusa alterar a própria conta e a de outro admin (403): aqui só escondemos os botões. */
  protected canChange(user: AdminUser): boolean {
    return user.role !== 'ADMIN' && user.id !== this.currentAdminId();
  }

  protected whyNot(user: AdminUser): string {
    return user.id === this.currentAdminId() ? 'Você' : 'Administrador';
  }

  protected search(): void {
    const value = this.form.getRawValue();
    void this.router.navigate(['/admin/usuarios'], {
      queryParams: { q: value.q.trim() || null, role: value.role || null, status: value.status || null },
    });
  }

  protected clear(): void {
    void this.router.navigate(['/admin/usuarios']);
  }

  protected request(user: AdminUser, target: UserStatus): void {
    this.pageError.set(null);

    if (target === 'ACTIVE') {
      this.apply(user, target); // reativar devolve acesso: não precisa de confirmação
      return;
    }

    this.dialogError.set(null);
    this.pending.set({ user, target });
    this.confirmDialog().open();
  }

  protected confirmPending(): void {
    const pending = this.pending();
    if (pending) {
      this.apply(pending.user, pending.target);
    }
  }

  protected onDialogClosed(): void {
    this.pending.set(null);
    this.dialogError.set(null);
  }

  private apply(user: AdminUser, target: UserStatus): void {
    this.busy.set(true);

    this.admin
      .changeUserStatus(user.id, target)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fresh) => {
          this.patched.update((map) => new Map(map).set(fresh.id, fresh));
          this.busy.set(false);
          this.announcement.set(`${fresh.name}: situação alterada para ${USER_STATUS_LABELS[fresh.status].toLowerCase()}.`);
          this.confirmDialog().close();
          // O botão clicado pode ter sumido: o foco vai para o nome da pessoa
          focusElementAfterRender(this.injector, `user-${fresh.id}`);
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
