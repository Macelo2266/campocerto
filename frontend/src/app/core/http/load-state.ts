import { Signal, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

import { ApiError, toApiError } from './api-error';

/** Os quatro momentos de qualquer tela que carrega dados. */
export type LoadState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly error: ApiError }
  | { readonly status: 'ready'; readonly data: T };

export interface LoadResource<T> {
  state: Signal<LoadState<T>>;
  reload: () => void;
}

export function toLoadState<T>(source: Observable<T>): Observable<LoadState<T>> {
  return source.pipe(
    map((data): LoadState<T> => ({ status: 'ready', data })),
    startWith<LoadState<T>>({ status: 'loading' }),
    catchError((error: unknown) => of<LoadState<T>>({ status: 'error', error: toApiError(error) })),
  );
}

/**
 * Recarrega sozinho sempre que os parâmetros (signals lidos em `params`) mudam.
 * Precisa ser chamado em contexto de injeção (campo de classe ou construtor).
 */
export function loadResource<P, T>(
  params: () => P,
  loader: (params: P) => Observable<T>,
): LoadResource<T> {
  const tick = signal(0);
  const trigger = computed(() => ({ params: params(), tick: tick() }));

  const state = toSignal(
    toObservable(trigger).pipe(switchMap(({ params }) => toLoadState(loader(params)))),
    { initialValue: { status: 'loading' } as LoadState<T> },
  );

  return { state, reload: () => tick.update((n) => n + 1) };
}
