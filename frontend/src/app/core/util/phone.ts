/**
 * Mesma regra do PhoneUtils do backend: DDD (2 dígitos, sem zero) + 9 + 8 dígitos.
 * Devolve "55" + número, ou null se não for um celular brasileiro válido.
 */
export function normalizeBrazilianMobile(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }

  let digits = raw.replace(/\D/g, '');

  // O "55" só é código do país quando sobram exatamente 13 dígitos (o DDD 55 existe!)
  if (digits.length === 13 && digits.startsWith('55')) {
    digits = digits.substring(2);
  }

  return /^[1-9][1-9]9\d{8}$/.test(digits) ? `55${digits}` : null;
}

/** 5583999990000 -> (83) 99999-0000. Se não reconhecer o formato, devolve como veio. */
export function formatBrazilianMobile(digits: string): string {
  const match = /^55([1-9][1-9])(9\d{4})(\d{4})$/.exec(digits);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : digits;
}
