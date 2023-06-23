import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interface/product';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: Product[] = [];
  productList = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient, private firestore: Firestore) {}
  getCart() {
    return this.productList.asObservable();
  }
  setCart(...product: Product[]) {
    this.cartList.push(...product);
    this.productList.next(this.cartList);
  }
  addToCart(product: Product) {
    const isProduct = this.cartList.findIndex(
      (el) => el.id === product.id && el.sizeSelected === product.sizeSelected
    );
    if (isProduct == -1) {
      this.cartList.push({ ...product });
    } else {
      this.cartList[isProduct].quantity! = product.quantity!;
    }
    this.productList.next(this.cartList);
    this.getTotalCart();
  }
  getTotalCart() {
    const cost = this.cartList.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity!;
    }, 0);
    return cost > 300000 ? cost : cost + 15000;
  }
  removeProduct(product: Product) {
    const index = this.cartList.findIndex((el) => el.id === product.id);
    this.cartList.splice(index, 1);
    this.productList.next(this.cartList);
  }
  removeAllProduct() {
    this.cartList = [];
    this.productList.next(this.cartList);
  }
  async createOrder(data: any, idOrder: string) {
    const orderCollection = collection(this.firestore, 'order');
    const docRef = await addDoc(orderCollection, {
      status: 0,
      idOrder: idOrder,
      ...data,
    });
    return docRef.id;
  }

  async saveOrder(cart: Product[]) {
    const orderCollection = collection(this.firestore, 'orderDetail');
    const docRef = await addDoc(orderCollection, {
      cart: cart,
    });
    return docRef.id;
  }
}
