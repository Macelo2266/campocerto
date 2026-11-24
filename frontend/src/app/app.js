import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AuthService } from './core/auth/auth.service';
import { Icon } from './shared/icon/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly year = new Date().getFullYear();

  /** Só vale no celular: o menu vira um painel que abre e fecha. */
  protected readonly menuOpen = signal(false);

  constructor() {
    // Qualquer navegação (inclusive redirecionamentos) fecha o menu
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }

  // Um link "#conteudo" com <base href="/"> levaria para a home; por isso movemos o foco à mão
  protected skipToContent(event: Event): void {
    event.preventDefault();
    document.getElementById('conteudo')?.focus();
  }
}
