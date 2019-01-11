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
  perPage: number = 5;
  curPage: number = 1;
  lastPage: number;
  activeItems: number;
  complItems: number;
  todoPortion: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.getTodo();
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    this.getTodo();
  }

  getTodo(): void {
    this.todoService.getTodo()
      .subscribe((todo) => {
        this.todoList = todo;
        this.activeItems = todo.filter(item => item.isActive).length;
        this.complItems = this.todoList.length - this.activeItems;
        if (this.activeTab === 'all') {
          this.lastPage = Math.ceil(this.todoList.length / this.perPage);
          this.todoPortion = this.todoList;
        }
        if (this.activeTab === 'active') {
          this.lastPage = Math.ceil(this.activeItems / this.perPage);
          this.todoPortion = this.todoList.filter(todoItem => todoItem.isActive);

        }
        if (this.activeTab === 'completed') {
          this.lastPage = Math.ceil(this.complItems / this.perPage);
          this.todoPortion = this.todoList.filter(todoItem => !todoItem.isActive);

        }
        if (this.lastPage === 0) this.lastPage = 1;

        this.todoPortion = this.todoPortion.slice((this.curPage - 1) * this.perPage, this.curPage * this.perPage);
      });
  }

  addTodo(value) {
    if (value.trim())
      this.todoService.addNew(value)
        .subscribe(() => {
          this.getTodo();
        });
  }

  complete(data) {
    this.todoService.update(data)
      .subscribe(() => this.getTodo());
  }

  remove(id) {
    this.todoService.remove(id)
      .subscribe(ok => this.getTodo());
  }

  pageLeft() {
    if (this.curPage > 1) this.curPage--;
    this.getTodo();
  }

  pageRight() {
    if (this.curPage < this.lastPage) this.curPage++;
    this.getTodo();
  }

  deleteAll(data) {
    this.todoService.deleteAll(data)
      .subscribe(ok => this.getTodo());
  }

  completeAll(data) {
    this.todoService.completeAll(data)
      .subscribe(ok => this.getTodo());
  }
}
