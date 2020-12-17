import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AccountService } from 'src/app/services/account.service';
import { BooksService } from 'src/app/services/books.service';
import { Interest } from 'src/app/models/interest';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  books: any[] = [];
  history: any[] = [];
  interests: any[] = [];
  recBooks: any[]= [];

  constructor(private booksService: BooksService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.populateRecBooks();
  }

  populateRecBooks() {
    var username = localStorage.getItem("user");
    this.accountService.getInterests(username).subscribe(interests => {
      for (var x of interests) {
        this.interests.push(x.topic);
      }
    });
    console.log(this.interests);
    this.booksService.getHistory(username).subscribe(history => {
      for (var x of history) {
        this.history.push(x.book);
      }
    });
    console.log(this.history);
    this.booksService.getBooks().subscribe(books => {
      for (var x of books) {
        if (!this.history.includes(x.id)) {
          if(x.category.includes(this.interests.toString())){
            this.recBooks.push(x)
          }
        }
      }
    });
    console.log(this.recBooks);
  }
}

