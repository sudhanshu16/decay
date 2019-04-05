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
    afAuth.auth.getRedirectResult().then(function(result) {
      if (result.credential) {
        const credential = result.credential;
        const data = {
          uid: credential['user'].uid,
          email: credential['user'].email,
          name: credential['user'].displayName,
          settings: {
            sendNotifs: true,
            prior: 3,
            interval: 24,
          }
        };
        auth.updateUserData(data);
        console.log('logged in');
      }
    }).catch(function(error) {
     console.log('not logged in');
    });
  }

  ngOnInit() {
  }

}
