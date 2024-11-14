import { UserService } from './../UserService/user.service';
import { Component } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'howtouse',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col">
      <div class="flex bg-amber-500 justify-center items-center py-6">
        <div class="flex font-bold text-5xl">How To Use</div>
      </div>
      <section class="flex h-96">
        <div class="flex flex-1 justify-center items-center">
          <div
            class="w-96 h-80 border border-black rounded-3xl p-4 overflow-hidden break-words"
          >
            <div></div>
          </div>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <div
            class="w-3/5 h-80 border border-black rounded-3xl p-4 overflow-hidden break-words"
          >
            <div
              class="flex text-center text-4xl text-gray-800 font-extrabold w-full justify-center mb-5"
            >
              Book a Car
            </div>
            <div>
              Go to the "Book Car" tab, select your preferred vehicle, and
              choose your rental dates. If certain dates are unavailable, it
              indicates that the car has already been reserved during those
              times. Once you've selected your dates, click "Book In" to confirm
              your reservation and get ready for your journey! You can also
              visit your profile at any time to view your bookings and their
              dates.
            </div>
          </div>
        </div>
      </section>
      <section class="flex h-96 bg-amber-500">
        <div class="flex flex-1 justify-center items-center">
          <div
            class="w-3/5 h-80 border border-black rounded-3xl p-4 overflow-hidden break-words"
          >
            <div
              class="flex text-center text-4xl text-gray-800 font-extrabold w-full justify-center mb-5"
            >
              Register Your Vehicles
            </div>
            <div>
              To register your vehicle, go to the "Home" tab and select
              "Register Vehicle." Fill in the required details and click on
              "Submit." You can manage your cars from the "My Cars" tab.
            </div>
          </div>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <div
            class="w-96 h-80 border border-black rounded-3xl p-4 overflow-hidden break-words"
          >
            <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          </div>
        </div>
      </section>
      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-6">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 MyBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
})
export class HowToUseComponent {
  title = 'my-angular-app';
}
