import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from '../../../app/todo-list/todo-list.component';
import { todo, todos } from './test-data';
import { TodoListModel } from './todo-list.model';



describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let todoListModel: TodoListModel;

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
    const value = 'go to a park';
    let todoValue: string;
    const inputEl = fixture.nativeElement.querySelector('.text-input > input');
    const addEl = fixture.nativeElement.querySelector('.text-input > button');
    inputEl.value = value;
    todoListModel.component.add.subscribe((value: string) => todoValue = value);
    addEl.click();
    expect(todoValue).toContain(value);
  });

});
