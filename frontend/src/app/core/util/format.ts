const ratingFormat = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
const integerFormat = new Intl.NumberFormat('pt-BR');

export function formatRating(value: number): string {
  return ratingFormat.format(value);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date);
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

/**
 * Datas sem hora ("2026-12-15") NÃO podem passar por new Date(texto): o JavaScript as lê como
 * meia-noite em UTC, e no Brasil isso cai no dia anterior. Montamos com ano, mês e dia locais.
 */
export function formatDateOnly(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) {
    return '';
  }
  return dateFormat.format(new Date(year, month - 1, day));
}

/** Hoje no fuso do usuário, como "yyyy-MM-dd". (toISOString() usaria UTC e viraria "amanhã" à noite.) */
export function todayIso(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Link "tel:" só com dígitos (e +). Devolve null se não há número utilizável. */
export function phoneHref(phone: string | null): string | null {
  const digits = (phone ?? '').replace(/[^\d+]/g, '');
  return digits.length >= 8 ? `tel:${digits}` : null;
}

export function formatNumber(value: number): string {
  return integerFormat.format(value);
}
