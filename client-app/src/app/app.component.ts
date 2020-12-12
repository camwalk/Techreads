import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Techreads';
  users: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    //may need changed, needs to match end point of api
    this.httpClient.get('https://localhost:3000/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
