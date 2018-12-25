import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoList: Todo[];
  activeTab: string = 'all';
  perPage = 5;
  curPage = 1;

  constructor(private todoService: TodoService) {
  }
  ngOnInit() {
    this.getTodo();
  }

  changeTab(tab: string){
    this.activeTab = tab;
    this.getTodo();
  }
  getTodo(): void {
    this.todoService.getTodo(this.activeTab, this.curPage, this.perPage)
      .subscribe(todoList => this.todoList = todoList.portion);
  }

  addTodo(value) {
    if (value.trim())
      this.todoService.addNew(value)
        .subscribe(ok => this.getTodo());
  }

  complete(id) {
    this.todoService.complete(id)
      .subscribe(ok => this.getTodo());
  }

  remove(id) {
    this.todoService.remove(id)
      .subscribe(ok => this.getTodo());
  }

}
