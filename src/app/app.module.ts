import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoBarComponent } from './todo-bar/todo-bar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInfoComponent } from './todo-info/todo-info.component';
import { TodoPaginationComponent } from './todo-pagination/todo-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoBarComponent,
    TodoListComponent,
    TodoInfoComponent,
    TodoPaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
