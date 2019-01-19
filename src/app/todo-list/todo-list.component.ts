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
  @Output() public update = new EventEmitter();
  @Output() public remove = new EventEmitter();
  @Output() public changeTab = new EventEmitter();
  public changeId: String;

  public ngOnInit() {
  }

  public addTodo(value) {
    this.add.emit(value);
  }

  public updateTodo(data) {
    this.update.emit(data);
    this.changeId = '';
  }

  public removeTodo(id) {
    this.remove.emit(id);
  }

  public activeTab(tab) {
    this.changeTab.emit(tab);
  }

  public changeItem(id) {
    this.changeId = id;
  }

}
