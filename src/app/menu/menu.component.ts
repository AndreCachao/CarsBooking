import { MyBookingsComponent } from './../mybookings/mybookings.component';
import { AppUser, UserService } from './../UserService/user.service';
import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import { CreateBookingComponent } from '../createbooking/createbooking.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  styleUrls: ['menu.style.scss'],
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    HomeComponent,
    BookCarComponent,
    CreateBookingComponent,
    ContactsComponent,
    MiniProfileComponent,
    AsyncPipe,
    MyBookingsComponent,
  ],
  template: `
    <mat-tab-group id="tab-group" dynamicHeight="true">
      <mat-tab label="Home">
        <home></home>
      </mat-tab>
      <mat-tab label="Book a Car">
        <bookcar [userData]="userData$ | async"></bookcar>
      </mat-tab>
      <mat-tab label="Your Cars">
        <mybookingscomponent
          [userData]="userData$ | async"
        ></mybookingscomponent>
      </mat-tab>
      <mat-tab label="Contacts">
        <contacts></contacts>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class MenuComponent {
  userData$: Observable<AppUser>;

  constructor(private userService: UserService) {
    this.userData$ = this.userService.userData$;
  }

  ngOnInit(): void {}
}
