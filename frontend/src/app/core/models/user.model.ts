export type UserRole = 'FARMER' | 'PROVIDER' | 'ADMIN';

/** Tipos de conta que uma pessoa pode escolher ao se cadastrar (admin nunca). */
export type AccountRole = Exclude<UserRole, 'ADMIN'>;

export const ROLE_LABELS: Record<UserRole, string> = {
  FARMER: 'Agricultor',
  PROVIDER: 'Prestador de serviços',
  ADMIN: 'Administrador',
};

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role: AccountRole;
}
