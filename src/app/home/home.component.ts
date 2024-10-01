import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MiniProfileComponent } from './miniprofile.component';
import { AppUser, UserService } from '../UserService/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MiniProfileComponent, AsyncPipe],
  styleUrls: ['home.style.scss'],
  template: `
    <div class="container">
      <div class="miniprofile">
        <mini-profile [userData]="userData$ | async"></mini-profile>
      </div>

      <div class="content">
        <h2>Welcome to Car Booking Service</h2>
        <p>
          Book your ride with ease and comfort. Navigate through the sections to
          find the best options for you.
        </p>

        <div class="button-group">
          <button class="primary-btn" (click)="navigateTo('createbooking')">
            Register your Car
          </button>
          <button class="secondary-btn" (click)="navigateTo('profile')">
            Profile
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  title = 'Car Booking Service';

  userData$: Observable<AppUser>;

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {
    this.userData$ = this.userService.userData$;
  }

  navigateTo(section: string) {
    this.router.navigate([section]);
  }
}
