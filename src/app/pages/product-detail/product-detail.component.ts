import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.services';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
4;
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  constructor(
    private dataService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}
  frm1!: FormGroup;
  private subscription: Subscription = new Subscription();
  id: string = this.route.snapshot.params['id'];
  product: Product = <Product>{};
  availableQuantity: number = 0;
  ngOnInit() {
    // this.fetchData();
    this.frm1 = new FormGroup({
      quantity: new FormControl(1),
      flexRadioDefault: new FormControl('', Validators.required),
    });
  }
  async fetchData() {
    this.product = await this.dataService.getProductBySlug(this.id);
    for (const [sizeName, value] of Object.entries(this.product.size)) {
      this.availableQuantity += value.amount;
    }
  }

  addToCart(product: Product) {
    const quantity = this.frm1.controls['quantity'].value;
    const sizeSelected = this.frm1.controls['flexRadioDefault'].value;
    product.quantity = quantity;
    product.sizeSelected = sizeSelected;
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
  plus(e: Event) {
    let value = this.frm1.controls['quantity'].value;
    if (value >= this.availableQuantity) return;
    this.frm1.controls['quantity'].setValue(++value);
  }
  minus(e: Event) {
    let value = this.frm1.controls['quantity'].value;
    if (value <= 1) return;
    this.frm1.controls['quantity'].setValue(--value);
  }
  ngDestroy() {
    this.subscription?.unsubscribe();
  }
}
