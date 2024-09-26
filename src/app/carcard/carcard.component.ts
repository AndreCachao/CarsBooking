import { UserService } from './../UserService/user.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';
import '@angular/compiler';
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
        <button
          class="remove-button"
          (click)="userService.deleteCar(car, userData)"
        >
          Remove
        </button>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
  @Input() userData: AppUser;
  cardOpen: boolean = false;

  constructor(public userService: UserService) {}

  cardClick() {
    this.cardOpen = !this.cardOpen;
  }
}
