import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  authState;

  constructor(private afauth: AngularFireAuth, private router: Router) { }

  login(usercreds) {
    this.afauth.auth.signInWithEmailAndPassword(usercreds.email, usercreds.password).then((user) => {
      this.authState = user;
      this.router.navigate(['dashboard']);
    })
  }

  authUser(): boolean {
    return this.authState !== null && this.authState !== undefined ? true : false;
  }

}
