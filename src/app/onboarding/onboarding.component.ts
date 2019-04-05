import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {

  working = false;

  constructor() { }

  setVisited() {
    this.working = true;
    localStorage.setItem('returnUser', 'true');
  }

  ngOnInit() {
  }

}
