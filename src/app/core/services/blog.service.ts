import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
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
  addDoc,
  deleteDoc,
  startAfter,
  limit,
} from '@angular/fire/firestore';
import { Blog } from 'src/app/interface/blog';
import { CommentI } from 'src/app/interface/comment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private firestore: Firestore) {

  }
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

  postComment(data: CommentI) {
    const cmtCollection = collection(this.firestore, 'comments');
    return addDoc(cmtCollection, data);
  }
  async getComments(blogID: string) {
    let comment: any[] = [];
    const data = query(
      collection(this.firestore, 'comments'),
      where('blogID', '==', blogID),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      comment.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return comment;
  }
  getCommentsAll(): Observable<any[]> {
    const data = collection(this.firestore, 'comments');
    return collectionData(data, { idField: 'id' }) as Observable<any[]>;
  }
  async updateComment(data: Blog) {
    const ref = doc(this.firestore, `comments/${data.id}`);
    return updateDoc(ref, { ...data });
  }
  deleteComments(id: string) {
    const ref = doc(this.firestore, `comments/${id}`);
    return deleteDoc(ref);
  }


  async getItems(blogID: string, page: number): Promise<Observable<any[]>> {
    let currentPageRef;
    if (page === 0) {
      currentPageRef = query(
        collection(this.firestore, 'comments'),
        where('blogID', '==', blogID),
        where('block', '==', true),
        orderBy('date', 'desc'),
        limit(5)
      );
    } else {
      let current = query(
        collection(this.firestore, 'comments'),
        where('blogID', '==', blogID),
        where('block', '==', true),
        orderBy('date', 'desc'),
        limit(page))
      const documentSnapshots = await getDocs(current);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      currentPageRef = query(
        collection(this.firestore, 'comments'),
        where('blogID', '==', blogID),
        where('block', '==', true),
        orderBy("date", 'desc'),
        startAfter(lastVisible),
        limit(page));
    }

    let total = (await getDocs(query(collection(this.firestore, 'comments'), where('blogID', '==', blogID), where('block', '==', true)))).docs.map((doc) => doc.data());

    const currentPageQuerySnapshot = await getDocs(currentPageRef);
    const documentData = currentPageQuerySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const data = [documentData, total.length];
    return from([data]) as Observable<any>;
  }
  deleteBlog(id: string) {
    const ref = doc(this.firestore, `blog/${id}`);
    return deleteDoc(ref);
  }
  async updateBlog(data: Blog) {
    const ref = doc(this.firestore, `blog/${data.id}`);
    return updateDoc(ref, { ...data });
  }
}

