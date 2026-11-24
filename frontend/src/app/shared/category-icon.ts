import type { IconName } from './icon/icon';

const ICONS: Record<string, string> = {
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
export function categoryIcon(slug: string): string {
  return ICONS[slug] ?? '🛠️';
}

const ICON_NAMES: Record<string, IconName> = {
  'construcao-de-cercas': 'fence',
  'conserto-de-cercas': 'wrench',
  'rocagem-e-limpeza': 'leaf',
  'capina-e-preparo-do-solo': 'sprout',
  'plantio-e-colheita': 'sprout',
  currais: 'fence',
  'bombas-dagua': 'droplet',
  'tratores-e-maquinas': 'tractor',
  'diaristas-e-ajudantes': 'users',
  'outros-servicos-rurais': 'apps',
};

/** Ícone vetorial (componente app-icon) de cada categoria; categorias novas usam um ícone neutro. */
export function categoryIconName(slug: string): IconName {
  return ICON_NAMES[slug] ?? 'apps';
}
