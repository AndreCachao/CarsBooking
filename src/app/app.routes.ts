import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { loggedinGuard } from './loggedin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.component').then((m) => m.MenuComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [loggedinGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [loggedinGuard],
  },
  {
    path: 'createbooking',
    loadComponent: () =>
      import('./createbooking/createbooking.component').then(
        (m) => m.CreateBookingComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
