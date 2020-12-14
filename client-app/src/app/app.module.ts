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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InterestsComponent,
    HistoryComponent,
    BooksBrowseComponent,
    BooksDetailedComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
