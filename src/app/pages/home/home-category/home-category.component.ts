import { Component } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/core/services/product.services';
@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss'],
})
export class HomeCategoryComponent {
  productGroupByCate: any[] = [];
  productArr: Product[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.productService.getProduct().subscribe((data) => {
      this.productArr = data
      this.productService.getAllCategory().subscribe((categories) => {
        this.productGroupByCate = categories.reduce(
          (productContainer, category) => {
            productContainer = {
              ...productContainer,
              [category.name]: [
                this.productArr.filter(
                  (product) => product.idCategory == category.id
                ).length,
                category.thumbnail,
                category.slug
              ],
            };
            return productContainer;
          },
          {}
        );
      })
    })


  }
}
