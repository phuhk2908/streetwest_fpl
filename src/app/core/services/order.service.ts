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
    orderBy,
} from '@angular/fire/firestore';
import {
    BehaviorSubject,
    Observable,
    Subject,
    finalize,
    from,
    map,
    tap,
} from 'rxjs';
import { Product } from 'src/app/interface/product';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    getOrderData: any;
    constructor(
        private firestore: Firestore,
        private storage: AngularFireStorage
    ) { }
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
        return docData(Ref, { idField: 'id' }) as Observable<any>;
    }
    async getOrderByIDUser(idUser: string) {
        let orderList: any[] = [];
        const data = query(
            collection(this.firestore, 'order'),
            where('userID', '==', idUser),
            orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(data);
        querySnapshot.forEach((doc) => {
            orderList.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        return orderList;
    }
    updateDoc(data: any) {
        const ref = doc(this.firestore, 'order', data.id);
        return updateDoc(ref, { status: data.status })
    }
}
