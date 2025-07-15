import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  // {
  //   path: 'users',
  //   loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent)
  // },
  // {
  //   path: 'audit',
  //   loadComponent: () => import('./audit-logs/audit-logs.component').then(m => m.AuditLogsComponent)
  // }
];
