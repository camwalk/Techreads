import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Interest } from '../models/interest';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //this may need changed if not working
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public login(model: any) {
    return this.http.post(this.url + 'authenticate', {'username' : model.username, 'password' : model.password}).pipe(
      map((response: any) => {
        const user = Response;
        if(user) {
          //if authentication is added change this to take in token
          localStorage.setItem('user', model.username);
        }
      })
    )
  }

  public logout() {
    localStorage.removeItem('user');
  }

  getInterests(username): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.url + 'interests/' + username);
  }
}
