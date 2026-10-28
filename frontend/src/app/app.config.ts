import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'CampoCerto | Serviços rurais perto de você',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'entrar',
    title: 'Entrar | CampoCerto',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'cadastrar',
    title: 'Criar conta | CampoCerto',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-page').then((m) => m.RegisterPage),
  },
  {
    path: 'conta',
    title: 'Minha conta | CampoCerto',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account-page').then((m) => m.AccountPage),
  },
  {
    path: '**',
    title: 'Página não encontrada | CampoCerto',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
