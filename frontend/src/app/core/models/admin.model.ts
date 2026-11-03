import { ServiceRequestStatus } from './service-request.model';
import { UserRole } from './user.model';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BLOCKED';
export type ReviewStatus = 'VISIBLE' | 'HIDDEN';

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  BLOCKED: 'Bloqueado',
};

export const USER_STATUS_BADGE: Record<UserStatus, string> = {
  ACTIVE: 'badge-ok',
  SUSPENDED: 'badge-warn',
  BLOCKED: 'badge-danger',
};

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  VISIBLE: 'Visível',
  HIDDEN: 'Oculta',
};

export const REVIEW_STATUS_BADGE: Record<ReviewStatus, string> = {
  VISIBLE: 'badge-ok',
  HIDDEN: 'badge-warn',
};

export const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'FARMER', label: 'Agricultores' },
  { value: 'PROVIDER', label: 'Prestadores' },
  { value: 'ADMIN', label: 'Administradores' },
];

export const USER_STATUS_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Ativos' },
  { value: 'SUSPENDED', label: 'Suspensos' },
  { value: 'BLOCKED', label: 'Bloqueados' },
];

export const REVIEW_STATUS_FILTERS: { value: ReviewStatus | null; label: string }[] = [
  { value: null, label: 'Todas' },
  { value: 'VISIBLE', label: 'Visíveis' },
  { value: 'HIDDEN', label: 'Ocultas' },
];

// Tudo que vem da URL é suspeito: só valores conhecidos passam
export function parseUserStatus(value: string | null | undefined): UserStatus | null {
  return USER_STATUS_OPTIONS.find((option) => option.value === value)?.value ?? null;
}

export function parseRole(value: string | null | undefined): UserRole | null {
  return ROLE_OPTIONS.find((option) => option.value === value)?.value ?? null;
}

export function parseReviewStatus(value: string | null | undefined): ReviewStatus | null {
  return REVIEW_STATUS_FILTERS.find((option) => option.value === value)?.value ?? null;
}

/** Espelha o AdminUserResponse do backend. */
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

/** Espelha o AdminReviewResponse. */
export interface AdminReview {
  id: number;
  rating: number;
  comment: string | null;
  status: ReviewStatus;
  reviewerName: string;
  providerId: number;
  providerName: string;
  serviceRequestId: number;
  createdAt: string;
}

/** Espelha o AdminServiceRequestResponse (resumo: não traz e-mail nem telefone). */
export interface AdminServiceRequest {
  id: number;
  status: ServiceRequestStatus;
  statusLabel: string;
  categoryName: string;
  description: string;
  city: string;
  desiredDate: string | null;
  requesterId: number;
  requesterName: string;
  providerId: number;
  providerName: string;
  createdAt: string;
  updatedAt: string;
}

/** Espelha o AdminStatsResponse. */
export interface AdminStats {
  users: {
    total: number;
    farmers: number;
    providers: number;
    admins: number;
    active: number;
    suspended: number;
    blocked: number;
  };
  providers: { total: number; available: number };
  serviceRequests: Record<ServiceRequestStatus, number>;
  reviews: { visible: number; hidden: number; averageRating: number | null };
}
