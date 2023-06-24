import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Blog } from 'src/app/interface/blog';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private firestore: Firestore) { }
  async getAllBlog() {
    const ref = collection(this.firestore, 'blog');
    const currentPageQuerySnapshot = await getDocs(
      query(ref, orderBy('date', 'desc'))
    );
    const documentData = currentPageQuerySnapshot.docs.map((doc) => {
      return <Blog>{
        id: doc.id,
        ...doc.data(),
      };
    });
    return documentData;
  }
  addBlog(data: Blog) {
    const ref = collection(this.firestore, 'blog');
    return addDoc(ref, data);
  }
  getId(id: string) {
    const catRef = doc(this.firestore, `blog/${id}`);
    return docData(catRef) as Observable<any>;
  }
}
