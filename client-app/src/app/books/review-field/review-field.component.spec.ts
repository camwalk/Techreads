import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFieldComponent } from './review-field.component';

describe('ReviewFieldComponent', () => {
  let component: ReviewFieldComponent;
  let fixture: ComponentFixture<ReviewFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
