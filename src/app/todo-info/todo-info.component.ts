import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss'],
})
export class TodoInfoComponent implements OnInit {
  @Input() activeItems: number;
  @Input() complItems: number;
  @Output() complAll = new EventEmitter();
  @Output() delAll = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  deleteAll(){
    this.delAll.emit();
  }
  completeAll(){
    this.complAll.emit();
  }
}
