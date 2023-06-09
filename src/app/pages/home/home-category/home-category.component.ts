import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss'],
})
export class HomeCategoryComponent implements OnInit {
  @Input() category: any[] = [];
  @Input() products: Product[] = [];
  shirt: number = 0
  jacket: number = 0
  short: number = 0
  ngOnInit() {
  }
  ngOnChanges() {
    this.short = this.products.filter((item) => item.idCategory == this.category[0]?.id).length;
    this.shirt = this.products.filter((item) => item.idCategory === this.category[1]?.id).length;
    this.jacket = this.products.filter((item) => item.idCategory === this.category[2]?.id).length;

    // let data = this.products.reduce((acc: any, item: any) => {
    //   if (!acc[item.idCategory]) {
    //     acc[item.idCategory] = [];
    //   }
    //   acc[item.idCategory].push(item);
    //   return acc;
    // }, []);

  }



}

// this.staffByArea = data.reduce((acc: any, item: any) => {
//   if (!acc[item.area]) {
//     acc[item.area] = [];
//   }
//   acc[item.area].push(item);
//   return acc;
// }, []);
