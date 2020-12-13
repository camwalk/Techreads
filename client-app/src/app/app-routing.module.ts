import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksBrowseComponent } from './books/books-browse/books-browse.component';
import { RouterModule, Routes } from '@angular/router';
import { BooksDetailedComponent } from './books/books-detailed/books-detailed.component';
import { InterestsComponent } from './interests/interests.component';
import { HistoryComponent } from './history/history.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'books', component: BooksBrowseComponent},
  {path: 'books/:id', component: BooksDetailedComponent},
  {path: 'interests', component: InterestsComponent},
  {path: 'history', component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
