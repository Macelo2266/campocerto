export type ServiceRequestStatus =
  | 'PENDENTE'
  | 'EM_NEGOCIACAO'
  | 'ACEITA'
  | 'EM_ANDAMENTO'
  | 'CONCLUIDA'
  | 'CANCELADA';

export const ALL_STATUSES: readonly ServiceRequestStatus[] = [
  'PENDENTE',
  'EM_NEGOCIACAO',
  'ACEITA',
  'EM_ANDAMENTO',
  'CONCLUIDA',
  'CANCELADA',
];

export const STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  PENDENTE: 'Pendente',
  EM_NEGOCIACAO: 'Em negociação',
  ACEITA: 'Aceita',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
};

/** Explicação em linguagem simples do que cada situação significa. */
export const STATUS_HELP: Record<ServiceRequestStatus, string> = {
  PENDENTE: 'Aguardando a resposta do prestador.',
  EM_NEGOCIACAO: 'O prestador está combinando os detalhes do serviço.',
  ACEITA: 'O pedido foi aceito. Combinem a data e os detalhes.',
  EM_ANDAMENTO: 'O serviço está sendo feito.',
  CONCLUIDA: 'O serviço foi concluído.',
  CANCELADA: 'Esta solicitação foi cancelada.',
};

/** Texto do botão que leva a solicitação para cada situação. */
export const ACTION_LABELS: Partial<Record<ServiceRequestStatus, string>> = {
  EM_NEGOCIACAO: 'Iniciar negociação',
  ACEITA: 'Aceitar pedido',
  EM_ANDAMENTO: 'Iniciar o serviço',
  CONCLUIDA: 'Marcar como concluído',
  CANCELADA: 'Cancelar solicitação',
};

/** Ações sem volta: pedimos confirmação antes. */
export const NEEDS_CONFIRMATION: ReadonlySet<ServiceRequestStatus> = new Set<ServiceRequestStatus>([
  'CANCELADA',
  'CONCLUIDA',
]);

export const STATUS_FILTERS: { value: ServiceRequestStatus | null; label: string }[] = [
  { value: null, label: 'Todas' },
  ...ALL_STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] })),
];

export function parseStatus(value: string | null | undefined): ServiceRequestStatus | null {
  return ALL_STATUSES.find((status) => status === value) ?? null;
}

export function isOpenStatus(status: ServiceRequestStatus): boolean {
  return status !== 'CONCLUIDA' && status !== 'CANCELADA';
}

export interface ServiceRequest {
  id: number;
  status: ServiceRequestStatus;
  statusLabel: string;
  category: { id: number; name: string };
  description: string;
  city: string;
  desiredDate: string | null; // "yyyy-MM-dd", sem hora
  additionalInfo: string | null;
  provider: { id: number; professionalName: string };
  /** Só vem preenchido para o prestador. Para o agricultor é null. */
  requester: { name: string; phone: string | null } | null;
  availableTransitions: ServiceRequestStatus[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequestPayload {
  providerId: number;
  categoryId: number;
  description: string;
  city: string;
  desiredDate: string | null;
  additionalInfo: string | null;
}

export interface ReviewPayload {
  rating: number;
  comment: string | null;
}
