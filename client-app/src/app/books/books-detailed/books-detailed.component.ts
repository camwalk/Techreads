import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Review } from 'src/app/models/review';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-detailed',
  templateUrl: './books-detailed.component.html',
  styleUrls: ['./books-detailed.component.css']
})
export class BooksDetailedComponent implements OnInit {
  book: Book;
  reviews: Review[];
  
  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('id')).subscribe(book => {
      this.book = book;
      this.reviews = book.reviews;
      console.log(book);
      console.log(this.reviews)
    })
  }
}
