export const USER_STATUS_LABELS = {
    ACTIVE: 'Ativo',
    SUSPENDED: 'Suspenso',
    BLOCKED: 'Bloqueado',
};
export const USER_STATUS_BADGE = {
    ACTIVE: 'badge-ok',
    SUSPENDED: 'badge-warn',
    BLOCKED: 'badge-danger',
};
export const REVIEW_STATUS_LABELS = {
    VISIBLE: 'Visível',
    HIDDEN: 'Oculta',
};
export const REVIEW_STATUS_BADGE = {
    VISIBLE: 'badge-ok',
    HIDDEN: 'badge-warn',
};
export const ROLE_OPTIONS = [
    { value: 'FARMER', label: 'Agricultores' },
    { value: 'PROVIDER', label: 'Prestadores' },
    { value: 'ADMIN', label: 'Administradores' },
];
export const USER_STATUS_OPTIONS = [
    { value: 'ACTIVE', label: 'Ativos' },
    { value: 'SUSPENDED', label: 'Suspensos' },
    { value: 'BLOCKED', label: 'Bloqueados' },
];
export const REVIEW_STATUS_FILTERS = [
    { value: null, label: 'Todas' },
    { value: 'VISIBLE', label: 'Visíveis' },
    { value: 'HIDDEN', label: 'Ocultas' },
];
// Tudo que vem da URL é suspeito: só valores conhecidos passam
export function parseUserStatus(value) {
    return USER_STATUS_OPTIONS.find((option) => option.value === value)?.value ?? null;
}
export function parseRole(value) {
    return ROLE_OPTIONS.find((option) => option.value === value)?.value ?? null;
}
export function parseReviewStatus(value) {
    return REVIEW_STATUS_FILTERS.find((option) => option.value === value)?.value ?? null;
}
