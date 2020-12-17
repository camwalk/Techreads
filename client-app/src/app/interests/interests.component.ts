import { Component, OnInit } from '@angular/core';
import { Interest } from '../models/interest';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  interests: Interest[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUserInterests();
  }

  getUserInterests() {
    this.accountService.getInterests(localStorage.getItem("user")).subscribe(interests => {
      for (var x of interests) {
        this.interests.push(x);
      }
      console.log(this.interests);
      });
  }
}
