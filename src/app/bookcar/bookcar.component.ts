import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../createbooking/createbooking.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { AppUser } from '../UserService/user.service';
import { CarCardComponent } from '../carcard/carcard.component';

@Component({
  selector: 'bookcar',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  styleUrls: ['bookcar.style.scss'],
  template: `
    <div
      class="flex flex-col min-h-screen items-center bg-gradient-to-br from-amber-500 to-yellow-400"
    >
      <div class="font-bold text-5xl mt-4">Book a Car</div>
      <div
        class="flex flex-col overflow-y-auto items-center w-4/5 mt-8 bg-white rounded-3xl shadow-lg"
        style="height: 70vh"
      >
        <div class="mt-8 w-[95%]" *ngFor="let car of cars$ | async">
          <cardcard
            [car]="car"
            [userData]="userData"
            [booking]="true"
          ></cardcard>
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
export class BookCarComponent {
  @Input() userData: AppUser;
  cars$: Observable<Car[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.cars$ = this.firestore.collection<Car>('cars').valueChanges();
  }
}
