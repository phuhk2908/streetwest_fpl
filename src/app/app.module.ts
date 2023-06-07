import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeFeaturedProductModule } from './pages/home/home-featured-product/home-featured-product.module';

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
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { HomeCarouselComponent } from './pages/home/home-carousel/home-carousel.component';
import { HomeCategoryComponent } from './pages/home/home-category/home-category.component';
import { AdminComponent } from './admin/pages/admin/admin.component';
import { AdminaccountComponent } from './admin/pages/admin/adminaccount/adminaccount.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { AdminorderComponent } from './admin/pages/admin/adminorder/adminorder.component';
import { AdminproductComponent } from './admin/pages/admin/adminproduct/adminproduct.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { AuthService } from './core/services/auth/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DashboardComponent } from './admin/pages/admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/account/verify-email/verify-email.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ChipsModule } from 'primeng/chips';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListboxModule } from 'primeng/listbox';
import { StyleClassModule } from 'primeng/styleclass';
import { VndPipe } from './core/pipe/format.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';

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
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    VndPipe,
    SidebarAdminComponent,
    AdminaccountComponent,
    AdminComponent,
    AdminorderComponent,
    AdminproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    CarouselModule,
    HomeFeaturedProductModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ChipsModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    DividerModule,
    ToastModule,
    ReactiveFormsModule,
    ListboxModule,
    StyleClassModule,
    PaginatorModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    SliderModule,
    AccordionModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    [MessageService],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
