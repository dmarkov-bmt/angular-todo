import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Todo } from '../../../app/todo';
import { TodoListComponent } from '../../../app/todo-list/todo-list.component';
import { todo } from './test-data';
import { TodoListModel } from './todo-list.model';



describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let todoListModel: TodoListModel;
  const value = 'go to a park';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
    todoListModel = new TodoListModel(fixture);
  }));

  test('Should create', () => {
    expect(todoListModel).toBeTruthy();
  });

  test('Should display name of todo ', () => {
    todoListModel.component.todoList = todo;
    fixture.detectChanges();
    const todoEl = fixture.nativeElement.querySelector('ul > li > span');
    expect(todoEl.textContent).toContain(todoListModel.component.todoList[0].value);
  });

  test('Should raise add event when clicked on the button `add`', () => {
    let todoValue: string;
    const inputEl = fixture.nativeElement.querySelector('.text-input > input');
    const addEl = fixture.nativeElement.querySelector('.text-input > button');
    inputEl.value = value;
    todoListModel.component.add.subscribe((value: string) => todoValue = value);
    addEl.click();
    expect(todoValue).toContain(value);
  });

  test('Should raise remove event when clicked on the button `remove`', () => {
    let idValue: string;
    todoListModel.component.todoList = todo;
    fixture.detectChanges();
    const removeEl = fixture.nativeElement.querySelector('.remove-button');
    todoListModel.component.remove.subscribe((id: string) => idValue = id);
    removeEl.click();
    expect(idValue).toBe(todo[0].id);
  });

  test('Should raise changeTab event when clicked on the button `ALL`', () => {
    let activeValue: string;
    const activeTabAllEl = fixture.nativeElement.querySelectorAll('.tab')[0];
    todoListModel.component.changeTab.subscribe((value: string) => activeValue = value);
    activeTabAllEl.click();
    expect(activeValue).toBe('all');
  });

  test('Should raise changeTab event when clicked on the button `Active`', () => {
    let activeValue: string;
    const activeTabActiveEl = fixture.nativeElement.querySelectorAll('.tab')[1];
    todoListModel.component.changeTab.subscribe((value: string) => activeValue = value);
    activeTabActiveEl.click();
    expect(activeValue).toBe('active');
  });

  test('Should raise changeTab event when clicked on the button `Completed`', () => {
    let activeValue: string;
    const activeTabCompletedEl = fixture.nativeElement.querySelectorAll('.tab')[2];
    todoListModel.component.changeTab.subscribe((value: string) => activeValue = value);
    activeTabCompletedEl.click();
    expect(activeValue).toBe('completed');
  });

  test('Should raise update event when update todo in input', () => {
    let todoData: Todo;
    todoListModel.component.todoList = todo;
    todoListModel.component.changeId = todo[0].id;
    fixture.detectChanges();
    const inputTodoDe = fixture.debugElement.query(By.css('ul > li > input'));
    const inputTodoEl = inputTodoDe.nativeElement;
    todoListModel.component.update.subscribe((data: Todo) => todoData = data);
    inputTodoEl.value = value;
    inputTodoDe.triggerEventHandler('blur', null);
    expect(todoData.value).toBe(value);
  });

  test('ChangeId should have id todo when double clicked on the name of todo', () => {
    todoListModel.component.todoList = todo;
    fixture.detectChanges();
    const todoDe = fixture.debugElement.query(By.css('ul > li > span'));
    todoDe.triggerEventHandler('dblclick', null);
    expect(todoListModel.component.changeId).toBe(todo[0].id);
  });
});
