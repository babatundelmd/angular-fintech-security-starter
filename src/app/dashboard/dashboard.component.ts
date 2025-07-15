import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private authService = inject(AuthService);

  user = computed(() => this.authService.user());
  balance = signal(25000);
  recentTransactions = signal(12);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Implement dashboard data loading
    // This would typically come from your API
  }
}
