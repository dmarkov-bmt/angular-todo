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

  private todoUrl = 'todo';
  todoList: Todo[];

  getTodo(activeTab, currentPage, perPage): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}?activeTab=${activeTab}&currentPage=${currentPage}&perPage=${perPage}`);
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

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.todoUrl}`)
  }

  completeAll(): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}`, {})
  }
}
