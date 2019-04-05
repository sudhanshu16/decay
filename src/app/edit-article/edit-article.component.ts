import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/data/data.service';
import {AuthService} from '../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  article;
  userID;
  articleID;
  working = false;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleID = params['id'];
    });
    this.authService.user.subscribe((d) => {
      this.userID = d.uid;
      this.dataService.fetchArticle(this.articleID, this.userID).subscribe(article => {
        this.article = article;
      });
    });
  }

  updateArticle() {
    this.working = true;
    this.dataService.updateArticle(this.article, this.userID, this.articleID).then(() => {
      this.router.navigate(['/dashboard']);
      this.working = false;
    }).catch((e) => {
      this.working = false;
      alert('Something unexpected happened. Try again later.');
    });
  }

}
