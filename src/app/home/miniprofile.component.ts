import { Component, Input, SimpleChanges } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../UserService/user.service';

@Component({
  selector: 'mini-profile',
  standalone: true,
  imports: [],
  styleUrls: ['miniprofile.style.scss'],
  template: `
    <div class="container">
      <div class="content">
        <img
          src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          style="height: 40px; width: 40px;"
        />

        <div class="username">
          {{ userName }}
        </div>
        <div class="logout-button">
          <button (click)="logout()" style="height: 30px; width: 60px;">
            Logout
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MiniProfileComponent {
  @Input() userData: any;

  userName: string | null = null;
  constructor(
    private auth: Auth,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.userName = this.userData.username;
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
