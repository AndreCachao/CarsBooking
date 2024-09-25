import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import { CreateBookingComponent } from '../createbooking/createbooking.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'mybookingscomponent',
  styleUrls: ['mybookings.style.scss'],
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
  ],
  template: ` <div class="container"></div> `,
})
export class MyBookingsComponent {
  constructor() {}

  ngOnInit(): void {}
}
