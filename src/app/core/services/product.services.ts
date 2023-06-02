import { Injectable, inject } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable, throwError, catchError, filter, map, switchMap, takeUntil, Subject, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private unsubscribe$ = new Subject<void>();
  constructor(private firestore: Firestore) {

  }
  products: any[] = []

  getAllCategory(): Observable<any[]> {
    const data = collection(this.firestore, 'category');

    return collectionData(data) as Observable<any[]>;
  }

  getId(id: string) {
    const catRef = doc(this.firestore, `category/${id}`)
    return docData(catRef) as Observable<any>
  }

  getProduct(id: number): any {
    return this.products.find(item => item.id === id);
  }
}


