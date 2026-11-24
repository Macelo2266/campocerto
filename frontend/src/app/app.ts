import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './core/auth/auth.service';
import { Avatar } from './shared/avatar/avatar';
import { Icon } from './shared/icon/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, Avatar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly year = new Date().getFullYear();

  /** Menu do cabeçalho no celular (no computador o menu fica sempre visível). */
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected logout(): void {
    this.closeMenu();
    this.auth.logout();
    void this.router.navigateByUrl('/');
  }

  // Um link "#conteudo" com <base href="/"> levaria para a home; por isso movemos o foco à mão
  protected skipToContent(event: Event): void {
    event.preventDefault();
    document.getElementById('conteudo')?.focus();
  }
}
