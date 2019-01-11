import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit {
  @Input() todoList: Todo[];
  @Output() public add = new EventEmitter();
  @Output() public complete = new EventEmitter();
  @Output() public remove = new EventEmitter();
  @Output() public changeTab = new EventEmitter();

  public ngOnInit() {
  }

  public addTodo(value) {
    this.add.emit(value);
  }

  public completeTodo(data) {
    this.complete.emit(data);
  }

  public removeTodo(id) {
    this.remove.emit(id);
  }

  public activeTab(tab: string) {
    this.changeTab.emit(tab);
  }
}
