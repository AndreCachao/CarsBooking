import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';

@Component({
  selector: 'cardcard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['carcard.style.scss'],
  template: `
    <div class="container">
      <div class="card">
        <div class="carmodel">{{ car.model }}</div>
        <div>Year: {{ car.year }}</div>
        <div>Color: {{ car.color }}</div>
        <div>Price: {{ car.price }}€</div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
}
