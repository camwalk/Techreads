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

  addHistory(id, username, datetime){
    return this.http.post(this.url + 'history', {'user' : username, "book" : id, "date": datetime});
  }

  getHistory(username): Observable<History[]>{
    return this.http.get<History[]>(this.url + 'history/' + username);
  }

  
}
