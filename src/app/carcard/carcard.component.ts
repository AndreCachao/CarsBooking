import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';
import '@angular/compiler';

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
      <div (click)="cardClick()" class="cardopen">
        <div class="cardHeader">
        <div class="carmodel">{{ car.model }}</div>
        <div>Year: {{ car.year }}</div>
        <div>Color: {{ car.color }}</div>
        <div>Price: {{ car.price }}€</div>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
  cardOpen: boolean = false;

  cardClick() {
    this.cardOpen = !this.cardOpen;
  }
}
