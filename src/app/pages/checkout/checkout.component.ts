import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  formCheckout!: FormGroup;
  total: number = 0;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private cartService: CartService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.formCheckout = this._fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.fetchCart();
    this.show();
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
  show() {
    this.messageService.add({
      key: 'myKey',
      severity: 'success',
      summary: 'Thông báo',
      detail: 'Đặt hàng thành công !',
    });
  }
}
