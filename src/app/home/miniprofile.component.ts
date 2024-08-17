import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'mini-profile',
  standalone: true,
  imports: [],
  styleUrls: ['miniprofile.style.scss'],
  template: `
    <div class="container">
      {{ userName }}
      <div class="logout-button">
        <button (click)="logout()" style="height: 30px; width: 60px;">
          Logout
        </button>
      </div>
    </div>
  `,
})
export class MiniProfileComponent {
  userName: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userName = user.email; // Access the user's display name
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
