import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/core/services/product.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  listCartLength: number = 0;
  listCart: Product[] = [];
  constructor(private cartService: CartService, private pd: ProductService, private router: Router) { }
  private subscription: Subscription = new Subscription();
  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      this.listCart = data;
      this.listCartLength = this.listCart.reduce((acc, cur) => {
        return acc + cur.quantity!;
      }, 0);
    });
  }
  async sendKeySearch(key: HTMLInputElement) {
    const data = key.value;
    this.pd.setKeySearch(data);
    key.value = '';
    this.router.navigate(['/product']);
  }
  ngDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
