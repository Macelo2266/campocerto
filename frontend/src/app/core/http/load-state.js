import { computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toApiError } from './api-error';
export function toLoadState(source) {
    return source.pipe(map((data) => ({ status: 'ready', data })), startWith({ status: 'loading' }), catchError((error) => of({ status: 'error', error: toApiError(error) })));
}
/**
 * Recarrega sozinho sempre que os parâmetros (signals lidos em `params`) mudam.
 * Precisa ser chamado em contexto de injeção (campo de classe ou construtor).
 */
export function loadResource(params, loader) {
    const tick = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tick" }] : /* istanbul ignore next */ []));
    const trigger = computed(() => ({ params: params(), tick: tick() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trigger" }] : /* istanbul ignore next */ []));
    const state = toSignal(toObservable(trigger).pipe(switchMap(({ params }) => toLoadState(loader(params)))), { initialValue: { status: 'loading' } });
    return { state, reload: () => tick.update((n) => n + 1) };
}
