import { Component, Input, SimpleChanges } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppUser, UserService } from '../UserService/user.service';

@Component({
  selector: 'mini-profile',
  standalone: true,
  imports: [],
  styleUrls: ['miniprofile.style.scss'],
  template: `
    <div class="profile-container">
      <img
        class="profile-picture"
        src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Profile Picture"
      />

      <div class="profile-info">
        <div class="username">
          {{ userName }}
        </div>
        <button class="logout-button" (click)="logout()">Logout</button>
      </div>
    </div>
  `,
})
export class MiniProfileComponent {
  @Input() userData: AppUser;

  constructor(
    private auth: Auth,
    private router: Router,
    public userService: UserService
  ) {}

  userName: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      this.userName = this.userData?.username || 'Guest';
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
