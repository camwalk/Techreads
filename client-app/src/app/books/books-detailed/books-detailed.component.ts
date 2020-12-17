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
  datetime = new Date();

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('id')).subscribe(book => {
      this.book = book;
      this.reviews = book.reviews;
    })
  }

  addToHistory(){
    if (localStorage.getItem("user") != null){
      this.bookService.addHistory(this.route.snapshot.paramMap.get('id'), localStorage.getItem("user"), this.datetime).subscribe();
      console.log("test");
    }
  }

  addReview() {
    var reviewtext = ((document.getElementById("reviewfield") as HTMLInputElement).value);
    this.bookService.addReview(this.route.snapshot.paramMap.get('id'), reviewtext ,localStorage.getItem("user")).subscribe(data => {
      this.reviews.push(data);
    });
    console.log("test");
  }

  addRating() {

  }
}
