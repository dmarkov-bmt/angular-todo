import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  public todoList: Todo[] = [];
  public activeTab = 'all';
  public perPage = 5;
  public curPage = 1;
  public lastPage = 1;
  public activeItems = 0;
  public complItems = 0;
  public todoPortion: Todo[] = [];

  constructor(private todoService: TodoService) {
  }

  public ngOnInit() {
    this.getTodo();
  }

  public changeTab(tab: string) {
    this.activeTab = tab;
    this.getTodo();
  }

  public getTodo(): void {
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
        if (this.lastPage === 0) {
          this.lastPage = 1;
        }
        if (this.curPage > this.lastPage) {
          this.curPage = 1;
        }

        this.todoPortion = this.todoPortion.slice((this.curPage - 1) * this.perPage, this.curPage * this.perPage);
      });
  }

  public addTodo(value) {
    if (value.trim()) {
      this.todoService.addNew(value)
        .subscribe(() => this.getTodo());
    }
  }

  public updateTodo(data) {
    this.todoService.updateTodo(data)
      .subscribe(() => this.getTodo());
  }

  public remove(id) {
    this.todoService.remove(id)
      .subscribe(ok => this.getTodo());
  }

  public pageLeft() {
    if (this.curPage > 1) {
      this.curPage--;
    }
    this.getTodo();
  }

  public pageRight() {
    if (this.curPage < this.lastPage) {
      this.curPage++;
    }
    this.getTodo();
  }

  public deleteAll(data) {
    this.todoService.deleteAllTodo(data)
      .subscribe(() => this.getTodo());
  }

  public completeAll(data) {
    this.todoService.completeAll(data)
      .subscribe(() => this.getTodo());
  }
}
