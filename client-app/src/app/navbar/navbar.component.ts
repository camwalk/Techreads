import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {}
  currentSignIn: boolean;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.currentSignIn = true;
      this.router.navigateByUrl('/books');
    }, error => {
      console.log(error);
    })
  }

  logout() {
      this.currentSignIn = false;
      this.router.navigateByUrl('/');
  }

}


