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
  ratings: any[] = [];
  formattedRatings: any[] = [];
  datetime = new Date();
  rating: any;

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  select (event): void {
    this.rating = event.target.value;
    console.log(this.rating);
  }

  getBookDetails() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('id')).subscribe(book => {
      this.book = book;
      this.reviews = book.reviews;
      book.ratings.forEach(x => {
        this.ratings.push(x);
      });
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      var count5 = 0;
      this.ratings.forEach(x => {
        console.log(x);
        if (x == 1) {
          count1 = (count1 + 1);
        }
        if (x == 2) {
          count2 = (count2 + 1);
        }
        if (x == 3) {
          count3 = (count3 + 1);
        }
        if (x == 4) {
          count4 = (count4 + 1);
        }
        if (x == 5) {
          count5 = (count5 + 1);
        }
      });
      this.formattedRatings[0] = count1;
    this.formattedRatings[1] = count2;
    this.formattedRatings[2] = count3;
    this.formattedRatings[3] = count4;
    this.formattedRatings[4] = count5;
    console.log(this.formattedRatings);
    })
  }

  addToHistory() {
    if (localStorage.getItem("user") != null) {
      this.bookService.addHistory(this.route.snapshot.paramMap.get('id'), localStorage.getItem("user"), this.datetime).subscribe();
    }
  }

  addReview() {
    var reviewtext = ((document.getElementById("reviewfield") as HTMLInputElement).value);
    this.bookService.addReview(this.route.snapshot.paramMap.get('id'), reviewtext, localStorage.getItem("user")).subscribe(data => {
      this.reviews.push(data);
    });
  }

  addRating() {
    this.bookService.addRating(this.route.snapshot.paramMap.get('id'), this.rating.toString()).subscribe(data => {
      this.ratings.push(data);
    });
  }
}
