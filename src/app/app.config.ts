import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environments';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'andrecachao1',
        appId: '1:1040726427184:web:2331a2a6921287ee684ff5',
        storageBucket: 'andrecachao1.appspot.com',
        apiKey: 'AIzaSyCVdJ2B0b7L-fZawIJD4xrHqR9fpdPLf5M',
        authDomain: 'andrecachao1.firebaseapp.com',
        messagingSenderId: '1040726427184',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
