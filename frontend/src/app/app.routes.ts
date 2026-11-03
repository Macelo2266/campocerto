import { Routes } from '@angular/router';

import { authGuard, guestGuard, roleGuard } from './core/auth/auth-guard';
import { unsavedChangesGuard } from './core/forms/unsaved-changes-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'CampoCerto | Serviços rurais perto de você',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'profissionais',
    title: 'Encontrar profissionais | CampoCerto',
    loadComponent: () => import('./features/providers/search-page').then((m) => m.SearchPage),
  },
  {
    path: 'profissionais/:id',
    title: 'Profissional | CampoCerto',
    loadComponent: () =>
      import('./features/providers/provider-profile-page').then((m) => m.ProviderProfilePage),
  },
  {
    path: 'profissionais/:id/solicitar',
    title: 'Pedir orçamento | CampoCerto',
    canActivate: [authGuard, roleGuard('FARMER')],
    loadComponent: () => import('./features/requests/request-form-page').then((m) => m.RequestFormPage),
  },
  {
    path: 'solicitacoes',
    title: 'Minhas solicitações | CampoCerto',
    canActivate: [authGuard, roleGuard('FARMER')],
    loadComponent: () => import('./features/requests/my-requests-page').then((m) => m.MyRequestsPage),
  },
  {
    path: 'solicitacoes/:id',
    title: 'Solicitação | CampoCerto',
    canActivate: [authGuard],
    loadComponent: () => import('./features/requests/request-detail-page').then((m) => m.RequestDetailPage),
  },
  {
    path: 'painel',
    title: 'Painel do prestador | CampoCerto',
    canActivate: [authGuard, roleGuard('PROVIDER')],
    loadComponent: () => import('./features/provider-panel/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'painel/perfil',
    title: 'Meu perfil profissional | CampoCerto',
    canActivate: [authGuard, roleGuard('PROVIDER')],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./features/provider-panel/profile-form-page').then((m) => m.ProfileFormPage),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard('ADMIN')],
    loadComponent: () => import('./features/admin/admin-shell').then((m) => m.AdminShell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Resumo | Administração | CampoCerto',
        loadComponent: () => import('./features/admin/stats-page').then((m) => m.AdminStatsPage),
      },
      {
        path: 'usuarios',
        title: 'Usuários | Administração | CampoCerto',
        loadComponent: () => import('./features/admin/users-page').then((m) => m.AdminUsersPage),
      },
      {
        path: 'avaliacoes',
        title: 'Avaliações | Administração | CampoCerto',
        loadComponent: () => import('./features/admin/reviews-page').then((m) => m.AdminReviewsPage),
      },
      {
        path: 'solicitacoes',
        title: 'Solicitações | Administração | CampoCerto',
        loadComponent: () => import('./features/admin/requests-page').then((m) => m.AdminRequestsPage),
      },
      {
        path: 'categorias',
        title: 'Categorias | Administração | CampoCerto',
        loadComponent: () => import('./features/admin/categories-page').then((m) => m.AdminCategoriesPage),
      },
    ],
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
