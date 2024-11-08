import { MyBookingsComponent } from './../mybookings/mybookings.component';
import { AppUser, UserService } from './../UserService/user.service';
import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HomeComponent } from '../home/home.component';
import { BookCarComponent } from '../bookcar/bookcar.component';
import { CreateBookingComponent } from '../createbooking/createbooking.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MiniProfileComponent } from '../home/miniprofile.component';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  NgIf,
  NgFor,
  NgClass,
  NgOptimizedImage,
} from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  styleUrls: ['menu.style.scss'],
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    HomeComponent,
    BookCarComponent,
    CreateBookingComponent,
    ContactsComponent,
    MiniProfileComponent,
    AsyncPipe,
    MyBookingsComponent,
    NgIf,
    NgFor,
    NgClass,
    NgOptimizedImage,
  ],
  template: `
    <nav class="bg-neutral-900">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex flex-shrink-0 items-center">
              <img src="CarLogoBar.jpg" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4 cursor-pointer">
                <a
                  *ngFor="let tab of tabs; let i = index"
                  (click)="selectTab(i)"
                  [ngClass]="{
                    'bg-stone-400': selectedTab === i,
                    'text-gray-300': selectedTab !== i
                  }"
                  class="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
                >
                  {{ tab.label }}
                </a>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-3" (click)="dropDown()">
              <div>
                <button
                  type="button"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" />
                </button>
              </div>

              <!--
                                    Dropdown menu, show/hide based on menu state.

                                    Entering: "transition ease-out duration-100"
                                      From: "transform opacity-0 scale-95"
                                      To: "transform opacity-100 scale-100"
                                    Leaving: "transition ease-in duration-75"
                                      From: "transform opacity-100 scale-100"
                                      To: "transform opacity-0 scale-95"
                                  -->
              <div
                *ngIf="dropdownOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  >Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  (click)="logout()"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a
            *ngFor="let tab of tabs; let i = index"
            (click)="selectTab(i)"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {{ tab.label }}
          </a>
        </div>
      </div>
    </nav>

    <div *ngIf="selectedTab === 0">
      <home></home>
    </div>
    <div *ngIf="selectedTab === 1">
      <bookcar [userData]="userData$ | async"></bookcar>
    </div>
    <div *ngIf="selectedTab === 2">
      <mybookingscomponent [userData]="userData$ | async"></mybookingscomponent>
    </div>
    <div *ngIf="selectedTab === 3">
      <contacts></contacts>
    </div>
  `,
})
export class MenuComponent {
  tabs = [
    { label: 'Home' },
    { label: 'Book a Car' },
    { label: 'Your Cars' },
    { label: 'Contacts' },
  ];

  selectedTab = 0;
  dropdownOpen = false;
  userData$: Observable<AppUser>;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {
    this.userData$ = this.userService.userData$;
  }

  selectTab(index: number): void {
    this.selectedTab = index;
  }

  dropDown(): void {
    console.log(this.dropdownOpen);
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
