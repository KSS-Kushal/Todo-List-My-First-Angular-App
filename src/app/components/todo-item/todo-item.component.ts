import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../text/text.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CheckBoxComponent } from '../check-box/check-box.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, TextComponent, InputComponent, ButtonComponent, CheckBoxComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!:Todo;
  @Output() handleDelete = new EventEmitter<Todo>();
  @Output() handleMarkAsDone = new EventEmitter<Todo>();

  onCheckBoxClick(todo: Todo){
    this.handleMarkAsDone.emit(todo);
  }

  clickDeleteBtn(todo:Todo){
    this.handleDelete.emit(todo);
  }
}
