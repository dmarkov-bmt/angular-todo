import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-bar',
  templateUrl: './todo-bar.component.html',
  styleUrls: ['./todo-bar.component.scss'],
})
export class TodoBarComponent implements OnInit {
  constructor(private todoService: TodoService) {
  }

  ngOnInit() {

  }


  onAddTodo(value) {
    if (value.trim())
      this.todoService.addNew(value)
        .subscribe();
  }
}
