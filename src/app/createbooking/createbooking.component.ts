import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'createbooking',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
  ],
  styleUrls: ['createbooking.style.scss'],
  template: `
    <div class="container">
      <div class="form-container">
        <h2 class="form-title">Add a New Car</h2>
        <form (ngSubmit)="createCar()" #carForm="ngForm">
          <div class="form-group">
            <label for="model">Model</label>
            <mat-form-field appearance="outline">
              <mat-select
                id="model"
                [(ngModel)]="userCar.model"
                name="model"
                placeholder="Select car model"
                required
              >
                <mat-option *ngFor="let brand of carBrands" [value]="brand">{{
                  brand
                }}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="form-group">
            <label for="year">Year</label>
            <mat-form-field appearance="outline">
              <input
                matInput
                id="year"
                type="number"
                [(ngModel)]="userCar.year"
                name="year"
                placeholder="Enter manufacturing year"
                required
              />
            </mat-form-field>
          </div>

          <div class="form-group">
            <label for="color">Color</label>
            <input
              id="color"
              type="text"
              [(ngModel)]="userCar.color"
              name="color"
              placeholder="Enter car color"
              required
            />
          </div>

          <div class="form-group">
            <label for="price">Price</label>
            <input
              id="price"
              type="number"
              [(ngModel)]="userCar.price"
              name="price"
              placeholder="Enter car price"
              required
            />
          </div>

          <button class="submit-button" type="submit">Create</button>
        </form>
      </div>
    </div>
  `,
})
export class CreateBookingComponent {
  userCar: Car;

  carBrands: string[] = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Hyundai',
    'Nissan',
    'Mazda',
    'Subaru',
    'Kia',
    'Lexus',
    'Jeep',
    'Dodge',
    'Chrysler',
    'Porsche',
    'Land Rover',
    'Jaguar',
    'Ferrari',
    'Lamborghini',
    'Maserati',
    'Bentley',
    'Rolls-Royce',
    'Aston Martin',
    'Volvo',
    'Peugeot',
    'Renault',
    'Citroën',
    'Fiat',
    'Alfa Romeo',
    'Suzuki',
    'Mitsubishi',
    'Acura',
    'Infiniti',
    'Cadillac',
    'Buick',
    'Lincoln',
    'Tesla',
    'Mini',
    'Skoda',
    'Seat',
    'Opel',
    'Genesis',
    'Saab',
    'Lotus',
    'McLaren',
    'Bugatti',
  ];

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
