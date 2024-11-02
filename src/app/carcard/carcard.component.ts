import { start } from 'repl';
import { UserService } from './../UserService/user.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';
import '@angular/compiler';
import { AppUser } from '../UserService/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogBookCarComponent } from './mat-dialog-book-car/mat-dialog-book-car.component';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
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
      class="flex justify-center items-center h-24 w-full p-2 transition-all duration-300 ease-in-out hover:h-28"
    >
      <div
        (click)="cardClick()"
        class="flex items-center items-center p-5 w-full h-full border-2 border-gray-300 rounded-lg bg-white shadow-lg cursor-pointer transform hover:translate-y-[-5px] hover:border-amber-500"
      >
        <div class="flex-1 text-4xl font-bold text-amber-500">
          {{ car.model }}
        </div>
        <div class="flex-1">Year: {{ car.year }}</div>
        <div class="flex-1">Color: {{ car.color.name }}</div>
        <div class="flex-1">Price per day: {{ car.price }}€</div>
      </div>
    </div>

    <div
      *ngIf="cardOpen"
      class="flex justify-center items-center h-[35vh] w-full p-5 transition-all duration-300 ease-in-out"
    >
      <div
        class="flex flex-col items-center p-5 w-full h-full border-2 border-amber-500 rounded-lg bg-white shadow-lg"
      >
        <div
          class="flex items-center justify-between w-full mb-4 pb-3 border-b border-gray-300 text-gray-800 cursor-pointer"
          (click)="cardClick()"
        >
          <div class="flex-1 text-4xl font-bold text-amber-500">
            {{ car.model }}
          </div>
          <div class="flex-1">Year: {{ car.year }}</div>
          <div class="flex-1">Color: {{ car.color.name }}</div>
          <div class="flex-1">Price per day: {{ car.price }}€</div>
        </div>

        <div class="flex w-full h-full">
          <div class="flex flex-col justify-center items-center flex-1">
            <div>License Plate: {{ car.licensePlate }}</div>
            <div>Owner: {{ car.owner }}</div>
            <button
              *ngIf="car.owner === userData.email"
              class="bg-red-500 text-white py-2 px-5 rounded-full mt-5 hover:bg-red-600 transform hover:scale-105"
              (click)="userService.deleteCar(car, userData)"
            >
              Remove
            </button>
          </div>

          <div class="calendar">
            <div>
              <mat-form-field appearance="fill">
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
              <div class="flex justify-center items-center flex-1">
                <div>
                  <button
                    class="bg-neutral-900 hover:bg-stone-800 text-amber-500 font-semibold py-3 px-6 rounded-lg"
                    (click)="onSubmit()"
                  >
                    Book In
                  </button>
                </div>
              </div>
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
    // Initialize the booking form group
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
          tempDisabledDates.push(new Date(currentDate)); // Use new Date to avoid reference issues
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Append the temporary disabled dates to the main array
        this.cardDisabledDates.push(...tempDisabledDates);
      });

      // Optional: To debug or check populated dates
      console.log(this.cardDisabledDates);
    }
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
