import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);
  private isLoggedIn = signal(false);

  user = computed(() => this.currentUser());
  isAuthenticated = computed(() => this.isLoggedIn());

  login(credentials: LoginCredentials): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap((response) => {
        this.setAuthState(response.user);
        // Store tokens in HTTP-only cookies via backend
        // Never store JWT in localStorage for security
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => {
        this.clearAuthState();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        this.clearAuthState();
        this.router.navigate(['/login']);
      },
    });
  }

  refreshToken(): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>('/api/auth/refresh', {}).pipe(
      tap((response) => {
        this.setAuthState(response.user);
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        this.logout();
        return of(null);
      })
    );
  }

  getUserRole(): string | null {
    return this.currentUser()?.role || null;
  }

  private setAuthState(user: User): void {
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  private clearAuthState(): void {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  checkAuthStatus(): boolean {
    return this.isLoggedIn();
  }
}
