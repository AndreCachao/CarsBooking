import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppUser, UserService } from '../UserService/user.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'createbooking',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
  ],
  styleUrls: ['createbooking.style.scss'],
  template: `
    <div class="container">
      <div class="upper-container">
        <button (click)="navigateTo('menu')" class="home-button" mat-button>
          <mat-icon>arrow_back</mat-icon>
        </button>
      </div>
      <div class="bellow-container">
        <div class="form-container">
          <h2 class="form-title">Add a New Car</h2>
          <form (ngSubmit)="createCar()" #carForm="ngForm">
            <div class="form-group">
              <label for="model">Model</label>
              <mat-form-field appearance="outline">
                <mat-select
                  id="model"
                  [(ngModel)]="createdCar.model"
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
                <mat-select
                  id="year"
                  [(ngModel)]="createdCar.year"
                  name="year"
                  placeholder="Enter manufacturing year"
                  required
                >
                  <mat-option *ngFor="let year of years" [value]="year">{{
                    year
                  }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-group">
              <label for="color">Color</label>
              <mat-form-field appearance="outline">
                <mat-select
                  id="price"
                  [(ngModel)]="createdCar.price"
                  name="price"
                  placeholder="Enter car price"
                  required
                >
                  <mat-option *ngFor="let color of carColors" [value]="color">{{
                    color.name
                  }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-group">
              <label for="price">Price per day</label>
              <mat-form-field appearance="outline">
                <input
                  matInput
                  id="price"
                  type="number"
                  [(ngModel)]="createdCar.price"
                  name="price"
                  placeholder="Enter car price"
                  required
                />
              </mat-form-field>
            </div>

            <button class="submit-button" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class CreateBookingComponent {
  createdCar: Car;
  userData$: Observable<AppUser>;

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

  years = [
    2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
    2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001,
    2000, 1999,
  ];

  carColors = [
    { name: 'Red', color: '#FF0000' },
    { name: 'Green', color: '#00FF00' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'Purple', color: '#800080' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Pink', color: '#FFC0CB' },
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#808080' },
    { name: 'Cyan', color: '#00FFFF' },
    { name: 'Magenta', color: '#FF00FF' },
    { name: 'Brown', color: '#A52A2A' },
    { name: 'Lime', color: '#00FF00' },
    { name: 'Maroon', color: '#800000' },
    { name: 'Olive', color: '#808000' },
    { name: 'Navy', color: '#000080' },
    { name: 'Teal', color: '#008080' },
    { name: 'Coral', color: '#FF7F50' },
    { name: 'Turquoise', color: '#40E0D0' },
    { name: 'Violet', color: '#EE82EE' },
    { name: 'Indigo', color: '#4B0082' },
    { name: 'Gold', color: '#FFD700' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Beige', color: '#F5F5DC' },
    { name: 'Lavender', color: '#E6E6FA' },
    { name: 'Crimson', color: '#DC143C' },
    { name: 'Mint', color: '#98FF98' },
    { name: 'Rose', color: '#FF007F' },
    { name: 'Peach', color: '#FFE5B4' },
  ];

  ngOnInit(): void {
    this.createdCar = {
      id: '0',
      model: '',
      year: null,
      color: '',
      price: null,
    };
  }

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    this.userData$ = this.userService.userData$;
  }

  createCar(): void {
    if (
      !this.createdCar.model ||
      !this.createdCar.year ||
      !this.createdCar.color ||
      !this.createdCar.price
    ) {
      alert('Please fill all the fields');
      return;
    }

    // Get a reference to a new document with an auto-generated ID
    const userRef = this.firestore.collection('cars').doc();

    // Set the unique ID to the userCar object
    this.createdCar.id = userRef.ref.id;

    userRef.set({
      id: this.createdCar.id,
      model: this.createdCar.model,
      year: this.createdCar.year,
      color: this.createdCar.color,
      price: this.createdCar.price,
    });

    this.userData$.pipe(take(1)).subscribe((user) => {
      if (user) {
        const userRef = this.firestore.collection('users').doc(user.email);
        userRef
          .update({
            ...user,
            carsIds: [...user.carsIds, this.createdCar.id],
          })
          .then(() => {
            console.log('User data added to Firestore');
          })
          .catch((error) => {
            console.error('Error adding user data to Firestore:', error);
          });
      }
    });

    this.router.navigate(['menu']);
  }

  navigateTo(section: string) {
    this.router.navigate([section]);
  }
}

export interface Car {
  id: string;
  model: string;
  year: number;
  color: string;
  price: number;
}
