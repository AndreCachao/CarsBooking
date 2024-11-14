import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import {
  BookingDates,
  Car,
  CreateBookingComponent,
} from '../createbooking/createbooking.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser } from '../UserService/user.service';
import { CarCardComponent } from '../carcard/carcard.component';

@Component({
  selector: 'mybookingscomponent',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    HomeComponent,
    BookCarComponent,
    CreateBookingComponent,
    MiniProfileComponent,
    AsyncPipe,
    CarCardComponent,
    CommonModule,
  ],
  template: `
    <div
      class="flex flex-col min-h-screen items-center bg-gradient-to-br from-amber-500 to-yellow-400"
    >
      <div class="font-bold text-5xl mt-4">My Booked Cars</div>
      <div
        class="flex flex-col overflow-y-auto items-center w-4/5 mt-8 bg-white rounded-3xl shadow-lg"
        style="height: 70vh"
      >
        <div class="mt-8 w-[95%]" *ngFor="let car of cars">
          <cardcard
            [car]="car"
            [userData]="userData"
            [booking]="false"
          ></cardcard>
        </div>
      </div>
    </div>
    <footer class="bg-gray-800 text-white py-6">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2024 MyBrand. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class MyBookingsComponent {
  @Input() userData: AppUser;
  cars: Car[] = [];
  carsWithUserDates: Car[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      this.cars = [];
      if (this.cars.length === 0) {
        this.userData?.carsBooked.forEach((carId) => {
          this.firestore
            .collection<Car>('cars')
            .doc(carId.id)
            .get()
            .subscribe((car) => {
              this.cars.push({
                ...car.data(),
                bookingsDates: [
                  {
                    startDate: carId.startDate,
                    endDate: carId.endDate,
                  },
                ],
              });
            });
        });
      }
    }
  }
}
