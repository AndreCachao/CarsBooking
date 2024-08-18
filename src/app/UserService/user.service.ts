import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  getUserData(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
      
        if (user && user.email) {
          return this.firestore
            .collection('users')
            .doc(user.email)
            .get()
            .pipe(
              switchMap((doc) => {
                if (doc.exists) {
                  return of(doc.data());
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
