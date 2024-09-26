import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';
import '@angular/compiler';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser } from '../UserService/user.service';

@Component({
  selector: 'cardcard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['carcard.style.scss'],
  template: `
    <div *ngIf="!cardOpen" class="smallcontainer">
      <div (click)="cardClick()" class="cardclosed">
        <div class="carmodel">{{ car.model }}</div>
        <div>Year: {{ car.year }}</div>
        <div>Color: {{ car.color }}</div>
        <div>Price: {{ car.price }}€</div>
      </div>
    </div>

    <div *ngIf="cardOpen" class="bigcontainer">
      <div class="cardopen">
        <div class="cardHeader" (click)="cardClick()">
          <div class="carmodel">{{ car.model }}</div>
          <div>Year: {{ car.year }}</div>
          <div>Color: {{ car.color }}</div>
          <div>Price: {{ car.price }}€</div>
        </div>
        <button (click)="deleteCar(car)">Remove</button>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
  @Input() userData: AppUser;
  cardOpen: boolean = false;

  constructor(private firestore: AngularFirestore) {}

  cardClick() {
    this.cardOpen = !this.cardOpen;
  }

  deleteCar(car: Car): void {
    // Implement the logic to remove the car from the database
    this.firestore
      .collection<Car>('cars')
      .doc(car.id)
      .delete()
      .then(() => {
        console.log(`${car.model} removed successfully`);
      });

    // Implement the logic to remove the car from the user's list of cars
    this.firestore
      .collection('users')
      .doc(this.userData.email)
      .update({
        carsIds: this.userData.carsIds.filter((id) => id !== car.id),
      })
      .then((id) => {
        console.log(`${id} removed from user's list of cars`);
      });
  }
}
