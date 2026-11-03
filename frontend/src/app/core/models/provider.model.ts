export type ProviderSort = 'NAME' | 'NEWEST' | 'RATING';

export const SORT_OPTIONS: { value: ProviderSort; label: string }[] = [
  { value: 'RATING', label: 'Melhor avaliados' },
  { value: 'NAME', label: 'Ordem alfabética' },
  { value: 'NEWEST', label: 'Mais recentes' },
];

/** Dados do cartão da lista (ProviderSummaryResponse). */
export interface ProviderSummary {
  id: number;
  professionalName: string;
  city: string;
  shortDescription: string | null;
  categories: string[];
  available: boolean;
  ratingAverage: number | null; // null = ainda sem avaliações
  ratingCount: number;
}

export interface Offering {
  categoryId: number;
  categoryName: string;
  priceInfo: string | null; // null = preço a combinar
}

/** Perfil público (ProviderPublicResponse). Repare: não existe campo de telefone. */
export interface ProviderPublic {
  id: number;
  professionalName: string;
  description: string | null;
  city: string;
  available: boolean;
  ratingAverage: number | null;
  ratingCount: number;
  serviceAreas: string[];
  offerings: Offering[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  reviewerName: string;
  serviceName: string;
  createdAt: string; // data ISO
}

/** Filtros da busca. A página aqui começa em 1 (a da URL); o serviço converte para a API. */
export interface ProviderSearchQuery {
  q: string;
  category: number | null;
  city: string;
  sort: ProviderSort;
  page: number;
  size: number;
}


/** Perfil privado do prestador (ProviderProfileResponse do backend). */
export interface ProviderProfile {
  id: number;
  professionalName: string;
  description: string | null;
  whatsapp: string;
  city: string;
  available: boolean;
  ratingAverage: number | null;
  ratingCount: number;
  serviceAreas: string[];
  offerings: Offering[];
}

/** Dados enviados para criar ou atualizar o perfil (ProviderProfileRequest). */
export interface ProviderProfilePayload {
  professionalName: string;
  description: string | null;
  whatsapp: string;
  city: string;
  serviceAreas: string[];
  offerings: { categoryId: number; priceInfo: string | null }[];
  available: boolean;
}

/** Link de contato retornado pelo endpoint /api/providers/{id}/whatsapp. */
export interface WhatsappLink {
  url: string;
  message: string;
}
