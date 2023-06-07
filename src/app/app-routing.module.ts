import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';

import { AccountComponent } from './pages/account/account.component';
import { VerifyEmailComponent } from './pages/account/verify-email/verify-email.component';
import { DashboardComponent } from './admin/pages/admin/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';

//route guard
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminComponent } from './admin/pages/admin/admin.component';
import { AdminproductComponent } from './admin/pages/admin/adminproduct/adminproduct.component';
import { AdminorderComponent } from './admin/pages/admin/adminorder/adminorder.component';
import { AdminaccountComponent } from './admin/pages/admin/adminaccount/adminaccount.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'product',
    component: ShopComponent,
    data: { breadcrumb: 'Sản phẩm' },
    children: [
      {
        path: 'shop-nam',
        component: ShopComponent,
      },
      {
        path: 'shop-nu',
        component: ShopComponent,
      },
    ],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    data: { breadcrumb: 'Chi tiết sản phẩm' },
  },
  { path: 'blog', component: BlogComponent, data: { breadcrumb: 'Blog' } },
  {
    path: 'contact',
    component: ContactComponent,
    data: { breadcrumb: 'Liên Hệ' },
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { breadcrumb: 'Về chúng tôi' },
  },
  {
    path: 'faq',
    component: FAQComponent,
    data: { breadcrumb: 'Câu hỏi thường gặp' },
  },
  { path: 'cart', component: CartComponent, data: { breadcrumb: 'Giỏ hàng' } },

  {
    path: 'account',
    component: AccountComponent,
    data: { breadcrumb: 'Tài khoản' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: 'Bảng điều khiển' },
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },

  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { breadcrumb: 'Thanh toán' },
  },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/product', component: AdminproductComponent },
  { path: 'admin/order', component: AdminorderComponent },
  { path: 'admin/account', component: AdminaccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
