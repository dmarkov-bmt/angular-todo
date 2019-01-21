import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { describe } from 'selenium-webdriver/testing';

import { AppComponent } from '../../../app/app.component';
import { TodoInfoComponent } from '../../../app/todo-info/todo-info.component';
import { TodoPaginationComponent } from '../../../app/todo-pagination/todo-pagination.component';
import { TodoService } from '../../../app/todo.service';
import { AppModel } from './app.model';
import { Stub } from './app.stub';
import { todos } from './test-data';


describe('AppComponent', () => {
  let appModel: AppModel;
  let fixture: ComponentFixture;
  let todoServiceStub: Partial<TodoService>;
  todoServiceStub = Stub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoInfoComponent,
        TodoPaginationComponent
      ],
      providers: [{ provide: TodoService, useValue: todoServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appModel = new AppModel(fixture);
  }));

  test('Should create the app', () => {
    expect(appModel).toBeTruthy();
  });

  test('Several variables should be defined after ngOnInit', fakeAsync(() => {
    expect(appModel.component.todoList).toBeUndefined();
    expect(appModel.component.activeItems).toBeUndefined();
    expect(appModel.component.complItems).toBeUndefined();
    expect(appModel.component.lastPage).toBeUndefined();
    expect(appModel.component.todoPortion).toBeUndefined();
    appModel.component.ngOnInit();
    tick(10);
    expect(appModel.component.todoList).toBe(todos);
    expect(appModel.component.activeItems).toBeDefined();
    expect(appModel.component.complItems).toBeDefined();
    expect(appModel.component.lastPage).toBeDefined();
    expect(appModel.component.todoPortion).toBeDefined();
  }));

  test('New todo should be added if function addTodo called', fakeAsync(() => {
    appModel.component.todoList = [];
    appModel.component.addTodo('to do');
    tick(20);
    expect(appModel.component.todoList.length).toBe(4);
  }));

  test('Todo should be updated if function update called', fakeAsync(() => {
    appModel.component.todoList = todos;
    appModel.component.update({
      id: '836c80c0-1b5f-11e9-a86a-edd770bba7f4',
      isActive: true,
      value: 'go to a park'
    });
    tick(20);
    expect(appModel.component.todoList[0].value).toEqual('go to a park');
  }));

  test('Todo should be removed if function remove called', fakeAsync(() => {
    appModel.component.todoList = todos;
    appModel.component.remove('836c80c0-1b5f-18o6-a86a-edd770bba7f4');
    tick(20);
    expect(appModel.component.todoList.length).toBe(3);
  }));

  describe('Test AppComponent with TodoPaginationComponent (deep)', () => {
    let previosList;
    let nextList;
    beforeEach(() => {
      previosList = fixture.nativeElement.querySelectorAll('button')[0];
      nextList = fixture.nativeElement.querySelectorAll('button')[1];
    });

    test('Check function pageRight if click on the button `>`', async(() => {
      const getTodoSpy = spyOn(appModel.component, 'getTodo');
      appModel.component.lastPage = 2;
      nextList.click();
      fixture.whenStable().then(() => {
        expect(appModel.component.curPage).toBe(appModel.component.lastPage);
        expect(getTodoSpy).toBeCalled();
      });
    }));

    test('Check function pageLeft if click on the button `<`', async(() => {
      const getTodoSpy = spyOn(appModel.component, 'getTodo');
      appModel.component.curPage = 2;
      previosList.click();
      fixture.whenStable().then(() => {
        expect(appModel.component.curPage).toBe(1);
        expect(getTodoSpy).toBeCalled();
      });
    }));
  });

  describe('Test AppComponent with TodoInfoComponent (deep)', () => {
    let completeAllEl;
    let deleteAllEl;
    let activeEl;
    let completedEl;
    beforeEach(() => {
      completeAllEl = fixture.nativeElement.querySelectorAll('.buttons > button')[0];
      deleteAllEl = fixture.nativeElement.querySelectorAll('.buttons > button')[1];
      activeEl = fixture.nativeElement.querySelectorAll('.info > span')[0];
      completedEl = fixture.nativeElement.querySelectorAll('.info > span')[1];
    });

    test('Should display number of active todos', () => {
      appModel.component.activeItems = 4;
      fixture.detectChanges();
      expect(activeEl.textContent).toBe(`active: ${appModel.component.activeItems}`);
    });

    test('Should display number of completed todos', () => {
      appModel.component.complItems = 5;
      fixture.detectChanges();
      expect(completedEl.textContent).toBe(`completed:${appModel.component.complItems}`);
    });

    test('Array of todos should come to TodoInfoComponent and change ', () => {
      appModel.component.todoList = todos;
      fixture.detectChanges();
      completeAllEl.click();
      expect(appModel.component.todoList[0].isActive).toBeFalsy();
      expect(appModel.component.todoList[1].isActive).toBeFalsy();
      expect(appModel.component.todoList[2].isActive).toBeFalsy();
    });

    test('All todos should be sent and updated if click on the button `Complete all`', async(() => {
      appModel.component.todoList = [];
      fixture.detectChanges();
      completeAllEl.click();
      fixture.whenStable().then(() => {
        expect(appModel.component.todoList[0].isActive).toBeTruthy();
      });
    }));

    test('deleteAll: all todos should be deleted if click on the button `Delete all`', async(() => {
      appModel.component.todoList = todos;
      deleteAllEl.click();
      fixture.whenStable().then(() => {
        expect(appModel.component.todoList).toEqual([]);
      });
    }));
  });
});
