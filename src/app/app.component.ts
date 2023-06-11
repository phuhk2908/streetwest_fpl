import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'StreetWest';
  showHeader: boolean = true;
  constructor() {
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
