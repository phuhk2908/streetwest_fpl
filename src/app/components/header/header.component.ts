
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/core/services/product.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  visible: boolean = true;
  listCartLength: number = 0;
  listCart: Product[] = [];

  constructor(private cartService: CartService, private pd: ProductService, private router: Router, public authService: AuthService) { }
  
  private subscription: Subscription = new Subscription();
  

  ngOnInit() {
  this.cartService.getCart().subscribe((data) => {
      this.listCart = data;
      this.listCartLength = this.listCart.reduce((acc, cur) => {
        return acc + cur.quantity!;
      }, 0);
    });
  }
  async sendKeySearch(key: HTMLInputElement) {
    const data = key.value;
    this.pd.setKeySearch(data);
    key.value = '';
    this.router.navigate(['/product']);
  }
  ngDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


