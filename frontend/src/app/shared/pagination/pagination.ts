import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  /** Página atual, começando em 1. */
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();

  protected readonly hasPrevious = computed(() => this.page() > 1);
  protected readonly hasNext = computed(() => this.page() < this.totalPages());

  // Página 1 não precisa aparecer na URL
  protected paramsFor(target: number): { page: number | null } {
    return { page: target <= 1 ? null : target };
  }
}
