import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeNewArrivalsComponent } from './home-new-arrivals/home-new-arrivals.component';
import { FirstBannerComponent } from './first-banner/first-banner.component';
import { NewsletterComponent } from 'src/app/components/newsletter/newsletter.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [HomeNewArrivalsComponent, FirstBannerComponent],
  imports: [CommonModule, CarouselModule, RouterLink],
  exports: [HomeNewArrivalsComponent, FirstBannerComponent],
})
export class HomeModule {}
