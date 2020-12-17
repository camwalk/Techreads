import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: Book[]=[];
  retrievedBooks: Book[]=[];

  constructor(private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchBooks(this.route.snapshot.paramMap.get('searchText'));
  }
  
  searchBooks(searchText) {
    this.booksService.getBooks().subscribe(books => {
      this.retrievedBooks = books;
      this.retrievedBooks.forEach(book => {
        if(book.title.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.description.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.category.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.authors.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.isbn.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.publisher.includes(searchText.toString()))
        {
          this.books.push(book);
        }
        else if(book.year == (searchText.toString()))
        {
          this.books.push(book);
        }
        console.log(this.books);
      });
    });
  }
}
