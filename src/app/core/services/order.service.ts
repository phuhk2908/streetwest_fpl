import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
    deleteDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, finalize, from, map, tap } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    getOrderData: any;
    constructor(private firestore: Firestore, private storage: AngularFireStorage) {

    }
    delOrder(id: string) {
        const ref = doc(this.firestore, `order/${id}`);
        return deleteDoc(ref);
    }
    getOrders(): Observable<any[]> {
        const data = collection(this.firestore, 'order');
        return collectionData(data, { idField: 'id' }) as Observable<any[]>;
    }
    getIdDetailOrder(id: string) {
        const Ref = doc(this.firestore, `orderDetail/${id}`);
        return docData(Ref) as Observable<any>;
    }
}