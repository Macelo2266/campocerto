import { ProviderSort } from '../../core/models/provider.model';

export const DEFAULT_SORT: ProviderSort = 'RATING';
export const PAGE_SIZE = 12;

const SORTS: readonly ProviderSort[] = ['NAME', 'NEWEST', 'RATING'];

/** Só dígitos, até 9 (cabe em um número seguro), e maior que zero. Qualquer outra coisa vira null. */
export function parsePositiveInt(value: string | null | undefined): number | null {
  if (!value || !/^\d{1,9}$/.test(value)) {
    return null;
  }
  const number = Number(value);
  return number > 0 ? number : null;
}

export function parseSort(value: string | null | undefined): ProviderSort {
  return SORTS.find((sort) => sort === value) ?? DEFAULT_SORT;
}

export interface FilterValues {
  q: string;
  category: string;
  city: string;
  sort: ProviderSort;
}

/** Transforma o formulário em parâmetros de URL. Valores vazios ou padrão ficam de fora (URL limpa). */
export function toQueryParams(values: FilterValues): Record<string, string | null> {
  const category = parsePositiveInt(values.category);

  return {
    q: values.q.trim() || null,
    category: category === null ? null : String(category),
    city: values.city.trim() || null,
    sort: values.sort === DEFAULT_SORT ? null : values.sort,
  };
}
