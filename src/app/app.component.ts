import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'carsbooking';
  constructor() {}
}
