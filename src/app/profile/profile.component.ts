import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import {
  Car,
  CreateBookingComponent,
} from '../createbooking/createbooking.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser, UserService } from '../UserService/user.service';
import { CarCardComponent } from '../carcard/carcard.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    HomeComponent,
    BookCarComponent,
    CreateBookingComponent,
    MiniProfileComponent,
    AsyncPipe,
    CarCardComponent,
    CommonModule,
  ],
  template: `
    <div
      class="relative flex flex-col min-h-screen items-center bg-amber-500 pb-20"
    >
      <!-- Go Back Button -->
      <div class="absolute top-6 left-6">
        <a
          href="menu"
          class="bg-neutral-900 hover:bg-stone-800 text-amber-500 font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Go Back
        </a>
      </div>
      <!-- Profile Title -->
      <div class="font-bold text-5xl mt-8 text-gray-900">Profile</div>
      <!-- Profile and Cards Section -->
      <div class="flex flex-wrap w-4/5 mt-8">
        <!-- Profile Picture and User Info -->
        <div class="flex-1 flex items-center justify-center flex-col space-y-4">
          <div
            class="rounded-full border-4 border-white shadow-lg cursor-pointer"
            style="width: 20vw; height: 20vw; min-width: 120px; min-height: 120px;"
            (click)="fileInput.click()"
          >
            <img
              *ngIf="profileImageUrl"
              [src]="profileImageUrl"
              alt="Profile Picture"
              class="w-full h-full rounded-full object-cover"
            />
            <input #fileInput type="file" accept="image/*" hidden />
          </div>
        </div>
        <div
          class="flex flex-col overflow-y-auto items-center w-4/5 mt-4 bg-white rounded-3xl shadow-lg flex-1 "
          style="height: 70vh"
        >
          <div class="mt-8 w-[95%]" *ngFor="let car of cars">
            <cardcard
              [car]="car"
              [userData]="userData$ | async"
              [booking]="false"
            ></cardcard>
          </div>
        </div>
      </div>
    </div>
    <footer class="bg-gray-800 text-white py-6">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2024 MyBrand. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class ProfileComponent {
  userData$: Observable<AppUser>;
  cars: Car[] = [];
  profileImageUrl: string;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private storage: AngularFirestore
  ) {
    this.userData$ = this.userService.userData$;
  }

  ngOnInit(): void {
    this.userData$.subscribe((userData) => {
      this.cars = [];
      if (this.cars.length === 0) {
        userData.carsIds.forEach((carId) => {
          this.firestore
            .collection<Car>('cars')
            .doc(carId)
            .get()
            .subscribe((car) => {
              this.cars.push(car.data());
            });
        });
      }
    });
  }

  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const filePath = `profile_pictures/${file.name}_${Date.now()}`;
  //     const fileRef = this.storage.ref(filePath);

  //     // Upload image to Firebase Storage
  //     this.storage.upload(filePath, file).then(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.profileImageUrl = url; // Update image URL in the component
  //         this.updateUserProfileImage(url); // Save URL to Firestore
  //       });
  //     });
  //   }
  // }

  // private updateUserProfileImage(url: string): void {
  //   this.userService.updateUserProfile({ profileImageUrl: url });
  // }
}
