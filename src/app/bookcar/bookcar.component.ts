import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../createbooking/createbooking.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { AppUser } from '../UserService/user.service';
import { CarCardComponent } from '../carcard/carcard.component';

@Component({
  selector: 'bookcar',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  styleUrls: ['bookcar.style.scss'],
  template: `
    <div class="container">
      <!-- <div class="row table-heading">
        <div class="collumn" *ngFor="let header of headers">{{ header }}</div>
      </div> -->
      <div
        class="values"
        (click)="selectCar(car)"
        *ngFor="let car of cars$ | async"
      >
        <!-- <div class="value">
          {{ car.model }}
        </div>
        <div class="value">
          {{ car.year }}
        </div>
        <div class="value">
          {{ car.color }}
        </div>
        <div class="value">
          {{ car.price }}
        </div>
        <div class="remove-button" *ngIf="selectedCar === car">
          <button (click)="removeCar(car)">Remove</button>
        </div> -->
        <cardcard [car]="car"></cardcard>
      </div>

      <div class="footer">
        <p>&copy; 2024 Car Booking Service. All rights reserved.</p>
      </div>
    </div>
  `,
})
export class BookCarComponent {
  @Input() userData: AppUser;
  cars$: Observable<Car[]>;
  headers: string[] = ['Model', 'Year', 'Color', 'Price'];
  selectedCar: Car = null;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.cars$ = this.firestore.collection<Car>('cars').valueChanges();
  }

  selectCar(car: Car): void {
    // Toggle selection of the car
    if (this.userData.userLevel >= 40) {
      this.selectedCar = this.selectedCar === car ? null : car;
    }
  }

  removeCar(car: Car): void {
    // Implement the logic to remove the car from the database
    this.firestore
      .collection<Car>('cars')
      .doc(car.id)
      .delete()
      .then(() => {
        console.log(`${car.model} removed successfully`);
        // Reset the selected car after removal
        this.selectedCar = null;
      });
  }
}
