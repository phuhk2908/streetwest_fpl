
import { Component } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';
import { ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent {
  maxPrice: number = 1000000;
  cat: any;
  search: string = '';
  filterCat: any;
  products: Product[] = [];
  constructor(private pd: ProductService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
    })
    this.getData();
    // this.pd.getKeySearch().subscribe(res => {
    //   if (res.length > 0) {
    //     let keyword = res.toLowerCase();
    //     this.pd.getProduct().subscribe(res => {
    //       this.products = res.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));

    //     })
    //   }
    // })
  }

  page: number = 0;
  totalRecords: number = 0;
  rows: number = 10;
  sortPrice: OrderByDirection = 'desc';
  filterPrice: number[] = [0, this.maxPrice];
  handleChangePrice(event: any) {
    this.filterPrice = [event.values[0], event.values[1]];
    this.getData();
  }
  selectCategory(event: any) {
    let id = event.getAttribute('data-id');
    if (id.length > 0) {
      this.filterCat = id;
      this.getData();
    }

  }

  onPageChange(event: any) {
    this.page = event.first;
    console.log(this.page);
    this.rows = event.rows;
    this.getData();
  }
  handleSort(e: any) {
    if (e.cancelable) e.preventDefault();
    this.sortPrice = e;
    this.getData();
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
