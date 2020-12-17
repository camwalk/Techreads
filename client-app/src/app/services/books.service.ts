import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + 'books');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.url + 'books/' + id);
  }

  addHistory(id, username, datetime) {
    console.log(id);
    console.log(username);
    console.log(datetime);
    console.log(this.url + 'history', { 'user': username, "book": id, "date": datetime });
    return this.http.post<any>(this.url + 'history', { 'user': username, "book": id, "date": datetime });
  }

  getHistory(username): Observable<History[]> {
    return this.http.get<History[]>(this.url + 'history/' + username);
  }

  addReview(id, reviewtext, username) {
    var review = { 'reviewer': username, 'review': reviewtext };
    return this.http.post<any>(this.url + 'books/review/' + id, {"reviewer" : review.reviewer, "review" : review.review});
  }
}
