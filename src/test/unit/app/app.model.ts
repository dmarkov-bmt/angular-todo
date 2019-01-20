import { ComponentFixture } from '@angular/core/testing';

import { AppComponent } from '../../../app/app.component';
import { TodoService } from '../../../app/todo.service';


export class AppModel {
  public component: AppComponent;

  constructor(private fixture: ComponentFixture<AppComponent>) {
    this.component = fixture.componentInstance;
  }

  public get todoService() {
    return this.fixture.debugElement.injector.get(TodoService);
  }
}
