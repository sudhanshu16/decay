import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/data/data.service';
import {AuthService} from '../core/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  working = false;

  article = {
    name: '',
    expires: '',
    expiry: null
  };

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  addArticle() {
    this.working = true;
    this.authService.user.subscribe((d) => {
      this.dataService.addArticle(this.article, d.uid).then(() => {
        this.working = true;
        this.router.navigate(['/dashboard']);
      }).catch(() => {
        this.working = true;
        alert('Something unexpected happened. Try again later.');
      });
    });
  }

}
