import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private authSrvc: FirebaseAuthService,
              private router: Router) {
  }

  async canActivate(route, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.authSrvc.isLoggedIn();
    if (user) {
      console.log('User authenticated! ', user);
      return true;
    } else {
      return false;
    }
  }

}

