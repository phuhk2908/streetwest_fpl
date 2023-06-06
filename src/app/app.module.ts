import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

>>>>>>> 70f8dc93821a0b8708c8a7dcd030b0f028df3a7f
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
import { HomeModule } from './pages/home/home.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { environment } from '../environments/environment';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
<<<<<<< HEAD
import { ButtonModule } from 'primeng/button';
=======
>>>>>>> 70f8dc93821a0b8708c8a7dcd030b0f028df3a7f
import { HomeFeaturedProductModule } from './pages/home/home-featured-product/home-featured-product.module';
import { ListboxModule } from 'primeng/listbox';
import { StyleClassModule } from 'primeng/styleclass';
import { VndPipe } from './core/pipe/format.pipe';
import { PaginatorModule } from 'primeng/paginator';
<<<<<<< HEAD
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
=======
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
>>>>>>> 70f8dc93821a0b8708c8a7dcd030b0f028df3a7f
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
    NewsletterComponent,
    VndPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    CarouselModule,
    ToastModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    HomeFeaturedProductModule,
    FormsModule,
    ListboxModule,
    StyleClassModule,
    PaginatorModule,
<<<<<<< HEAD
    SliderModule,
    ToastModule,
    ButtonModule,
    CardModule,
    DialogModule
=======
    HttpClientModule,
>>>>>>> 70f8dc93821a0b8708c8a7dcd030b0f028df3a7f
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
