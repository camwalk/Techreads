import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-field',
  templateUrl: './book-field.component.html',
  styleUrls: ['./book-field.component.css']
})
export class BookFieldComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
