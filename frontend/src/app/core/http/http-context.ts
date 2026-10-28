import { HttpContextToken } from '@angular/common/http';

/**
 * Quando verdadeiro, um 401 NÃO redireciona para o login.
 * Usado ao restaurar a sessão no início do app.
 */
export const SILENT_UNAUTHORIZED = new HttpContextToken<boolean>(() => false);
