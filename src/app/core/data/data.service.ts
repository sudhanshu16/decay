import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

interface Article {
  uid: string;
  name: string;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {

  }

  fetchArticles(userID) {
    return this.afs.collection<Article>('users/' + userID + '/articles', ref => ref.orderBy('expiry')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Article;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }

  fetchArticle(articleID, userID) {
    return this.afs.collection<Article>('users/' + userID + '/articles').doc(articleID).valueChanges();
  }

  addArticle(article, userID) {
    const expiry = new Date(article.expires);
    article.expiry = expiry.getTime() / 1000;
    return this.afs.collection<Article>('users/' + userID + '/articles').add(article);
  }

  updateArticle(article, userID, articleID) {
    const expiry = new Date(article.expires);
    article.expiry = expiry.getTime() / 1000;
    return this.afs.doc<Article>('users/' + userID + '/articles/' + articleID).update(article);
  }

  deleteArticle(articleID, userID) {
    return this.afs.collection<Article>('users/' + userID + '/articles').doc(articleID).delete();
  }

}
