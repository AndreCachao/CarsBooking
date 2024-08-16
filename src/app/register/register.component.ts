import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  styleUrls: [],
  template: `
    <h1>Register</h1>
    <!-- 
    <div>
      <input type="text" placeholder="Username" formControlName="username" />
    </div>
    <div>
      <input type="text" placeholder="Email" formControlName="email" />
    </div>
    <div>
      <input
        type="password"
        placeholder="Password"
        formControlName="password"
      />
    </div>
    <div>
      <button type="submit">Sign Up</button>
    </div> -->
  `,
})
export class RegisterComponent {}
