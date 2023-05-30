import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AccountComponent } from './pages/account/account.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeCarouselComponent } from './pages/home/home-carousel/home-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeCategoryComponent } from './pages/home/home-category/home-category.component';
import {HomeModule} from "./pages/home/home.module";
import {CarouselModule} from "ngx-owl-carousel-o";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent,
    AccountComponent,
    AboutUsComponent,
    FeedbackComponent,
    PageNotFoundComponent,
    FAQComponent,
    ContactComponent,
    BlogComponent,
    BreadcrumbComponent,
    LoginComponent,
    RegisterComponent,
    HomeCategoryComponent,
    HomeCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
