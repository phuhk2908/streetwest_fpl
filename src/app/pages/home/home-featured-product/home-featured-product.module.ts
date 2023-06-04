import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFeaturedProductComponent } from './home-featured-product.component';
import {CarouselModule} from "ngx-owl-carousel-o";



@NgModule({
  declarations: [HomeFeaturedProductComponent],
  imports: [CommonModule, CarouselModule],
  exports: [HomeFeaturedProductComponent],
})
export class HomeFeaturedProductModule {}
