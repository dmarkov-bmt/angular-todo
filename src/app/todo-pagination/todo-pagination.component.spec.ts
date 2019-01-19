import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPaginationComponent } from './todo-pagination.component';
import { DebugElement } from '@angular/core';

describe('TodoPaginationComponent', () => {
  let comp: TodoPaginationComponent;
  let fixture: ComponentFixture<TodoPaginationComponent>;
  let pageDe: DebugElement;
  let pageEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoPaginationComponent],
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPaginationComponent);
    comp = fixture.componentInstance;
    pageDe = fixture.debugElement;
    pageEl = pageDe.nativeElement;

  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('current page in HTML must be #curPage in class', () => {
    comp.curPage = 2;
    fixture.detectChanges();

    const curPage = pageEl.querySelector('span');
    expect(curPage.textContent).toBe(String(comp.curPage));
  });

  it('last page in HTML must be #lastPage in class', () => {
    comp.lastPage = 4;
    fixture.detectChanges();

    const lastPage = pageEl.querySelectorAll('span')[1];
    expect(lastPage.textContent).toBe(String(comp.lastPage));
  });

  it('#leftBtn click in HTML raises selected event', () => {
    const left = spyOn(comp, 'pageLeft');

    const pageLeft = pageEl.querySelector('button');
    pageLeft.click();

    expect(left).toHaveBeenCalled();
  });

  it('#rightBtn click in HTML raises selected event', () => {
    const right = spyOn(comp, 'pageRight');

    const pageRight = pageEl.querySelectorAll('button')[1];
    pageRight.click();
    expect(right).toHaveBeenCalled();
  });
});
