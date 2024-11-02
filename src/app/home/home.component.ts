import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MiniProfileComponent } from './miniprofile.component';
import { AppUser, UserService } from '../UserService/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MiniProfileComponent, AsyncPipe],
  styleUrls: ['home.style.scss'],
  template: `
    <div class="bg-gray-100 min-h-screen flex flex-col">
      <!-- Hero Section -->
      <div class="flex-grow bg-amber-500 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-6xl font-bold">
            Welcome to
            <span class="text-neutral-900 font-bold">Vroomly</span>
          </h1>
          <p class="mt-6 text-lg md:text-2xl">
            Book your perfect car in just a few clicks with Vroomly
          </p>
          <div class="mt-12">
            <a
              href="createbooking"
              class="bg-neutral-900 hover:bg-stone-800 text-amber-500 font-semibold py-3 px-6 rounded-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <!-- Services Section -->
      <section class="py-16 bg-zinc-50">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="text-center text-3xl text-gray-800 mb-8 font-extrabold">
            Our Services
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-amber-500 shadow-md rounded-lg p-6 text-center">
              <div class="text-indigo-600 text-4xl mb-4">🧾</div>
              <h3 class="text-xl font-semibold mb-2">Register Your Vehicles</h3>
              <p class="text-gray-600">
                Add your cars to our platform quickly and easily.
              </p>
            </div>
            <div class="bg-amber-500 shadow-md rounded-lg p-6 text-center">
              <div class="text-indigo-600 text-4xl mb-4">📖</div>
              <h3 class="text-xl font-semibold mb-2">
                Book Cars From Other People
              </h3>
              <p class="text-gray-600">
                Browse and book from a wide selection of available cars.
              </p>
            </div>
            <div class="bg-amber-500 shadow-md rounded-lg p-6 text-center">
              <div class="text-indigo-600 text-4xl mb-4">🚗</div>
              <h3 class="text-xl font-semibold mb-2">
                Offer Your Car for Booking
              </h3>
              <p class="text-gray-600">
                List your vehicle and earn by renting it out to others.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-amber-500 py-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to start your journey?
          </h2>
          <p class="text-white mb-6">
            Let us help you turn your ideas into reality with our expertise and
            creativity.
          </p>
          <a
            href="#"
            class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg"
          >
            Contact Us
          </a>
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
export class HomeComponent {
  title = 'Car Booking Service';

  userData$: Observable<AppUser>;

  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {
    this.userData$ = this.userService.userData$;
  }

  navigateTo(section: string) {
    this.router.navigate([section]);
  }
}
