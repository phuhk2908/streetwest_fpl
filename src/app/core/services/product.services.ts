import { Injectable } from '@angular/core';
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
  orderBy,
  startAfter,
  limit,
  startAt,
  OrderByDirection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, from, map, tap } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private unsubscribe$ = new Subject<void>();
  keysearch = new BehaviorSubject('');
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
    return collectionData(data, { idField: 'id' }) as Observable<Product[]>;
  }
  getProductByID(id: string) {
    const data = doc(this.firestore, `products/${id}`);
    return docData(data, { idField: 'id' }) as Observable<any>;
  }
  async getProductBySlug(slug: string) {
    let product: any;
    const data = query(
      collection(this.firestore, 'products'),
      where('slug', '==', slug)
    );
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      product = doc.data();
      product.id = doc.id;
    });
    return product;
  }
  async updateProductByID(data: Product) {
    const ref = doc(this.firestore, 'products', data.id);
    await updateDoc(ref, {
      size: {
        ...data.size,
      },
    });
  }

  getKeySearch() {
    return this.keysearch.asObservable();
  }
  setKeySearch(key: string) {
    this.keysearch.next(key);
  }
  // async themcot() {
  //   const data = {
  //     feature: "0"
  //   };
  //   const collectionRef = collection(this.firestore, "products");
  //   const q = query(collectionRef);
  //   const querySnapshot = await getDocs(collectionRef);
  //   querySnapshot.forEach((doc) => {
  //     const docRef = doc.ref;
  //     updateDoc(docRef, data);
  //   });
  //   return true
  // }

  async paginator(
    cat: string,
    filter: number[],
    sort: OrderByDirection,
    page: number
  ): Promise<Observable<any[]>> {
    const perPage = 9;
    const baseRef = collection(this.firestore, 'products');
    let currentPageRef;
    const conditions = [];
    if (cat?.length > 0) {
      conditions.push(where('idCategory', '==', cat));
    }
    if (filter) {
      conditions.push(
        where('price', '>', filter[0]),
        where('price', '<', filter[1])
      );
    }

    let count = (
      await getDocs(query(baseRef, ...conditions, orderBy('price', sort)))
    ).docs.map((doc) => doc.data());
    if (page === 0) {
      currentPageRef = query(
        baseRef,
        ...conditions,
        orderBy('price', sort),
        limit(perPage)
      );
    } else {
      let lastVisibleRef = query(
        baseRef,
        ...conditions,
        orderBy('price', sort),
        limit(page)
      );
      const lastVisibleQuerySnapshot = await getDocs(lastVisibleRef);
      const lastVisiblePost =
        lastVisibleQuerySnapshot.docs[lastVisibleQuerySnapshot.docs.length - 1];
      currentPageRef = query(
        baseRef,
        ...conditions,
        orderBy('price', sort),
        startAfter(lastVisiblePost),
        limit(perPage)
      );
    }

    const currentPageQuerySnapshot = await getDocs(currentPageRef);
    const documentData = currentPageQuerySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const data = [documentData, count.length];
    return from([data]) as Observable<any>;
  }
}
