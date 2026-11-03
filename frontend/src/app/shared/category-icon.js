const ICONS = {
    'construcao-de-cercas': '🚧',
    'conserto-de-cercas': '🔧',
    'rocagem-e-limpeza': '🌿',
    'capina-e-preparo-do-solo': '🌱',
    'plantio-e-colheita': '🌾',
    currais: '🐄',
    'bombas-dagua': '💧',
    'tratores-e-maquinas': '🚜',
    'diaristas-e-ajudantes': '🧑‍🌾',
    'outros-servicos-rurais': '🛠️',
};
/** Categorias novas, criadas pelo administrador, recebem um ícone padrão. */
export function categoryIcon(slug) {
    return ICONS[slug] ?? '🛠️';
}
