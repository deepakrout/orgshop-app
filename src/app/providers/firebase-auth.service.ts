import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) { }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log(`returnUrl saved`, returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    localStorage.setItem('returnUrl', null);
    this.afAuth.auth.signOut();
  }

  watchForAuthState(): Observable<firebase.User>  {
    return this.afAuth.authState;
  }

  isLoggedIn(): Promise<any> {
    return this.afAuth.authState.pipe(tap( user => console.log(`User found`, user)), first()).toPromise();
  }

}
