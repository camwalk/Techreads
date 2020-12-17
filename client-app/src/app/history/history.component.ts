import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  books: Book[]=[];
  bookIds: any[]=[];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.booksService.getHistory(localStorage.getItem("user")).subscribe(history => {
      for(var x of history)
      {
        this.bookIds.push(x.book);
      }
      console.log(this.bookIds);
      this.bookIds.forEach(x => {
        this.booksService.getBook(x).subscribe(books => {
          this.books.push(books);
          console.log(this.books);
        });
      });
    });
  }
}
