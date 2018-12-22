import { Injectable } from '@angular/core';
import {Todo} from './todo';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }

  todoList: Todo[] = [
    {id: 1, value: 'Hello', isActive: true},
    {id: 2, value: 'How are you', isActive: true},
    {id: 3, value: 'Goodbye', isActive: true}
  ];

  getTodo(): Observable<Todo[]>{
    return of(this.todoList);
  }

  newId(){
    return Math.max.apply(null, this.todoList.map(todo => todo.id)) + 1;
  }

  addNew(value): Observable<Todo[]>{
    const id:number = this.newId();
    this.todoList.push({id:id, value: value, isActive: true})
    return of(this.todoList);
  }
  remove(id): Observable<Todo[]>{
    this.todoList = this.todoList.filter(todo => todo.id != id);
    return of(this.todoList);
  }
  complete(id): Observable<Todo[]>{
    const index  = this.todoList.findIndex(todo => todo.id == id);
    this.todoList[index].isActive = false;
    return of(this.todoList);
  }

}
