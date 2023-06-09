import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interface/product';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: Product[] = [];
  productList = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient, private firestore: Firestore) { }
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
    return this.cartList.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity!;
    }, 0);
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
  async createOrder(data: any) {
    const orderCollection = collection(this.firestore, 'order');
    const docRef = await addDoc(orderCollection, data);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  }
  async saveOrder(idOrder: string, cart: Product[]) {
    console.log(idOrder, cart);
    const orderCollection = collection(this.firestore, 'orderDetail');
    const docRef = await addDoc(orderCollection, {
      idOrder: idOrder,
      cart: cart,
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  }
}
