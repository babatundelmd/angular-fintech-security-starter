import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { errorInterceptor } from './app/interceptors/error.interceptor';
import { securityInterceptor } from './app/interceptors/security.interceptor';
import { GlobalErrorHandler } from './app/services/global-error-handler.service';


const environment = {
  production: false,
  apiUrl: 'https://api.example.com'
};

if (environment.production) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        securityInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
});
