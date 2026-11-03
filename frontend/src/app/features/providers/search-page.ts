import { Component, computed, effect, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CategoryService } from '../../core/api/category.service';
import { ProviderService } from '../../core/api/provider.service';
import { loadResource } from '../../core/http/load-state';
import { ProviderSearchQuery, ProviderSort, SORT_OPTIONS } from '../../core/models/provider.model';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { Pagination } from '../../shared/pagination/pagination';
import { ProviderCard } from '../../shared/provider-card/provider-card';
import { DEFAULT_SORT, PAGE_SIZE, parsePositiveInt, parseSort, toQueryParams } from './search-query';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule, RouterLink, ProviderCard, Pagination, LoadingState, EmptyState, ErrorState],
  templateUrl: './search-page.html',
})
export class SearchPage {
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly providerService = inject(ProviderService);
  private readonly categoryService = inject(CategoryService);

  // Ligados aos parâmetros da URL por withComponentInputBinding()
  readonly q = input<string>();
  readonly category = input<string>();
  readonly city = input<string>();
  readonly sort = input<string>();
  readonly page = input<string>();

  protected readonly sortOptions = SORT_OPTIONS;

  /** A URL, já sanitizada, é a fonte da verdade da busca. */
  protected readonly query = computed<ProviderSearchQuery>(() => ({
    q: (this.q() ?? '').slice(0, 100),
    category: parsePositiveInt(this.category()),
    city: (this.city() ?? '').slice(0, 100),
    sort: parseSort(this.sort()),
    page: parsePositiveInt(this.page()) ?? 1,
    size: PAGE_SIZE,
  }));

  protected readonly hasFilters = computed(() => {
    const query = this.query();
    return query.q !== '' || query.category !== null || query.city !== '' || query.sort !== DEFAULT_SORT;
  });

  protected readonly results = loadResource(
    () => this.query(),
    (query) => this.providerService.search(query),
  );
  protected readonly categories = loadResource(() => null, () => this.categoryService.list());
  protected readonly cities = loadResource(() => null, () => this.providerService.cities());

  protected readonly form = this.fb.group({
    q: [''],
    category: [''],
    city: [''],
    sort: this.fb.control<ProviderSort>(DEFAULT_SORT),
  });

  constructor() {
    // Mantém o formulário igual à URL (por exemplo, quando a pessoa usa o botão Voltar)
    effect(() => {
      const query = this.query();
      this.form.patchValue(
        {
          q: query.q,
          category: query.category === null ? '' : String(query.category),
          city: query.city,
          sort: query.sort,
        },
        { emitEvent: false },
      );
    });
  }

  protected search(): void {
    void this.router.navigate(['/profissionais'], { queryParams: toQueryParams(this.form.getRawValue()) });
  }

  protected clear(): void {
    void this.router.navigate(['/profissionais']);
  }

  protected countText(total: number): string {
    if (total === 0) {
      return 'Nenhum profissional encontrado';
    }
    return total === 1 ? '1 profissional encontrado' : `${total} profissionais encontrados`;
  }

  // A URL pode trazer uma cidade que não está na lista: mantemos como opção para o filtro não "sumir"
  protected cityMissing(cities: string[], city: string): boolean {
    return city !== '' && !cities.some((name) => name.localeCompare(city, 'pt-BR', { sensitivity: 'base' }) === 0);
  }
}
