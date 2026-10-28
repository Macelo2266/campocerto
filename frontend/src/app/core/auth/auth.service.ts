import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';

import { SILENT_UNAUTHORIZED } from '../http/http-context';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '../models/user.model';
import { isTokenExpired } from './jwt';

const TOKEN_KEY = 'campocerto.token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly tokenState = signal<string | null>(this.loadStoredToken());
  private readonly userState = signal<User | null>(null);

  readonly token = this.tokenState.asReadonly();
  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.tokenState() !== null && this.userState() !== null);
  readonly role = computed(() => this.userState()?.role ?? null);

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<AuthResponse>('/api/auth/login', payload).pipe(
      tap((response) => this.startSession(response)),
      map((response) => response.user),
    );
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<AuthResponse>('/api/auth/register', payload).pipe(
      tap((response) => this.startSession(response)),
      map((response) => response.user),
    );
  }

  /** Busca os dados atuais do usuário no servidor (também confirma que o token ainda vale). */
  refreshUser(silent = false): Observable<User> {
    const context = new HttpContext().set(SILENT_UNAUTHORIZED, silent);
    return this.http
      .get<User>('/api/users/me', { context })
      .pipe(tap((user) => this.userState.set(user)));
  }

  /** Roda uma vez ao abrir o app: se há token guardado, descobre quem é o usuário. */
  async restoreSession(): Promise<void> {
    if (this.tokenState() === null) {
      return;
    }
    try {
      await firstValueFrom(this.refreshUser(true));
    } catch {
      // Token recusado ou servidor fora do ar: seguimos como visitante
      this.logout();
    }
  }

  logout(): void {
    this.persistToken(null);
    this.tokenState.set(null);
    this.userState.set(null);
  }

  private startSession(response: AuthResponse): void {
    this.persistToken(response.accessToken);
    this.tokenState.set(response.accessToken);
    this.userState.set(response.user);
  }

  private loadStoredToken(): string | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && !isTokenExpired(token)) {
        return token;
      }
      if (token) {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // Armazenamento bloqueado (ex.: navegação anônima restrita): seguimos sem sessão salva
    }
    return null;
  }

  private persistToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // Sem armazenamento, a sessão dura só até recarregar a página
    }
  }
}
