import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/data/data.service';
import {AuthService} from '../core/auth/auth.service';
import {OneSignalService} from '../one-signal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  articles;
  userID;

  constructor(private dataService: DataService, private authService: AuthService, private oneSignalService: OneSignalService) {

  }

  ngOnInit() {
    this.authService.user.subscribe((d) => {
      this.userID = d.uid;
      localStorage.setItem('user', JSON.stringify({userID: this.userID, email: d.email}));
      this.dataService.fetchArticles(this.userID).subscribe(articles => {
        this.articles = articles;
      });
    });
    this.oneSignalService.init();
  }

  deleteArticle(articleId) {
    this.dataService.deleteArticle(articleId, this.userID).then().catch((e) => {
      alert('Something unexpected happened. Try again later.');
    });
  }

}
