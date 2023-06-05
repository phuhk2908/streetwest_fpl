import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/interface/product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  listProduct: Product[] = [];
  total: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      this.listProduct = <Product[]>data;
      this.total = this.cartService.getTotalCart();
    });
  }
  plus() {}
  minus() {}
  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }
  ngDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
