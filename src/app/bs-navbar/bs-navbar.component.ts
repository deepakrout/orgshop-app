import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  user$: Observable<firebase.User>;
  // user$: Observable<any>;

  constructor(private fbAuth: FirebaseAuthService) {
    this.user$ = fbAuth.watchForAuthState();

  }

  ngOnInit() {

  }

  logout() {
    this.fbAuth.logout();
  }

}
