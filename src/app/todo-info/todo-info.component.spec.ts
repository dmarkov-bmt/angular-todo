import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoComponent } from './todo-info.component';

describe('TodoInfoComponent', () => {
  let comp: TodoInfoComponent;
  let fixture: ComponentFixture<TodoInfoComponent>;
  let pageDe: DebugElement;
  let pageEl: HTMLElement;
  const expectedTodoList = [
    {
      id: 1,
      isActive: true,
      value: 'todo1',
    },
    {
      id: 2,
      isActive: false,
      value: 'todo2',
    },
    {
      id: 3,
      isActive: true,
      value: 'todo3',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoInfoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInfoComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    pageDe = fixture.debugElement;
    pageEl = pageDe.nativeElement;

  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('active items in HTML must be equal #activeItems in comp', () => {
    const expectedActiveItems = 4;
    comp.activeItems = expectedActiveItems;
    fixture.detectChanges();
    const actItems = pageEl.querySelector('span');

    expect(actItems.textContent).toBe('active: ' + String(expectedActiveItems));
  });

  it('completed items in HTML must be equal #complItems in comp', () => {
    const expectedcomplItems = 4;
    comp.complItems = expectedcomplItems;
    fixture.detectChanges();
    const actItems = pageEl.querySelectorAll('span')[1];

    expect(actItems.textContent).toBe('completed: ' + String(expectedcomplItems));
  });

  it('#completeAll btn in HTML must raise selected event', () => {
    const complAllBtn = pageEl.querySelector('button');
    const complAllSpy = spyOn(comp, 'completeAll');
    comp.todoList = expectedTodoList;
    complAllBtn.click();
    fixture.detectChanges();

    expect(complAllSpy).toHaveBeenCalledWith(expectedTodoList);
  });

  it('#deleteAll btn in HTML must raise selected event', () => {
    const delAllBtn = pageEl.querySelectorAll('button')[1];
    const delAllSpy = spyOn(comp, 'deleteAll');
    comp.todoList = expectedTodoList;
    delAllBtn.click();
    fixture.detectChanges();

    expect(delAllSpy).toHaveBeenCalledWith(expectedTodoList);
  });
});
