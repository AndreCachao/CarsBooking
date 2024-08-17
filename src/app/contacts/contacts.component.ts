import { Component } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'contacts',
  standalone: true,
  imports: [],
  styleUrls: ['contacts.style.scss'],
  template: `
    <div class="container">
      <div class="content">
        <h1>Contacts</h1>
        <p>Email: andre.cachaogmail.com</p>
        <p>Phone: 92*******</p>
      </div>
    </div>
  `,
})
export class ContactsComponent {
  title = 'my-angular-app';
}
