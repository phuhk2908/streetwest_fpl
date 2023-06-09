import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.services';

import { Product } from 'src/app/interface/product';
import {MessageService} from "primeng/api";

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
    private router: Router,
    private _fb: FormBuilder,
    private cartService: CartService,

    private messageService: MessageService,
    private productService: ProductService

  ) { }
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
    this.cartService.getCart().subscribe(async (data) => {
      this.idOrder = await this.cartService.saveOrder(data);
      this.cartService.createOrder(this.formCheckout.value, this.idOrder);
      this.cartDetail = data;
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
    });
  }
}
