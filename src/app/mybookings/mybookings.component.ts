import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import {
  Car,
  CreateBookingComponent,
} from '../createbooking/createbooking.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser } from '../UserService/user.service';
import { CarCardComponent } from '../carcard/carcard.component';

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
    CarCardComponent,
    CommonModule,
  ],
  template: `
    <div class="container">
      <h2>Your Cars</h2>
      <div class="listCards" *ngFor="let car of cars">
        <cardcard [car]="car" [userData]="userData"></cardcard>
      </div>
    </div>
  `,
})
export class MyBookingsComponent {
  @Input() userData: AppUser;
  cars: Car[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      this.cars = [];
      if (this.cars.length === 0) {
        this.userData?.carsIds.forEach((carId) => {
          this.firestore
            .collection<Car>('cars')
            .doc(carId)
            .get()
            .subscribe((car) => {
              this.cars.push(car.data());
            });
        });
      }
    }
  }
}
