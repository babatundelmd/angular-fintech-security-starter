import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalErrorHandler } from '../services/global-error-handler.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(GlobalErrorHandler);

  return next(req).pipe(
    catchError(error => {
      errorHandler.handleError(error);
      return throwError(() => error);
    })
  );
};
