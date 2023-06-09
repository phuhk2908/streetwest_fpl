import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'primeng/api';
import { Firestore, collection, doc, docData, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  isLoading: boolean = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private messageService: MessageService,
    private firestore: Firestore

  ) {
    /* Saving user data in localstorage when
  logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  async getRole(uid: string) {
    let user: any;
    const data = query(
      collection(this.firestore, 'users'), where('uid', '==', uid)
    );
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  }
  async isAdmin() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const isUser = this.getRole(user.uid).then(res => res);
    const isAdmin = await (isUser.then((data) => {
      if (data.role === 1) return true;
      else return false;
    }))
    return isAdmin;
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    this.isLoading = true;
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        // this.SetUserData(result.user);
        return 'Đăng nhập thành công'
      })
      .catch((error) => {
        this.isLoading = false
        switch (error.code) {
          case 'auth/user-not-found': {
            return 'Tài khoản không tồn tại'
          }
          case 'auth/wrong-password': {
            return 'Sai mật khẩu'
          }
          case 'auth/invalid-email': {
            return 'Email không hợp lệ'
          }
          default: {
            return 'Đăng nhập không thành công'
          }
        }
      });
  }

  SignUp(email: string, password: string, username: string) {
    this.isLoading = true;
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoading = false;
        this.SendVerificationMail();
        this.SetUserData(result.user);
        result.user?.updateProfile({ displayName: username });
      })
      .catch((error) => {
        this.isLoading = false;
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Đặt lại mật khẩu thành công, vui lòng kiểm tra email');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
    // && user.emailVerified !== false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res.additionalUserInfo.isNewUser) {
        this.router.navigate(['register']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      location.reload();
      this.router.navigate(['home']);
    });
  }
}
