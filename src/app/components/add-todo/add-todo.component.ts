import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [InputComponent, ButtonComponent, TextComponent],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  @Output() onAddTodo = new EventEmitter();
  title: string = '';
  description: string = '';

  constructor(){}

  onChangeTitle(value: string){
    this.title = value;
  }
  onChangeDescription(value: string){
    this.description = value;
  }
  addTodo(){
    const payload = {
      title: this.title,
      description: this.description
    }
    this.onAddTodo.emit(payload);
    this.title = '';
    this.description = '';
  }
}
