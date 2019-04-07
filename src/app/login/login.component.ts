import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private afAuth: AngularFireAuth, ) {
    auth.googleLogin();
    afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        const data = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          settings: {
            sendNotifs: true,
            prior: 3,
            interval: 24,
          }
        };
        auth.updateUserData(data);
        this.router.navigate(['dashboard']);
        console.log('logged in');
      }
    }, (error) => {
      console.log('not logged in');
    });
  }

  ngOnInit() {
  }

}
