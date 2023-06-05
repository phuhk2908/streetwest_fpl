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
  query, where, orderBy, startAfter, limit, startAt, OrderByDirection,
} from '@angular/fire/firestore';
import { Observable, Subject, from, map, tap } from 'rxjs';
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

  async paginator(cat: string, filter: number[], sort: OrderByDirection, page: number): Promise<Observable<any[]>> {

    const postsPerPage = 10;
    const baseRef = collection(this.firestore, "products");
    let currentPageRef;
    const conditions = [];
    if (cat?.length > 0) {
      conditions.push(
        where("idCategory", "==", cat)
      );
    }
    if (filter) {
      conditions.push(
        where("price", ">", filter[0]),
        where("price", "<", filter[1])
      );
    }

    let count = (await getDocs(query(baseRef, ...conditions, orderBy('price', sort)))).docs.map((doc) => doc.data());
    if (page === 0) {
      currentPageRef = query(baseRef, ...conditions, orderBy('price', sort), limit(10));
    } else {
      let lastVisibleRef = query(baseRef, ...conditions, orderBy('price', sort), limit(page));
      const lastVisibleQuerySnapshot = await getDocs(lastVisibleRef);
      const lastVisiblePost = lastVisibleQuerySnapshot.docs[lastVisibleQuerySnapshot.docs.length - 1];
      currentPageRef = query(baseRef, ...conditions, orderBy('price', sort), startAfter(lastVisiblePost), limit(postsPerPage));
    }

    const currentPageQuerySnapshot = await getDocs(currentPageRef);
    const documentData = currentPageQuerySnapshot.docs.map((doc) => doc.data());
    const data = [documentData, count.length];
    return from([data]);
  }
}

