import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPaginationComponent } from './todo-pagination.component';

describe('TodoPaginationComponent', () => {
  let component: TodoPaginationComponent;
  let fixture: ComponentFixture<TodoPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
