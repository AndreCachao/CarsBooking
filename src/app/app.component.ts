import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'carsbooking';
  constructor() {}
}
