import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MiniProfileComponent } from './miniprofile.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MiniProfileComponent],
  styleUrls: ['home.style.scss'],
  template: `
    <div class="container">
      <div class="content">
        <h1>Welcome to Car Booking Service</h1>
        <p>Use the tabs to navigate through the sections.</p>
      </div>
  
    </div>
  `,
})
export class HomeComponent {
  title = 'my-angular-app';

  constructor(private auth: Auth, private router: Router) {}
}
