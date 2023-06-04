import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.services';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  constructor(
    private dataService: ProductService,
    private route: ActivatedRoute
  ) { }
  frm1!: FormGroup;
  private subscription: Subscription = new Subscription();
  id: string = this.route.snapshot.params['id'];
  product: Product = <Product>{};
  availableQuantity: number = 0;
  ngOnInit() {
    this.fetchData();
    this.frm1 = new FormGroup({
      quantity: new FormControl(1),
    });
  }
  fetchData() {
    this.dataService.getProductByID(this.id).subscribe((data) => {
      this.product = data;
      for (const [sizeName, value] of Object.entries(this.product.size)) {
        this.availableQuantity += value.amount;
      }
    });

  }

  addToCart() { }
  plus() {
    let value = this.frm1.controls['quantity'].value;
    if (value >= this.availableQuantity) return;
    this.frm1.controls['quantity'].setValue(++value);
  }
  minus() {
    let value = this.frm1.controls['quantity'].value;
    if (value == 0) return;
    this.frm1.controls['quantity'].setValue(--value);
  }
  ngDestroy() {
    this.subscription?.unsubscribe();
  }
}
