import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { InterestsComponent } from './interests/interests.component';
import { HistoryComponent } from './history/history.component';
import { BooksBrowseComponent } from './books/books-browse/books-browse.component';
import { BooksDetailedComponent } from './books/books-detailed/books-detailed.component';
import { LandingComponent } from './landing/landing.component';
import { ToastrModule } from 'ngx-toastr';
import { BookFieldComponent } from './books/book-field/book-field.component';
import { ReviewFieldComponent } from './books/review-field/review-field.component';
import { RecommendedComponent } from './books/books-recommended/recommended.component';
import { SearchComponent } from './books/books-search/search.component';
import { ChartsModule } from 'ng2-charts';
import { RatingsChartComponent } from './books/ratings-chart/ratings-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InterestsComponent,
    HistoryComponent,
    BooksBrowseComponent,
    BooksDetailedComponent,
    LandingComponent,
    BookFieldComponent,
    ReviewFieldComponent,
    RecommendedComponent,
    SearchComponent,
    RatingsChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
