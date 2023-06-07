import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-home-new-arrivals',
  templateUrl: './home-new-arrivals.component.html',
  styleUrls: ['./home-new-arrivals.component.scss'],
})
export class HomeNewArrivalsComponent {
  @Input() productsNew: Product[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['<i class="fa-solid fa-chevron-left fa-2xl"></i>', '<i class="fa-solid fa-chevron-right fa-2xl"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    margin: 20
  };
}
