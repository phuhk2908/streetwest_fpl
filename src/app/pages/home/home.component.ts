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

  constructor(private pd: ProductService) {
    this.pd.getProduct().subscribe((data) => {
      this.productsFeature = data.filter(item => item.feature === '1');
      this.productsNew = data.slice(-8, -1)
    })
  }
  ngOnInit() {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      console.log(res);
      this.cat = res.sort((a, b) => b.id - a.id);
    })

  }

}
