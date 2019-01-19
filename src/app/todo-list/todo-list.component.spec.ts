import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../todo';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  TestBed.configureTestingModule({
    declarations: [TodoListComponent],
  });

  let comp: TodoListComponent;

  describe('TodoListComponent class only', () => {

    beforeEach(() => {
      comp = new TodoListComponent();
    });

    it('raises the selected event when #addTodo called', () => {
      const expValue = 'test';

      comp.add.subscribe(todo => expect(todo).toBe(expValue));
      comp.addTodo('test');


    });

    it('raises the selected event when #updateTodo called', () => {
      const expTodo: Todo = { id: 1, value: 'test', isActive: true };

      comp.update.subscribe(todo => expect(todo).toBe(expTodo));
      comp.updateTodo(expTodo);
    });

    it('raises the selected event when #removeTodo called', () => {
      const expId = 1;

      comp.remove.subscribe(todo => expect(todo).toBe(expId));
      comp.removeTodo(expId);
    });

    it('raises the selected event when #activeTab called', () => {
      const expTab = 'completed';

      comp.changeTab.subscribe(todo => expect(todo).toBe(expTab));
      comp.activeTab(expTab);
    });
  });

  describe('TodoListComponent when tested directly', () => {
    let fixture: ComponentFixture<TodoListComponent>;
    let pageDe: DebugElement;
    let pageEl: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TodoListComponent],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      comp = fixture.componentInstance;

      pageDe = fixture.debugElement;
      pageEl = pageDe.nativeElement;

    });

    it('#Add click in HTML raises selected event', () => {

      const add = spyOn(comp, 'addTodo');
      let input = pageEl.querySelector('input');
      input.value = 'test value';
      fixture.detectChanges();
      const addTodo = pageEl.querySelectorAll('button')[3];
      addTodo.click();

      expect(add).toHaveBeenCalledWith('test value');
      fixture.detectChanges();
      expect(input.value).toBe('');
    });

    it('click on tabs-buttons in HTML raises selected event with corresponding param', () => {

      const changeTabToAll = spyOn(comp, 'activeTab');

      let tabBtn = pageEl.querySelector('button');
      tabBtn.click();
      expect(changeTabToAll).toHaveBeenCalledWith('all');

      tabBtn = pageEl.querySelectorAll('button')[1];
      tabBtn.click();
      expect(changeTabToAll).toHaveBeenCalledWith('active');

      tabBtn = pageEl.querySelectorAll('button')[2];
      tabBtn.click();
      expect(changeTabToAll).toHaveBeenCalledWith('completed');
    });

    it('raises #upadteTodo method when "complete" button clicked', () => {
      const update = spyOn(comp, 'updateTodo');
      comp.todoList = [{ id: 123, value: 'test todo', isActive: true }];

      fixture.detectChanges();

      const complBtn: HTMLElement = pageEl.querySelector('.compl-button');
      complBtn.click();

      expect(update).toHaveBeenCalledWith({ id: comp.todoList[0].id, isActive: false, value: comp.todoList[0].value });
    });

    it('raises #removeTodo method when "remove" button clicked', () => {
      const remove = spyOn(comp, 'removeTodo');
      comp.todoList = [{ id: 123, value: 'test todo', isActive: true }];

      fixture.detectChanges();

      const removeBtn: HTMLElement = pageEl.querySelector('.remove-button');
      removeBtn.click();

      expect(remove).toHaveBeenCalledWith(comp.todoList[0].id);
    });

    // it('raises #updateTodo method when dbl clicked on todo and blur it then', () => {
    //   let update = spyOn(comp, 'updateTodo');
    //   comp.todoList = [{ id: 123, value: 'test todo', isActive: true }];
    //   fixture.detectChanges();
    //
    //   const todoTextDe = pageDe.query(By.css('.todo-item'));
    //   todoTextDe.triggerEventHandler('dblclick', null);
    //
    //   fixture.detectChanges();
    //   const todoInput:HTMLElement = pageEl.querySelector('[autofocus]');
    //   todoInput.blur();
    //
    //   expect(update).toHaveBeenCalled();
    // });

  });
});
