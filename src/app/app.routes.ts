import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { loggedinGuard } from './loggedin.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'bookcar',
    loadComponent: () =>
      import('./bookcar/bookcar.component').then((m) => m.BookCarComponent),
    canActivate: [authGuard],
  },
  {
    path: 'mybookings',
    loadComponent: () =>
      import('./mybookings/mybookings.component').then(
        (m) => m.MyBookingsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts.component').then((m) => m.ContactsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [loggedinGuard],
  },.
  
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [loggedinGuard],
  },
];
