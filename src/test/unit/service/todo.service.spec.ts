import { HttpBackend, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingBackend } from '@angular/common/http/testing/src/backend';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientBackendService } from 'angular-in-memory-web-api';
import { Todo } from '../../../app/todo';
import { TodoService } from '../../../app/todo.service';
import { newTodo, todos, todos } from './test-data';
import { Stub } from './todo.service.stub';


describe('TodoService', () => {
  let http: HttpTestingController;
  let todoService: TodoService;
  let todoData: Todo[];
  const todoUrl = 'todo';
  const value = 'go to a park';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TodoService]
    });
    http = TestBed.get(HttpTestingController);
    todoService = TestBed.get(TodoService);
  });

  afterEach(() => {
    http.verify();
  });

  test('Should create', () => {
    expect(todoService).toBeTruthy();
  });

  test('getTodo: should have made one request to GET data from expected URL', () => {
    todoService.getTodo().subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne('todo');

    expect(req.request.method).toEqual('GET');
    req.flush(todos);
    expect(todoData).toEqual(todos);
  });

  test('addNew: should have made one request to POST data from expected URL', () => {
    todoService.addNew(value).subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne(todoUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({'value': 'go to a park'});
    req.flush(newTodo);
    expect(todoData).toEqual(newTodo);
  });

  test('remove: should have made one request to DELETE data from expected URL', () => {
    const id = newTodo.id;
    todoService.remove(id).subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne(`${todoUrl}/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(newTodo);
    expect(todoData).toEqual(newTodo);
  });

  test('update: should have made one request to PUT data from expected URL', () => {
    let updateData = todos[0];
    updateData.value = value;
    todoService.update(updateData).subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne(`${todoUrl}/update`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updateData);
    expect(todoData).toEqual(updateData);
  });

  test('deleteAll: should have made one request with method DELETE data from expected URL', () => {
    todoService.deleteAll(todos).subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne(todoUrl);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    expect(todoData).toBeNull();
  });

  test('completeAll: should have made one request to PUT data from expected URL', () => {
    todoService.completeAll(todos).subscribe((data) => {
      todoData = data;
    });
    const req = http.expectOne(todoUrl);
    expect(req.request.method).toEqual('PUT');
    req.flush(todos);
    expect(todoData).toEqual(todos);
  });
});
