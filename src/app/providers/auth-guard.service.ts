import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';
import * as firebase from 'firebase/app';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private authSrvc: FirebaseAuthService,
              private router: Router) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    console.log(`Before canActivate`);
    return this.authSrvc.$user.pipe(
      tap( user => console.log(`user found`, user)),
      map( user => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

    // // return Promise.resolve(true);
    // console.log(`Before canActivate`);
    // // const user = await this.authSrvc.isLoggedIn();
    // return new Promise((res, rej) => {
    //   let user: firebase.User;
    //   this.authSrvc.$user.pipe(
    //     tap( data => console.log(data))

    //   );
    //   // this.authSrvc.$user.subscribe(data => {
    //   //   user = data;
    //   //   console.log(`User in canActivate`, user);
    //   //   if (user) {
    //   //     console.log('User authenticated! ', user);
    //   //     res(true);
    //   //   } else {
    //   //     this.router.navigate(['/login']);
    //   //     res(false);
    //   //   }
    //   // });

    // });


  // }

}

