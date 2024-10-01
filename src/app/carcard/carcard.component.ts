import { UserService } from './../UserService/user.service';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';
import '@angular/compiler';
import { AppUser } from '../UserService/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendar } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'cardcard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCalendar,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  styleUrls: ['carcard.style.scss'],
  template: `
    <div *ngIf="!cardOpen" class="smallcontainer">
      <div (click)="cardClick()" class="cardclosed">
        <div class="carmodel">{{ car.model }}</div>
        <div>Year: {{ car.year }}</div>
        <div>Color: {{ car.color.name }}</div>
        <div>Price per day: {{ car.price }}€</div>
      </div>
    </div>

    <div *ngIf="cardOpen" class="bigcontainer">
      <div class="cardopen">
        <div class="cardHeader" (click)="cardClick()">
          <div class="carmodel">{{ car.model }}</div>
          <div class="header-div">Year: {{ car.year }}</div>
          <div class="header-div">Color: {{ car.color.name }}</div>
          <div class="header-div">Price per day: {{ car.price }}€</div>
        </div>

        <div class="card-content">
          <div class="card-left">
            <div>License Plate: {{ car.licensePlate }}</div>
            <div>Owner: {{ car.owner }}</div>

            <button
              *ngIf="car.owner === userData.email"
              class="remove-button"
              (click)="userService.deleteCar(car, userData)"
            >
              Remove
            </button>
          </div>
          <div class="calendar">
            <div>
              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="fill">
                  <mat-label>Select Date Range for Booking</mat-label>
                  <mat-date-range-input
                    [formGroup]="bookingForm"
                    [rangePicker]="picker"
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

                <!-- <button
                  mat-raised-button
                  color="primary"
                  type="submit"
                  [disabled]="!bookingForm.valid"
                >
                  Book Car
                </button> -->
              </form>
            </div>

            <!-- <mat-error *ngIf="bookingForm.hasError('dateRangeInvalid')">
              End date must be after start date.
            </mat-error> -->
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
  bookingForm: FormGroup;

  constructor(public userService: UserService, private fb: FormBuilder) {
    // Initialize the booking form group
    this.bookingForm = this.fb.group(
      {
        start: [null, Validators.required],
        end: [null, Validators.required],
      },
      { validators: this.dateRangeValidator }
    );
  }

  cardClick() {
    this.cardOpen = !this.cardOpen;
  }

  // Custom validator to ensure end date is after start date
  dateRangeValidator(group: FormGroup) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    return start && end && start <= end ? null : { dateRangeInvalid: true };
  }

  // Submit the booking form
  onSubmit() {
    if (this.bookingForm.valid) {
      const startDate: Date = this.bookingForm.value.start;
      const endDate: Date = this.bookingForm.value.end;
      console.log('Booking from:', startDate, 'to:', endDate);
      // Call a service to handle booking logic, e.g., UserService.createBooking()
      // this.userService
      //   .bookCar(this.car, this.userData, startDate, endDate)
      //   .subscribe(
      //     (response) => {
      //       console.log('Booking successful!', response);
      //       // Handle successful booking, show a notification if needed
      //     },
      //     (error) => {
      //       console.error('Booking failed!', error);
      //       // Handle error, show an error message if needed
      //     }
      //   );
    }
  }
}
