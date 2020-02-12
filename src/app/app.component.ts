import { Component } from '@angular/core';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { Router } from '@angular/router';
import { UserService } from './providers/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authSrvc: FirebaseAuthService, private router: Router, private usrSrvc: UserService) {
    authSrvc.watchForAuthState().subscribe(user => {
      console.log(`User logged in status: AppCompnenet`, user);
      if (user) {
        usrSrvc.save(user);
        console.log(`User logged in: AppCompnenet`, user);
        const returnUrl = localStorage.getItem('returnUrl');
        console.log(`User logged in: AppCompnenet`, user, returnUrl);
        setTimeout(() => {
          router.navigateByUrl(returnUrl).then(x => console.log('navigation status', x)).catch(err => console.log(`Error occured`, err));
        }, 0);

      }
    });
  }


}
