import { Injectable, ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: any): void {
    console.error('Global error caught:', error);
    const userFriendlyMessage = this.getUserFriendlyMessage(error);
    this.logToMonitoring(error);
    this.showUserNotification(userFriendlyMessage);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  }

  private getUserFriendlyMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          return 'Session expired. Please log in again.';
        case 403:
          return "Access denied. You don't have permission to perform this action.";
        case 404:
          return 'The requested resource was not found.';
        case 500:
          return 'A server error occurred. Please try again later.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }

  private logToMonitoring(error: any): void {
    // Implement your logging service here
    // Example: Send to monitoring service like Sentry, LogRocket, etc.
  }

  private showUserNotification(message: string): void {
    // Implement your notification service here
    // Example: Show toast, modal, or banner notification
  }
}
