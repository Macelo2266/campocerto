export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
}


/** Dados enviados ao criar ou editar uma categoria (CategoryRequest do backend). */
export interface CategoryPayload {
  name: string;
  description: string | null;
}
