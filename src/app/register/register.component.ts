import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  styleUrls: ['./register.component.scss'],
  template: `
    <div class="register-container">
      <div class="register-box">
        <h2>Register</h2>
        <form (ngSubmit)="register()">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              required
            />
          </div>

          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
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



          <button type="submit" class="register-button">Register</button>

          <div style="margin-top: 10px;">
            <span (click)="redirectToLoginPage()" class="clickable-text"
              >Already have an account? Log in!</span
            >
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (this.username == '') {
      alert('Please enter username');
      return;
    }

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.username, this.email, this.password);

    this.username = '';
    this.email = '';
    this.password = '';
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }
}
