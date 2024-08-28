import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'mybookings',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['mybookings.style.scss'],
  template: `
    <div class="container">
      <div class="forms">
        <p class="display-setup-subtitle">Model</p>
        <input type="text" [(ngModel)]="userCar.model" placeholder="Input 1" />
        <p class="display-setup-subtitle">Year</p>
        <input type="text" [(ngModel)]="userCar.year" placeholder="Input 2" />
        <p class="display-setup-subtitle">Color</p>
        <input type="text" [(ngModel)]="userCar.color" placeholder="Input 3" />
        <p class="display-setup-subtitle">Price</p>
        <input type="text" [(ngModel)]="userCar.price" placeholder="Input 4" />
        <button (click)="createCar()">Create</button>
      </div>
    </div>
  `,
})
export class MyBookingsComponent {
  userCar: Car;

  ngOnInit(): void {
    this.userCar = {
      id: '0',
      model: '',
      year: null,
      color: '',
      price: null,
    };
  }

  constructor(private firestore: AngularFirestore) {}

  createCar(): void {
    if (
      !this.userCar.model ||
      !this.userCar.year ||
      !this.userCar.color ||
      !this.userCar.price
    ) {
      alert('Please fill all the fields');
      return;
    }

    // Get a reference to a new document with an auto-generated ID
    const userRef = this.firestore.collection('cars').doc();

    // Set the unique ID to the userCar object
    this.userCar.id = userRef.ref.id;

    userRef.set({
      id: this.userCar.id,
      model: this.userCar.model,
      year: this.userCar.year,
      color: this.userCar.color,
      price: this.userCar.price,
    });
  }
}

export interface Car {
  id: string;
  model: string;
  year: number;
  color: string;
  price: number;
}
