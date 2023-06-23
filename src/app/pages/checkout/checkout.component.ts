import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.services';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  formCheckout!: FormGroup;
  total: number = 0;
  idOrder: string = '';
  isSubmit: boolean = false;
  cartDetail: Product[] = [];

  constructor(
    private _fb: FormBuilder,
    private cartService: CartService,
    private messageService: MessageService,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.formCheckout = this._fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.fetchCart();
  }

  fetchCart() {
    this.total = this.cartService.getTotalCart();
  }

  get f() {
    return this.formCheckout.controls;
  }

  async order() {
    this.cartService
      .getCart()
      .pipe(take(1))
      .subscribe(async (data) => {
        this.idOrder = await this.cartService.saveOrder(data);
        this.cartService.createOrder(this.formCheckout.value, this.idOrder);
        data.forEach((el) => {
          for (const [sizeName, value] of Object.entries(el.size)) {
            if (sizeName === el.sizeSelected) {
              value.amount -= el.quantity!;
              value.sold += el.quantity!;
            }
          }
          this.productService.updateProductByID(el);
        });
        this.isSubmit = true;
        this.orderService.getIdDetailOrder(this.idOrder).subscribe((data) => {
          this.cartDetail = data.cart;
          console.log(this.cartDetail);
        });
      });
  }
  ngOnDestroy() {
    if (this.isSubmit) {
      this.cartService.removeAllProduct();
    }
  }
}
