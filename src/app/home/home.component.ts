import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  styleUrls: ['home.style.scss'],
  template: `
    <div class="container">
      <div class="content">
        <h1>Welcome to Car Booking Service</h1>
        <p>Use the tabs to navigate through the sections.</p>
      </div>
      ewaea
    </div>
  `,
})
export class HomeComponent {
  title = 'my-angular-app';
}
