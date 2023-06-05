import { Component } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { async } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  maxPrice: number = 1000000;
  cat: any;
  search: string = '';
  filterCat: any;
  products: Product[] = [];
  constructor(private pd: ProductService) {

  }
  page: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  sortPrice: OrderByDirection = 'asc';
  filterPrice: number[] = [0, this.maxPrice];
  handleChangePrice(event: any) {
    if (event.cancelable) event.preventDefault();
    this.filterPrice = [event.values[0], event.values[1]];
    this.getData();
  }
  selectCategory(event: any) {
    // this.filterCat = event.value.id
    // this.filterCat = 'k2IG2BazToB2O61yJti2';
    this.getData();
  }
  handleSearch() {
    console.log(this.search);
  }
  onPageChange(event: any) {
    this.page = event.first;
    console.log(this.page);
    this.rows = event.rows;
    this.getData();
  }
  handleSort(e: any) {
    this.sortPrice = e;
    this.getData();
  }
  ngOnInit(): void {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
    })
    this.getData()
  }
  async getData() {
    (await this.pd.paginator(this.filterCat, this.filterPrice, this.sortPrice, this.page)).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.products = res[0];
          this.totalRecords = Math.ceil(res[1]);
        }

      },
      error: (error) => {
        console.error(error, "loi");
      }
    });
  }
}
