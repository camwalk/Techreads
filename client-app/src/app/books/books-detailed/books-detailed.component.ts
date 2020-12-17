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
  ratings: any[]=[];
  datetime = new Date();
  rating: any;

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  public onChange(event): void {
    this.rating = event.target.value;
    console.log(this.rating);
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
    }
  }

  addReview() {
    var reviewtext = ((document.getElementById("reviewfield") as HTMLInputElement).value);
    this.bookService.addReview(this.route.snapshot.paramMap.get('id'), reviewtext ,localStorage.getItem("user")).subscribe(data => {
      this.reviews.push(data);
    });
  }

  addRating() {
    this.bookService.addRating(this.route.snapshot.paramMap.get('id'), this.rating).subscribe(data => {
      this.ratings.push(data);
    });
  }
}
