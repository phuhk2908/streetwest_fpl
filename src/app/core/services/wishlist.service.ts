import { Injectable } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class WishListService {
    wishList = new BehaviorSubject<Product[]>([]);
    constructor(private firestore: Firestore) { }
    getWishList() {
        return this.wishList.asObservable();
    }

    addWishList(product: Product) {
        let index = this.wishList.value.findIndex(item => item.id === product.id);
        if (index < 0) {
            const currentWishList = this.wishList.value;
            const updatedWishList = [...currentWishList, product];
            this.wishList.next(updatedWishList);
            return ''
        } else {
            return 'Đã có trong danh sách'
        }

    }
    delWish(id: string) {
        const currentWishList = this.wishList.value.filter(item => item.id !== id);
        this.wishList.next(currentWishList);
    }
}