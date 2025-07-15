import { HttpInterceptorFn } from '@angular/common/http';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  const secureReq = req.clone({
    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

  return next(secureReq);
};
