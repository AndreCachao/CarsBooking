import { Component } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import { MyBookingsComponent } from '../mybookings/mybookings.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MiniProfileComponent } from '../home/miniprofile.component';

@Component({
  selector: 'app-menu',
  styleUrls: ['menu.style.scss'],
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    HomeComponent,
    BookCarComponent,
    MyBookingsComponent,
    ContactsComponent,
    MiniProfileComponent,
  ],
  template: `
    <div class="container">
      <mini-profile></mini-profile>
      <mat-tab-group>
        <mat-tab label="Home">
          <home></home>
        </mat-tab>
        <mat-tab label="Book a Car">
          <bookcar></bookcar>
        </mat-tab>
        <mat-tab label="My Books">
          <mybookings></mybookings>
        </mat-tab>
        <mat-tab label="Contacts">
          <contacts></contacts>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class MenuComponent {
  constructor() {
    // Initialization logic can go here
  }
}
