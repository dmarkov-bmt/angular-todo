import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { defer } from 'rxjs';

describe('AppComponent', () => {
  let todoServiceStub: Partial<TodoService>;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let todoService;
  let todoBD: Todo[];

  beforeEach(() => {
    todoBD = [
      {
        id: 1,
        isActive: true,
        value: 'test todo 1',
      },
      {
        id: 2,
        isActive: false,
        value: 'test todo 2',
      },
      {
        id: 3,
        isActive: true,
        value: 'test todo 3',
      },
      {
        id: 4,
        isActive: true,
        value: 'test todo 4',
      },
      {
        id: 5,
        isActive: false,
        value: 'test todo 5',
      },
      {
        id: 6,
        isActive: false,
        value: 'test todo 6',
      },
    ];

    todoServiceStub = {
      getTodo(): Observable<any> {
        return defer(() => Promise.resolve(todoBD));
      },

      addNew(value): Observable<any> {
        todoBD.push({ id: 7, isActive: false, value: value });
        return defer(() => Promise.resolve(todoBD[6]));
      },

      updateTodo(data): Observable<any> {
        todoBD.forEach(todo => {
          if (todo.id === data.id) {
            todo.isActive = data.isActive;
            todo.value = data.value;
          }
        });
        return defer(() => Promise.resolve(data));
      },

      completeAll(data): Observable<any> {
        todoBD.forEach(todo => todo.isActive = false);
        return defer(() => Promise.resolve(data));
      },

      remove(id): Observable<any> {
        todoBD = todoBD.filter(todo => todo.id !== id);
        return defer(() => Promise.resolve(todoBD));
      },

      deleteAllTodo(data): Observable<any> {
        todoBD = [];
        return defer(() => Promise.resolve([]));
      },
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: TodoService, useValue: todoServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    todoService = TestBed.get(TodoService);
  });

  describe('#getTodo', () => {
    it('info-data and #todoList in comp must be correct after #todoServise.getTodo call', async () => {
      await comp.getTodo();
      expect(comp.todoList).toEqual(todoBD, 'todoList incorrect');
      expect(comp.lastPage).toEqual(2, 'lastPage incorrect');
      expect(comp.activeItems).toEqual(3, 'activeItems incorrect');
      expect(comp.complItems).toEqual(3, 'complItems incorrect');
    });

    it('active tab must be changed when #changeTab called', () => {
      const expectedTab = 'active';
      comp.activeTab = 'completed';
      comp.changeTab(expectedTab);
      expect(comp.activeTab).toEqual(expectedTab);
    });

    it('#todoPortion must be changed in dependency of params when #getTodo called', async () => {
      await comp.getTodo();
      comp.curPage = 2;
      await comp.getTodo();
      let expectedTodoList = todoBD.slice(comp.perPage, comp.perPage * 2);
      expect(comp.todoPortion).toEqual(expectedTodoList);

      comp.curPage = 1;
      comp.perPage = 4;
      expectedTodoList = todoBD.slice(0, comp.perPage);
      await comp.getTodo();
      expect(comp.todoPortion).toEqual(expectedTodoList);

      comp.curPage = 4;
      await comp.getTodo();
      expect(comp.curPage).toBe(1);

      comp.perPage = 5;
      comp.activeTab = 'active';
      expectedTodoList = todoBD.filter(todo => todo.isActive);
      await comp.getTodo();
      expect(comp.todoPortion).toEqual(expectedTodoList);
    });
  });

  describe('#addTodo', () => {
    it('must\'t to add todo-item when #addTodo called with empty or with spaces only string', async () => {
      await comp.getTodo();
      const add = spyOn(todoService, 'addNew');
      const value = '   ';
      await comp.addTodo(value);
      expect(add).not.toHaveBeenCalled();
    });

    it('new todo-item must be added after #addTodo call', async () => {
      await comp.getTodo();
      const value = 'test todo 7';
      await comp.addTodo(value);

      expect(comp.todoList).toEqual(todoBD);
    });
  });

  describe('#update', () => {
    it('update correct todo-item when #update called', async () => {
      await comp.getTodo();
      // const updateSpy = spyOn(todoService, 'updateTodo');
      const expectedTodo = { id: 4, isActive: false, value: 'updated todo 4' };
      await comp.updateTodo(expectedTodo);

      // expect(updateSpy).toHaveBeenCalledWith(expectedTodo);
      expect(comp.todoList[3]).toEqual(expectedTodo);
    });
  });

  describe('#completeAll', () => {
    it('complete all todo-items when #complAll called', async () => {
      await comp.getTodo();
      await comp.completeAll(comp.todoList);
      await comp.getTodo();

      expect(comp.todoList).toEqual(todoBD);
      expect(comp.todoList.filter(todo => todo.isActive)).toEqual([]);
    });
  });

  describe('#remove', () => {
    it('remove todo-item when #remove called', async () => {
      await comp.getTodo();
      // const removeSpy = spyOn(todoService, 'remove');
      const expectedId = 3;
      await comp.remove(expectedId);
      await comp.getTodo();

      // expect(removeSpy).toHaveBeenCalledWith(expectedId);
      expect(comp.todoList.filter(todo => todo.id === expectedId)).toEqual([]);
    });
  });

  describe('#deleteAll', () => {
    it('remove all todo-items when #deleteAll called', async () => {
      await comp.getTodo();
      // const deleteAllSpy = spyOn(todoService, 'deleteAllTodo');
      await comp.deleteAll(comp.todoList);
      await comp.getTodo();

      expect(comp.todoList).toEqual([]);
      // expect(deleteAllSpy).toHaveBeenCalledWith(todoBD);
    });
  });

  describe('pagination', () => {
    it('should be correctly change pages', async () => {
      await comp.getTodo();
      await comp.pageLeft();
      expect(comp.curPage).toBe(1);
      await comp.pageRight();
      expect(comp.curPage).toBe(2);
      await comp.pageRight();
      expect(comp.curPage).toBe(2);
      await comp.changeTab('active');
      expect(comp.curPage).toBe(1);
    });
  });
});
