import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogdetailsComponent } from './pages/blog/blogdetails/blogdetails.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';

import { AccountComponent } from './pages/account/account.component';
import { VerifyEmailComponent } from './pages/account/verify-email/verify-email.component';
import { DashboardComponent } from './admin/pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';

//route guard
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AdminregisterComponent } from './pages/admin/adminregister/adminregister.component';
import { AdminComponent } from './admin/pages/admin/admin.component';
import { AdminproductComponent } from './admin/pages/admin/adminproduct/adminproduct.component';
import { AdminorderComponent } from './admin/pages/admin/adminorder/adminorder.component';
import { AdminaccountComponent } from './admin/pages/admin/adminaccount/adminaccount.component';
import { AuthAdminGuard } from './core/guard/auth-admin.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AccountProfileComponent } from './pages/account/account-profile/account-profile.component';
import { AccountNoficationComponent } from './pages/account/account-nofication/account-nofication.component';
import { AccountAddressComponent } from './pages/account/account-address/account-address.component';
import { AccountOrderComponent } from './pages/account/account-order/account-order.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AdminBlogComponent } from './admin/pages/admin/admin-blog/admin-blog.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'shop',
    component: ShopComponent,
    data: { breadcrumb: 'Sản phẩm' },
  },
  {
    path: 'shop/:id',
    component: ShopComponent,
    data: { breadcrumb: 'Sản phẩm' },
  },
  {
    path: 'product/:id', component: ProductDetailComponent, data: { breadcrumb: 'Chi tiết sản phẩm' }
  },
  { path: 'blog', component: BlogComponent, data: { breadcrumb: 'Bài viết' } },
  { path: 'blog/:id', component: BlogdetailsComponent },

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
  { path: 'wish', component: WishlistComponent, data: { breadcrumb: 'Danh sách yêu thích' } },
  {
    path: 'account',
    component: AccountComponent,
    data: { breadcrumb: 'Tài khoản' },
    children: [
      { path: '', component: AccountProfileComponent },
      { path: 'profile', component: AccountProfileComponent },
      { path: 'address', component: AccountAddressComponent },
      { path: 'order', component: AccountOrderComponent },
      { path: 'nofications', component: AccountNoficationComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: 'Bảng điều khiển' },
    canActivate: [AuthAdminGuard],
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
  {
    path: 'admin/product',
    component: AdminproductComponent,
  },
  {
    path: 'admin/blog',
    component: AdminBlogComponent,
  },
  {
    path: 'admin/order',
    component: AdminorderComponent,
  },
  {
    path: 'admin/account',
    component: AdminaccountComponent,
  },
  { path: 'admin/login', component: AdminloginComponent },
  {
    path: 'admin/register',
    component: AdminregisterComponent,
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AuthAdminGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
