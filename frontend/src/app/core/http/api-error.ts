import { HttpErrorResponse } from '@angular/common/http';

/** Erro da API já traduzido para algo que a tela sabe mostrar. */
export interface ApiError {
  status: number;
  message: string;
  fieldErrors: Record<string, string>;
}

export function toApiError(error: unknown): ApiError {
  if (!(error instanceof HttpErrorResponse)) {
    return { status: -1, message: 'Ocorreu um erro inesperado. Tente novamente.', fieldErrors: {} };
  }

  if (error.status === 0) {
    return {
      status: 0,
      message: 'Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.',
      fieldErrors: {},
    };
  }

  const body: unknown = error.error;
  const record = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};
  const detail = typeof record['detail'] === 'string' ? record['detail'] : null;

  return {
    status: error.status,
    message: detail ?? fallbackMessage(error.status),
    fieldErrors: extractFieldErrors(record['errors']),
  };
}

function extractFieldErrors(value: unknown): Record<string, string> {
  const result: Record<string, string> = {};
  if (typeof value === 'object' && value !== null) {
    for (const [field, message] of Object.entries(value)) {
      if (typeof message === 'string') {
        result[field] = message;
      }
    }
  }
  return result;
}

function fallbackMessage(status: number): string {
  switch (status) {
    case 400: return 'Verifique os dados informados.';
    case 401: return 'Faça login para continuar.';
    case 403: return 'Você não tem permissão para fazer isso.';
    case 404: return 'Não encontramos o que você procurou.';
    case 409: return 'Esta ação conflita com dados já existentes.';
    case 429: return 'Muitas tentativas. Aguarde um pouco e tente de novo.';
    default:
      return status >= 500
        ? 'O servidor está com problemas. Tente novamente em instantes.'
        : 'Não foi possível concluir a ação.';
  }
}
