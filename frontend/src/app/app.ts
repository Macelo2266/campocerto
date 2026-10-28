import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly year = new Date().getFullYear();

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
