import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'StreetWest';
  showHeader: boolean = true;

  handleAdmin(ComponentRef: Component) {
    const name = ComponentRef.constructor.name;
    if (name.startsWith('Admin')) {
      this.showHeader = false;
    }
  }
}
