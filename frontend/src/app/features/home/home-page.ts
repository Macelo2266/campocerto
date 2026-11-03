import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CategoryService } from '../../core/api/category.service';
import { ProviderService } from '../../core/api/provider.service';
import { AuthService } from '../../core/auth/auth.service';
import { loadResource } from '../../core/http/load-state';
import { ErrorState } from '../../shared/error-state/error-state';
import { LoadingState } from '../../shared/loading-state/loading-state';
import { ProviderCard } from '../../shared/provider-card/provider-card';
import { categoryIcon } from '../../shared/category-icon';
import { toQueryParams } from '../providers/search-query';

@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule, RouterLink, ProviderCard, LoadingState, ErrorState],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly providerService = inject(ProviderService);

  protected readonly categories = loadResource(() => null, () => this.categoryService.list());
  protected readonly cities = loadResource(() => null, () => this.providerService.cities());
  protected readonly featured = loadResource(
    () => null,
    () =>
      this.providerService.search({ q: '', category: null, city: '', sort: 'RATING', page: 1, size: 3 }),
  );

  protected readonly icon = categoryIcon;

  protected readonly form = this.fb.group({
    q: [''],
    city: [''],
  });

  protected search(): void {
    const { q, city } = this.form.getRawValue();
    void this.router.navigate(['/profissionais'], {
      queryParams: toQueryParams({ q, category: '', city, sort: 'RATING' }),
    });
  }
}
