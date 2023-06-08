import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.scss']
})
export class AdminproductComponent implements OnInit {
  products: Product[] = [];
  cat: any[] = [];
  constructor(private pd: ProductService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.getData()
  }
  visible!: boolean;
  getData() {
    this.pd.getProduct().subscribe((data) => {
      this.products = data;
    });
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
    });
  }

  showDialog() {
    this.visible = true;
  }
  getCatByName(id: string) {
    let data = this.cat.find(item => item.id === id);
    return data?.name
  }


}
