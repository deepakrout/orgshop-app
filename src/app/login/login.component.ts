import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fbAuth: FirebaseAuthService) {}

  ngOnInit() {
  }

  login() {
    this.fbAuth.login();
  }

}
