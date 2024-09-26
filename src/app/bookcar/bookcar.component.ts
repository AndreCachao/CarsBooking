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
      <div class="listCards" *ngFor="let car of cars$ | async">
        <cardcard [car]="car" [userData]="userData"></cardcard>
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

  // selectCar(car: Car): void {
  //   // Toggle selection of the car
  //   if (this.userData.userLevel >= 40) {
  //     this.selectedCar = this.selectedCar === car ? null : car;
  //   }
  // }
}
