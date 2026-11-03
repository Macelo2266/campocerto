/**
 * Aceita apenas caminhos internos (ex.: "/conta"). Evita "open redirect":
 * um link de login que, depois de entrar, leva para um site falso.
 */
export function safeReturnUrl(url: string | null | undefined, fallback = '/'): string {
  if (!url) {
    return fallback;
  }

  const startsLikeInternalPath = url.startsWith('/') && !url.startsWith('//');
  const hasBackslash = url.includes('\\');
  // Navegadores removem tabulação e quebra de linha de URLs: "/\t/x.com" viraria "//x.com"
  const hasControlCharacter = /[\u0000-\u001f\u007f]/.test(url);

  return startsLikeInternalPath && !hasBackslash && !hasControlCharacter ? url : fallback;
}
