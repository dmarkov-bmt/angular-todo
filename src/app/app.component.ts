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
  perPage:number = 5;
  curPage:number = 1;
  lastPage:number;
  activeItems: number;
  complItems: number;

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
      .subscribe(todo => {
        this.todoList = todo.portion;
        this.lastPage = todo.lastPage;
        this.curPage = todo.currentPage;
        this.activeItems = todo.activeItems;
        this.complItems = todo.completedItems;
      });
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

  pageLeft(){
    if (this.curPage > 1) this.curPage--;
    this.getTodo();
  }

  pageRight(){
    if (this.curPage < this.lastPage) this.curPage++;
    this.getTodo();
  }

  deleteAll(){
    this.todoService.deleteAll()
      .subscribe(ok => this.getTodo())
  }

  completeAll(){
    this.todoService.completeAll()
      .subscribe(ok => this.getTodo())
  }
}
