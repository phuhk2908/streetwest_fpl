import { Component, OnInit, inject } from '@angular/core';

import { Analytics, logEvent } from '@angular/fire/analytics';
import { Router, NavigationEnd } from '@angular/router';
declare global {
  interface Window {
    FB: any;
  }
}

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
    this.runMess();
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
  handleAdmin(ComponentRef: Component) {
    const name = ComponentRef.constructor.name;
    if (name.startsWith('Admin')) {
      this.showHeader = false;
    }
    if (name.startsWith('Checkout')) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
  runMess() {
    let chatbox = document.getElementById('fb-customer-chat')!;
    chatbox.setAttribute('page_id', '112962281510919');
    chatbox.setAttribute('attribution', 'biz_inbox');
    (window as any).fbAsyncInit = function () {
      this.FB.init({
        xfbml: true,
        version: 'v17.0',
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }
}
