import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user;
  working = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe((d) => {
      this.user = d;
    });
  }

  saveSettings() {
    this.working = true;
    this.authService.updateUserData(this.user).then(() => {
      this.working = false;
    }).catch(() => {
      alert('unexpected error happened. please try again later');
      this.working = false;
    });
  }

}
