import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit {
  todoList: Todo[];
  constructor(private todoService: TodoService) {
  }

  getTodo(): void{
    this.todoService.getTodo()
      .subscribe(todoList => this.todoList = todoList);
  }

  ngOnInit() {
    this.getTodo();
  }
  onComplete(id){
    this.todoService.complete(id)
      .subscribe(todoList => this.todoList = todoList)

  }
  onRemove(id){
    this.todoService.remove(id)
      .subscribe(todoList => this.todoList = todoList)
  }
}
