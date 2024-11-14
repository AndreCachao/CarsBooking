import { UserService } from './../UserService/user.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car, Data } from '../createbooking/createbooking.component';
import '@angular/compiler';
import { AppUser } from '../UserService/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogBookCarComponent } from './mat-dialog-book-car/mat-dialog-book-car.component';
import { MatCalendar } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'cardcard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCalendar,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['carcard.style.scss'],
  template: `
    <div
      *ngIf="!cardOpen"
      class="flex justify-center items-center h-28 w-full p-4 transition-all duration-300 ease-in-out hover:h-32"
    >
      <div
        (click)="cardClick()"
        class="flex items-center p-5 w-full h-full border border-gray-200 rounded-lg bg-gradient-to-r from-white via-gray-50 to-gray-100 shadow-md cursor-pointer transform hover:scale-105 hover:shadow-lg hover:border-amber-400 transition-transform duration-200"
      >
        <div class="flex-1 text-2xl font-semibold text-amber-600">
          {{ car.model }}
        </div>
        <div class="flex-1 text-gray-600">Year: {{ car.year }}</div>
        <div class="flex-1 text-gray-600">Color: {{ car.color.name }}</div>
        <div class="flex-1 text-gray-600">Price per day: {{ car.price }}€</div>
        <div *ngIf="!booking" class="flex-1 text-sm text-gray-500">
          <div
            class="flex-1 font-black text-lg"
            *ngFor="let date of car.bookingsDates"
          >
            {{ transformData(date.startDate) }} |
            {{ transformData(date.endDate) }}
          </div>
        </div>
      </div>
    </div>

    <div
      *ngIf="cardOpen"
      class="flex justify-center items-center h-[40vh] w-full p-6 transition-all duration-300 ease-in-out"
    >
      <div
        class="flex flex-col items-center p-6 w-full h-full border border-amber-400 rounded-xl bg-white shadow-xl"
      >
        <div
          class="flex items-center justify-between w-full mb-4 pb-4 border-b border-gray-200 text-gray-700 cursor-pointer"
          (click)="cardClick()"
        >
          <div class="flex-1 text-2xl font-semibold text-amber-600">
            {{ car.model }}
          </div>
          <div class="flex-1 text-gray-600">Year: {{ car.year }}</div>
          <div class="flex-1 text-gray-600">Color: {{ car.color.name }}</div>
          <div class="flex-1 text-gray-600">
            Price per day: {{ car.price }}€
          </div>
          <div *ngIf="!booking" class="flex-1 text-sm text-gray-500">
            <div
              class="flex-1 font-black text-lg"
              *ngFor="let date of car.bookingsDates"
            >
              {{ transformData(date.startDate) }} |
              {{ transformData(date.endDate) }}
            </div>
          </div>
        </div>

        <div class="flex w-full h-full space-x-6">
          <div class="flex flex-col justify-center items-center flex-1">
            <div class="text-gray-700 font-medium">
              License Plate: {{ car.licensePlate }}
            </div>
            <div class="text-gray-700 font-medium">Owner: {{ car.owner }}</div>
            <button
              *ngIf="car.owner === userData.email"
              class="bg-red-500 text-white py-2 px-6 rounded-full mt-5 hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
              (click)="userService.deleteCar(car, userData)"
            >
              Remove
            </button>
          </div>

          <div
            *ngIf="!booking"
            class="flex flex-col flex-1 text-sm text-gray-500 items-center"
          >
            <div class="text-gray-700 font-medium">My Booked Dates:</div>
            <div
              class="flex-1 font-black text-lg"
              *ngFor="let date of car.bookingsDates"
            >
              {{ transformData(date.startDate) }} |
              {{ transformData(date.endDate) }}
            </div>
          </div>

          <div
            *ngIf="booking && car.owner !== userData.email"
            class="calendar items-center w-full"
          >
            <div class="flex flex-col items-center w-9/12 space-y-4">
              <mat-form-field appearance="fill" class="w-7/12">
                <mat-label>Select Date Range for Booking</mat-label>
                <mat-date-range-input
                  [formGroup]="bookingForm"
                  [rangePicker]="picker"
                  [min]="yesterday"
                  [dateFilter]="dateFilter"
                >
                  <input
                    matStartDate
                    formControlName="start"
                    placeholder="Start date"
                  />
                  <input
                    matEndDate
                    formControlName="end"
                    placeholder="End date"
                  />
                </mat-date-range-input>
                <mat-datepicker-toggle
                  matSuffix
                  [for]="picker"
                ></mat-datepicker-toggle>
                <mat-date-range-picker #picker></mat-date-range-picker>
              </mat-form-field>

              <button
                class="bg-neutral-800 hover:bg-gray-700 text-amber-500 font-semibold py-3 px-8 rounded-lg transition-transform duration-200 transform hover:scale-105"
                (click)="onSubmit()"
              >
                Book In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
  @Input() userData: AppUser;
  @Input() booking: boolean;
  cardOpen: boolean = false;
  cardDisabledDates: Date[];
  yesterday = new Date();

  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    // Initialize Calendar Form
    this.bookingForm = this.fb.group(
      {
        start: [null, Validators.required],
        end: [null, Validators.required],
      },
      { validators: this.dateRangeValidator }
    );

    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['car']) {
      // Initialize the disabled dates array
      this.cardDisabledDates = []; // Clear previous dates

      this.car.bookingsDates?.forEach((booking) => {
        const startDate = new Date(booking.startDate.seconds * 1000);
        const endDate = new Date(booking.endDate.seconds * 1000);

        let currentDate = new Date(startDate);

        // Use a temporary array to collect dates
        const tempDisabledDates: Date[] = [];

        // Iterate from startDate to endDate
        while (currentDate <= endDate) {
          // Push the date as a string to temp array
          tempDisabledDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Append the temporary disabled dates to the main array
        this.cardDisabledDates.push(...tempDisabledDates);
      });
    }
  }

  transformData(date: { seconds: number }): string {
    const formattedDate = new Date(date.seconds * 1000);
    return formattedDate.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    // Convert date to a comparable format (e.g., ISO string)
    const dateString = date.toISOString();

    // Check if the formatted date string is in the disabled dates array
    const isDisabled = this.cardDisabledDates.some(
      (disabledDate) => disabledDate.toISOString() === dateString
    );

    return !isDisabled;
  };

  // Submit function
  onSubmit() {
    if (this.bookingForm.valid) {
      const startDate: Date = this.bookingForm.value.start;
      const endDate: Date = this.bookingForm.value.end;

      const carRef = this.firestore.collection('cars').doc(this.car.id);
      const userRef = this.firestore
        .collection('users')
        .doc(this.userData.email);

      if (this.car.bookingsDates) {
        carRef.update({
          ...this.car,
          bookingsDates: [
            ...this.car.bookingsDates,
            { startDate: startDate, endDate: endDate },
          ],
        });
      } else {
        carRef.update({
          ...this.car,
          bookingsDates: [{ startDate: startDate, endDate: endDate }],
        });
      }

      if (this.userData.carsBooked) {
        userRef
          .update({
            ...this.userData,
            carsBooked: [
              ...this.userData.carsBooked,
              { id: this.car.id, startDate: startDate, endDate: endDate },
            ],
          })
          .then(() => {
            console.log('User data added to Firestore');
          })
          .catch((error) => {
            console.error('Error adding user data to Firestore:', error);
          });
      } else {
        userRef
          .update({
            ...this.userData,
            carsBooked: [
              { id: this.car.id, startDate: startDate, endDate: endDate },
            ],
          })
          .then(() => {
            console.log('User data added to Firestore');
          })
          .catch((error) => {
            console.error('Error adding user data to Firestore:', error);
          });
      }
    }
  }
  // Custom validator to ensure end date is after start date
  dateRangeValidator(group: FormGroup) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    return start && end && start <= end ? null : { dateRangeInvalid: true };
  }

  cardClick() {
    this.cardOpen = !this.cardOpen;
  }

  bookIn() {
    this.dialog.open(MatDialogBookCarComponent, {
      width: '300px',
      height: '400px',
    });
  }
}
