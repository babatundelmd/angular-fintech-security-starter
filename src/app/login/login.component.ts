import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get emailControl() {
    return this.loginForm.get('email')!;
  }
  get passwordControl() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    this.router.navigate(['/dashboard']);

    // if (this.loginForm.valid) {
    //   // this.isLoading.set(true);
    //   this.router.navigate(['/dashboard']);
    //   this.authService.login(this.loginForm.value).subscribe({
    //     next: (response) => {
    //       this.isLoading.set(false);
    //       if (response) {
    //         this.router.navigate(['/dashboard']);
    //       }
    //     },
    //     error: (error) => {
    //       this.isLoading.set(false);
    //       console.error('Login failed:', error);
    //     }
    //   });
    // }
  }
}
