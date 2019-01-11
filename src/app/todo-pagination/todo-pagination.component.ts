import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-pagination',
  templateUrl: './todo-pagination.component.html',
  styleUrls: ['./todo-pagination.component.scss'],
})
export class TodoPaginationComponent implements OnInit {
  @Input() curPage: number;
  @Input() lastPage: number;
  @Output() left = new EventEmitter();
  @Output() right = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
  }

  public pageLeft() {
    this.left.emit();
  }

  public pageRight() {
    this.right.emit();
  }
}
