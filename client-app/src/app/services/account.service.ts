import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //this may need changed if not working
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  login(model: any) {
    //account/login may also need changed
    return this.http.post(this.url + 'account/login', model);
  }
}
