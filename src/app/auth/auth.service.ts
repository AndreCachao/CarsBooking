import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['menu']);
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }

  register(username: string, email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration Successful');
        this.addUserToFirestore(username, email);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  private addUserToFirestore(username: string, email: string) {
    if (email) {
      const userRef = this.firestore.collection('users').doc(email);
      userRef
        .set({
          email: email,
          username: username,
          userLevel: 20,
        })
        .then(() => {
          console.log('User data added to Firestore');
        })
        .catch((error) => {
          console.error('Error adding user data to Firestore:', error);
        });
    }
  }
}
