export const ALL_STATUSES = [
    'PENDENTE',
    'EM_NEGOCIACAO',
    'ACEITA',
    'EM_ANDAMENTO',
    'CONCLUIDA',
    'CANCELADA',
];
export const STATUS_LABELS = {
    PENDENTE: 'Pendente',
    EM_NEGOCIACAO: 'Em negociação',
    ACEITA: 'Aceita',
    EM_ANDAMENTO: 'Em andamento',
    CONCLUIDA: 'Concluída',
    CANCELADA: 'Cancelada',
};
/** Explicação em linguagem simples do que cada situação significa. */
export const STATUS_HELP = {
    PENDENTE: 'Aguardando a resposta do prestador.',
    EM_NEGOCIACAO: 'O prestador está combinando os detalhes do serviço.',
    ACEITA: 'O pedido foi aceito. Combinem a data e os detalhes.',
    EM_ANDAMENTO: 'O serviço está sendo feito.',
    CONCLUIDA: 'O serviço foi concluído.',
    CANCELADA: 'Esta solicitação foi cancelada.',
};
/** Texto do botão que leva a solicitação para cada situação. */
export const ACTION_LABELS = {
    EM_NEGOCIACAO: 'Iniciar negociação',
    ACEITA: 'Aceitar pedido',
    EM_ANDAMENTO: 'Iniciar o serviço',
    CONCLUIDA: 'Marcar como concluído',
    CANCELADA: 'Cancelar solicitação',
};
/** Ações sem volta: pedimos confirmação antes. */
export const NEEDS_CONFIRMATION = new Set([
    'CANCELADA',
    'CONCLUIDA',
]);
export const STATUS_FILTERS = [
    { value: null, label: 'Todas' },
    ...ALL_STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] })),
];
export function parseStatus(value) {
    return ALL_STATUSES.find((status) => status === value) ?? null;
}
export function isOpenStatus(status) {
    return status !== 'CONCLUIDA' && status !== 'CANCELADA';
}
