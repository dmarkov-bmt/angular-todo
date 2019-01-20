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
        observer.next({});
      }, 10);
    });
  },
  update(data: Todo) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next({});
      }, 10);
    });
  },
  remove(id: string) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next({});
      }, 10);
    });
  },
  completeAll(data: Todo[]) {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
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

