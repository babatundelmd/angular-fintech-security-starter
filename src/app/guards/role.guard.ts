import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as string[];
  const userRole = authService.getUserRole();

  if (requiredRoles && userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
