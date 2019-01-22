import { ComponentFixture } from '@angular/core/testing';

import { TodoListComponent } from '../../../app/todo-list/todo-list.component';


export class TodoListModel {
  public component: TodoListComponent;

  constructor(private fixture: ComponentFixture<TodoListComponent>) {
    this.component = fixture.componentInstance;
  }
}
