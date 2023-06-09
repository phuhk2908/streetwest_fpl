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

  }
  ngOnInit() {
    this.getData()

  }
  getData() {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res.sort((a, b) => b.id - a.id);
    });
    this.pd.getProduct().subscribe((data) => {
      this.products = data;
      this.productsFeature = data.filter(item => item.feature === '1');
      this.productsNew = data.slice(-8, -1);
    })
  }

}
// this.staffByArea = data.reduce((acc: any, item: any) => {
//   if (!acc[item.area]) {
//     acc[item.area] = [];
//   }
//   acc[item.area].push(item);
//   return acc;
// }, []);