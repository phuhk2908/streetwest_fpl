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
        let wi:Product[]  = JSON.parse(localStorage.getItem('wish')!);
        if(wi){
            this.wishList.next(wi);
        }
        return this.wishList.asObservable();
    }

    addWishList(product: Product) {
        let index = this.wishList.value.findIndex(item => item.id === product.id);
        if (index < 0) {
            const currentWishList = this.wishList.value;
            const updatedWishList = [...currentWishList, product];
            this.wishList.next(updatedWishList);
            localStorage.setItem('wish',JSON.stringify(this.wishList.value));
            return ''
        } else {
            return 'Đã có trong danh sách'
        }

    }
    delWish(id: string) {
        const currentWishList = this.wishList.value.filter(item => item.id !== id);
        localStorage.setItem('wish',JSON.stringify(currentWishList));
        this.wishList.next(currentWishList);
    }
}