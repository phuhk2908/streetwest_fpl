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
  listCartLength: number = 0;
  total: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      this.listProduct = <Product[]>data;
      this.total = this.cartService.getTotalCart();
      this.listCartLength = this.listProduct.reduce((acc, cur) => {
        return acc + cur.quantity!;
      }, 0);
    });
  }
  plus(product: Product) {
    let inputQuantity = document.querySelector(
      `input[name=quantity-${product.id}-${product.sizeSelected}]`
    ) as HTMLInputElement;
    let value = Number(inputQuantity.value);
    inputQuantity.value = (++value).toString();
    product.quantity = value;
    this.cartService.addToCart(product);
  }
  minus(product: Product) {
    let inputQuantity = document.querySelector(
      `input[name=quantity-${product.id}-${product.sizeSelected}]`
    ) as HTMLInputElement;
    let value = Number(inputQuantity.value);
    if (value <= 1) return;
    inputQuantity.value = (--value).toString();
    product.quantity = value;
    this.cartService.addToCart(product);
  }
  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }
  ngDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
