import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../createbooking/createbooking.component';

@Component({
  selector: 'cardcard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['carcard.style.scss'],
  template: `
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    <div class="container">
      <div>{{ car.model }}</div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car: Car;
}
