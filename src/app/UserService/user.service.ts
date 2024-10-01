import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { Car } from '../createbooking/createbooking.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  userData$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.userData$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user && user.email) {
          return this.firestore
            .collection('users')
            .doc(user.email)
            .valueChanges() // Listen for real-time updates
            .pipe(
              switchMap((data) => {
                if (data) {
                  return of(data as AppUser);
                } else {
                  console.error('No such document!');
                  return of(null);
                }
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  public deleteCar(car: Car, user: AppUser): void {
    // Implement the logic to remove the car from the database
    this.firestore
      .collection<Car>('cars')
      .doc(car.id)
      .delete()
      .then(() => {
        console.log(`${car.model} removed successfully`);
      });

    // Implement the logic to remove the car from the user's list of cars
    this.firestore
      .collection('users')
      .doc(user.email)
      .update({
        carsIds: user.carsIds.filter((id) => id !== car.id),
      })
      .then((id) => {
        console.log(`${id} removed from user's list of cars`);
      });
  }


  


}

export interface AppUser {
  username: string;
  email: string;
  userLevel: number;
  carsIds: string[];
}
