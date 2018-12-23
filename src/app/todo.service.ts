import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  constructor(private http: HttpClient) {
  }

  private todoUrl = 'http://localhost:3000/todo';
  todoList: Todo[];

  getTodo(): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}?activeTab=all&currentPage=1&perPage=5`);
  }

  addNew(value): Observable<any> {
    return this.http.post<any>(`${this.todoUrl}`, { value: value });
  }

  remove(id): Observable<any> {
    return this.http.delete<any>(`${this.todoUrl}/${id}`, {});
  }

  complete(id): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}/${id}/makeCompl`, {});
  }
}
