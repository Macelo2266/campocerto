import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);

  private cache$: Observable<Category[]> | null = null;

  // A lista muda raramente: buscamos uma vez e reaproveitamos.
  // Se a requisição falhar, o shareReplay não guarda o erro e a próxima tentativa busca de novo.
  list(): Observable<Category[]> {
    this.cache$ ??= this.http.get<Category[]>('/api/categories').pipe(shareReplay(1));
    return this.cache$;
  }

  /** Esquece a lista guardada: a próxima tela que pedir busca de novo no servidor. */
  invalidate(): void {
    this.cache$ = null;
  }
}
