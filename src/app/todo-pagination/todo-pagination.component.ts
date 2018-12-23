import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-pagination',
  templateUrl: './todo-pagination.component.html',
  styleUrls: ['./todo-pagination.component.scss'],
})
export class TodoPaginationComponent implements OnInit {
  curPage: number;
  lastPage: number;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodo()
      .subscribe(todoList => {
        this.curPage = todoList.currentPage;
        this.lastPage = todoList.lastPage
      });
  }

}
