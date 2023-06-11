import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productsFeature: Product[] = [];
  productsNew: Product[] = [];
  cat: Product[] = [];
  products: Product[] = [];
  constructor(private pd: ProductService) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.getData()

  }
  getData() {
    this.pd.getProduct().subscribe((data) => {
      this.products = data;
      this.productsFeature = data.filter(item => item.feature === '1');
      this.productsNew = data.slice(-8, -1);
    })
  }

}
