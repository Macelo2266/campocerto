/** Espelha o PageResponse do backend. */
export interface Page<T> {
  content: T[];
  page: number; // começa em 0 (padrão da API)
  size: number;
  totalElements: number;
  totalPages: number;
}
