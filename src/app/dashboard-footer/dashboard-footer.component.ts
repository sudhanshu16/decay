import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.scss']
})
export class DashboardFooterComponent implements OnInit {

  @Input() activePage: string;

  constructor() { }

  ngOnInit() {
  }

}
