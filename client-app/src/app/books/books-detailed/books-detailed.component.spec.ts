import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailedComponent } from './books-detailed.component';

describe('BooksDetailedComponent', () => {
  let component: BooksDetailedComponent;
  let fixture: ComponentFixture<BooksDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
