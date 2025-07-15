import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  user = computed(() => this.authService.user());
  isAdmin = computed(() => this.authService.getUserRole() === 'admin');

  logout(): void {
    this.authService.logout();
  }
}
