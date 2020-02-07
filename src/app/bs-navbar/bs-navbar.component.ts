import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  // user: firebase.User;
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    // afAuth.authState.subscribe(user => this.user = user);
    this.user$ = this.afAuth.authState.pipe(
      tap(user => console.log(`user`, user)),
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(x => console.log(x))
    );
  }

  ngOnInit() {

  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
