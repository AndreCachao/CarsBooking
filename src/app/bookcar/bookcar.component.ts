import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../mybookings/mybookings.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'bookcar',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to the imports array
  styleUrls: ['bookcar.style.scss'],
  template: `
    <div class="container">
      <div class="row table-heading">
        <div class="collumn" *ngFor="let header of headers">{{ header }}</div>
      </div>
      <div class="values" *ngFor="let car of cars$ | async">
        <div class="value">{{ car.model }}</div>
        <div class="value">{{ car.year }}</div>
        <div class="value">{{ car.color }}</div>
        <div class="value">{{ car.price }}</div>
      </div>
      <!-- <h2>All Cars</h2>
      <ul>
        
      </ul>
    </div> -->
    </div>
  `,
})
export class BookCarComponent {
  cars$: Observable<Car[]>;
  headers: string[] = ['Model', 'Year', 'Color', 'Price'];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.cars$ = this.firestore.collection<Car>('cars').valueChanges();
  }
}
