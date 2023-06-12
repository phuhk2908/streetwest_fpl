import { Component, inject } from '@angular/core';

import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'StreetWest';
  showHeader: boolean = true;
  constructor(private analytics: Analytics) {
    logEvent(this.analytics, 'custom_event');
    window.scrollTo(0, 0);
  }
  handleAdmin(ComponentRef: Component) {
    const name = ComponentRef.constructor.name;
    if (name.startsWith('Admin')) {
      this.showHeader = false;
    }
    if (name.startsWith('Checkout')) {
      this.showHeader = false;
    }
  }
}
