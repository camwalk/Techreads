import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Review } from '../models/review';

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
}
