import { Injectable, NgZone } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  userAdminData: any; // Save logged in user data
  isLoading: boolean = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userAdminData = user;
        localStorage.setItem('user', JSON.stringify(this.userAdminData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
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
        this.SetUserAdminData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string, username: string) {
    this.isLoading = true;
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.isLoading = false;
        this.SendVerificationMail();
        this.SetUserAdminData(result.user);
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
    return user !== null && user.emailVerified !== false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserAdminData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `admin/${user.uid}`
    );
    const userAdminData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userAdminData, {
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
