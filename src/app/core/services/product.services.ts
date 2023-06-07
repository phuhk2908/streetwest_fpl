import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDocs,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private unsubscribe$ = new Subject<void>();
  constructor(private firestore: Firestore) {}
  products: any[] = [];
  getAllCategory(): Observable<any[]> {
    const data = collection(this.firestore, 'category');
    return collectionData(data, { idField: 'id' }) as Observable<any[]>;
  }

  getId(id: string) {
    const catRef = doc(this.firestore, `category/${id}`);
    return docData(catRef) as Observable<any>;
  }

  getProduct() {
    const data = collection(this.firestore, 'products');
    return collectionData(data, { idField: 'id' }) as Observable<any[]>;
  }
  getProductByID(id: string) {
    const data = doc(this.firestore, `products/${id}`);
    return docData(data, { idField: 'id' }) as Observable<any>;
  }
}
