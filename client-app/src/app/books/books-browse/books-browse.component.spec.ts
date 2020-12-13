import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksBrowseComponent } from './books-browse.component';

describe('BooksBrowseComponent', () => {
  let component: BooksBrowseComponent;
  let fixture: ComponentFixture<BooksBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
