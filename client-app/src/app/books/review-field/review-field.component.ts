import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-field',
  templateUrl: './review-field.component.html',
  styleUrls: ['./review-field.component.css']
})
export class ReviewFieldComponent implements OnInit {
  @Input() review: Review;

  constructor() { }

  ngOnInit(): void {

  }
}
