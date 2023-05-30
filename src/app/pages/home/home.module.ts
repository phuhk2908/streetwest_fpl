import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";

@NgModule({
  declarations: [HomeCategoryComponent, HomeCarouselComponent],
  imports: [CommonModule, CarouselModule],
  exports: [HomeCarouselComponent, HomeCategoryComponent],
})
export class HomeModule {}
