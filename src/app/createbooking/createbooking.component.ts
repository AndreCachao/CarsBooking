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
    CommonModule,
  ],
  styleUrls: ['createbooking.style.scss'],
  template: `
    <div class="flex flex-col min-h-screen bg-amber-500">
      <div class="p-6">
        <a
          href="menu"
          class="bg-neutral-900 hover:bg-stone-800 text-amber-500 font-semibold py-3 px-6 rounded-lg"
          >Go Back</a
        >
      </div>

      <div class="flex items-center justify-center flex-1">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 class="text-2xl font-semibold text-center mb-6">Add a New Car</h2>

          <form (ngSubmit)="createCar()" #carForm="ngForm" class="space-y-6">
            <div>
              <label for="model" class="block font-medium text-gray-700 mb-1"
                >Model</label
              >
              <select
                [(ngModel)]="createdCar.model"
                name="model"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option *ngFor="let brand of carBrands" [value]="brand">
                  {{ brand }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="licensePlate"
                class="block font-medium text-gray-700 mb-1"
                >License Plate</label
              >
              <input
                type="text"
                [(ngModel)]="createdCar.licensePlate"
                name="licensePlate"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter license plate"
              />
            </div>

            <div>
              <label for="year" class="block font-medium text-gray-700 mb-1"
                >Year</label
              >
              <select
                [(ngModel)]="createdCar.year"
                name="year"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option *ngFor="let year of years" [value]="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <div>
              <label for="color" class="block font-medium text-gray-700 mb-1"
                >Color</label
              >
              <select
                [(ngModel)]="createdCar.color.name"
                name="color"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option *ngFor="let color of carColors" [value]="color.name">
                  {{ color.name }}
                </option>
              </select>
            </div>

            <div>
              <label for="price" class="block font-medium text-gray-700 mb-1"
                >Price per day</label
              >
              <input
                type="number"
                [(ngModel)]="createdCar.price"
                name="price"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter car price"
              />
            </div>

            <div>
              <label for="carImage" class="block font-medium text-gray-700 mb-1"
                >Car Image</label
              >
              <input
                type="file"
                (change)="onFileSelected($event)"
                accept="image/*"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-neutral-900 hover:bg-stone-800 text-amber-500 font-semibold rounded-lg text-center cursor-pointer"
            >
              Add Car
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class CreateBookingComponent {
  createdCar: Car;
  userData$: Observable<AppUser>;
  selectedFile: File = null;

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

  carColors: Color[] = [
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
      color: { name: '', color: '' },
      price: null,
      licensePlate: '',
      owner: '',
    };
  }

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    this.userData$ = this.userService.userData$;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  createCar(): void {
    if (
      !this.createdCar.model ||
      !this.createdCar.year ||
      !this.createdCar.color ||
      !this.createdCar.price ||
      !this.createdCar.licensePlate
    ) {
      alert('Please fill all the fields');
      return;
    }

    // Get a reference to a new document with an auto-generated ID

    // Set the unique ID to the userCar object

    this.userData$.pipe(take(1)).subscribe((user) => {
      if (user) {
        const carsRef = this.firestore.collection('cars').doc();
        this.createdCar.id = carsRef.ref.id;
        const selectedColorName = this.createdCar.color.name;
        const selectedColor = this.carColors.find(
          (color) => color.name === selectedColorName
        );

        carsRef.set({
          id: this.createdCar.id,
          model: this.createdCar.model,
          year: this.createdCar.year,
          color: selectedColor,
          price: this.createdCar.price,
          licensePlate: this.createdCar.licensePlate,
          owner: user.email,
        });

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

export interface Color {
  name: string;
  color: string;
}

export interface Car {
  id: string;
  model: string;
  year: number;
  color: Color;
  price: number;
  licensePlate: string;
  owner: string;
  bookingsDates?: BookingDates[];
}

export interface BookingDates {
  startDate: Data;
  endDate: Data;
}

export interface Data {
  seconds: number;
  nanoseconds: number;
}
