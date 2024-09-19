import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';

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
}

export interface AppUser {
  username: string;
  email: string;
  userLevel: number;
}
