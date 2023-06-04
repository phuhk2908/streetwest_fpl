import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDocs,
  updateDoc,
  query, where
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private unsubscribe$ = new Subject<void>();
  constructor(private firestore: Firestore) { }
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
  // async updateDoc() {
  //   const collectionRef = collection(this.firestore, "products");
  //   const q = query(collectionRef, where("idCategory", "==", '2'));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const docRef = doc.ref;
  //     updateDoc(docRef, { idCategory: 'k2IG2BazToB2O61yJti2' });
  //   });
  // }

}
