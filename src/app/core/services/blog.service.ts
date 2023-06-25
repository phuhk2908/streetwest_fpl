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
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Blog } from 'src/app/interface/blog';
import { CommentI } from 'src/app/interface/comment';
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
  deleteBlog(id: string) {
    const ref = doc(this.firestore, `blog/${id}`);
    return deleteDoc(ref);
  }
  async updateBlog(data: Blog) {
    const ref = doc(this.firestore, `blog/${data.id}`);
    return updateDoc(ref, { ...data });
  }
}

