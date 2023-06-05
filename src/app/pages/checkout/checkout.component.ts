import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  formCheckout!: FormGroup;
  total: number = 0;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private cartService: CartService
  ) {}
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
  isSubmit: boolean = true;
  async order() {
    const idOrder = await this.cartService.createOrder(this.formCheckout.value);
    this.cartService.getCart().subscribe(async (data) => {
      await this.cartService.saveOrder(idOrder, data);
    });
  }
}
