import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  cat: any;
  selectCat: any;
  products: Product[] = [];
  constructor(private pd: ProductService) {

  }
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    console.log(event);
  }
  ngOnInit(): void {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
    })
    this.pd.getProduct().subscribe((res: Product[]) => {
      this.products = res;
      this.totalRecords = res.length;
    })

  }


}
