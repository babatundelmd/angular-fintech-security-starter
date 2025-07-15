import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['user', 'admin'] },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
