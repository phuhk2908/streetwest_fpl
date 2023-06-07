
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';

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

  constructor(
    public authService: AuthService,
     private cartService: CartService
  ) {}
  
  private subscription: Subscription = new Subscription();
  

  ngOnInit() {
  this.cartService.getCart().subscribe((data) => {
      this.listCart = data;
      this.listCartLength = this.listCart.reduce((acc, cur) => {
        return acc + cur.quantity!;
      }, 0);
    });
  }
  ngDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


