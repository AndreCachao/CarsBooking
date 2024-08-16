import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bookcar',
    loadComponent: () =>
      import('./bookcar/bookcar.component').then((m) => m.BookCarComponent),
  },
  {
    path: 'mybookings',
    loadComponent: () =>
      import('./mybookings/mybookings.component').then(
        (m) => m.MyBookingsComponent
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts.component').then((m) => m.ContactsComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
