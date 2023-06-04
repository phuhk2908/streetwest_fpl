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
const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'product', component: ShopComponent, data: { breadcrumb: 'Sản phẩm' },
    children: [
      {
        path: 'shop-nam', component: ShopComponent
      },
      {
        path: 'shop-nu', component: ShopComponent
      }
    ]
  },
  { path: 'product/:id', component: ProductDetailComponent, data: { breadcrumb: 'Chi tiết sản phẩm' } },
  { path: 'blog', component: BlogComponent, data: { breadcrumb: 'Blog' } },
  { path: 'contact', component: ContactComponent, data: { breadcrumb: 'Liên Hệ' } },
  { path: 'about-us', component: AboutUsComponent, data: { breadcrumb: 'Về chúng tôi' } },
  { path: 'faq', component: FAQComponent, data: { breadcrumb: 'Câu hỏi thường gặp' } },
  { path: 'cart', component: CartComponent, data: { breadcrumb: 'Giỏ hàng' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
