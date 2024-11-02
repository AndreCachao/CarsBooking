import { Component } from '@angular/core';

@Component({
  selector: 'app-mat-dialog-book-car',
  standalone: true,
  imports: [],
  styleUrl: './mat-dialog-book-car.component.scss',
  template: `
    <div class="flex flex-col justify-center items-center h-full">
      <div></div>
      <div class="flex">
        <button
          class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          BookIn
        </button>
      </div>
    </div>
  `,
})
export class MatDialogBookCarComponent {}
