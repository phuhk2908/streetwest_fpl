import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart.service';
import { WishListService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishList: Product[] = [];
  constructor(
    private messageService: MessageService,
    private cartService: CartService,
    private wish: WishListService
  ) { }
  ngOnInit(): void {
    this.wish.getWishList().subscribe((data: any) => {
      this.wishList = data;
    });
  }
  delWish(id: string) {
    this.wish.delWish(id);
  }
}
