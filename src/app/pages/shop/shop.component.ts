import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.services';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  cat: any;
  constructor(private pd: ProductService) {

  }
  ngOnInit(): void {
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
      console.log(this.cat);
    })

    this.pd.getId('5rcBlKhQ7evy1S3Pxayv').subscribe( (res: any) => {
      console.log(res)
    })
  }


}
