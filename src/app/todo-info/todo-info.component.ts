import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss'],
})
export class TodoInfoComponent implements OnInit {
  @Input() activeItems: number;
  @Input() complItems: number;
  @Input() todoList: Todo[];
  @Output() complAll = new EventEmitter();
  @Output() delAll = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteAll(data) {
    this.delAll.emit(data);
  }

  completeAll(data) {
    data.forEach(todoItem => {
      todoItem.isActive = false;
    });
    this.complAll.emit(data);
  }
}
