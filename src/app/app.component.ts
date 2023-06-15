import { Component, OnInit, inject } from '@angular/core';

import { Analytics, logEvent } from '@angular/fire/analytics';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'StreetWest';
  showHeader: boolean = true;
  constructor(private analytics: Analytics, private router: Router) {
    logEvent(this.analytics, 'custom_event');
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderVisibility();
      }
    });
  }
  private updateHeaderVisibility() {
    const currentRoute = this.router.url;
    if (
      currentRoute.startsWith('/admin') ||
      currentRoute.startsWith('/checkout')
    ) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
  // handleAdmin(ComponentRef: Component) {
  //   const name = ComponentRef.constructor.name;
  //   if (name.startsWith('Admin')) {
  //     this.showHeader = false;
  //   }
  //   if (name.startsWith('Checkout')) {
  //     this.showHeader = false;
  //   } else {
  //     this.showHeader = true;
  //   }
  // }
}
