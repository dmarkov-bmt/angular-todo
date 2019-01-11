import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  constructor(private http: HttpClient) {
  }

  private todoUrl = 'todo';

  getTodo(): Observable<any> {
    return this.http.get<any>(`${this.todoUrl}`);
  }

  addNew(value): Observable<any> {
    return this.http.post<any>(`${this.todoUrl}`, { 'value': value });
  }

  remove(id): Observable<any> {
    return this.http.delete<any>(`${this.todoUrl}/${id}`, {});
  }

  update(data): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}/update`, { data });
  }

  deleteAll(data): Observable<any> {
    return this.http.request<any>('delete', `${this.todoUrl}`, { body: data });
  }

  completeAll(data): Observable<any> {
    return this.http.put<any>(`${this.todoUrl}`, { data });
  }
}
