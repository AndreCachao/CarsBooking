import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

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
  styleUrls: [],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form #loginForm="ngForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input
            matInput
            type="email"
            [(ngModel)]="email"
            name="email"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            [(ngModel)]="password"
            name="password"
            required
          />
        </mat-form-field>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          (click)="login()"
          [disabled]="!loginForm.form.valid"
        >
          Login
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

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
}
