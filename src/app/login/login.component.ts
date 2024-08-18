import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  styleUrls: ['login.component.scss'],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form (ngSubmit)="login()">
          <div class="input-group">
            <label for="username">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
            />
          </div>

          <button type="submit" class="login-button">Login</button>
          <div style="margin-top: 10px;">
            <span (click)="redirectToRegisterPage()" class="clickable-text"
              >Don't have an account? Create one!</span
            >
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
