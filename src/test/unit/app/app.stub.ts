import { Observable, Observer } from 'rxjs';

import { Todo } from '../../../app/todo';
import { todos } from './test-data';

let isDeleted = false;
export let Stub = {
  getTodo(): Observable<Todo[]> {
    return Observable.create((observer: Observer<Todo[]>) => {
      setTimeout(() => {
        observer.next(isDeleted ? [] : todos);
        isDeleted = false;
      }, 10);
    });
  },
  addNew(value: string) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        todos.push({
          id: '836c80c0-1b5f-18o6-a86a-edd770bba7f4',
          isActive: true,
          value
        });
        observer.next(todos);
      }, 10);
    });
  },
  update(data: Todo) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        const findItem = todos.find((item) => item.id === data.id);
        findItem.value = data.value;
        observer.next(todos);
      }, 10);
    });
  },
  remove(id: string) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        todos.pop();
        observer.next(todos);
      }, 10);
    });
  },
  completeAll(data: Todo[]) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        todos.forEach((item) => {
          item.isActive = !item.isActive;
        });
        observer.next(data);
      }, 10);
    });
  },
  deleteAll(data: Todo[]) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        isDeleted = true;
        observer.next([]);
      }, 10);
    });
  }
};

