import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-browse',
  templateUrl: './books-browse.component.html',
  styleUrls: ['./books-browse.component.css']
})
export class BooksBrowseComponent implements OnInit {
  books: Book[];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.populateBooks();
  }

  populateBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }
}
