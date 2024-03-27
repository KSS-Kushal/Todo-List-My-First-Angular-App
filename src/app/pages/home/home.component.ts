import { Component } from '@angular/core';
import { AddTodoComponent } from '../../components/add-todo/add-todo.component';
import { TextComponent } from '../../components/text/text.component';
import { TodosComponent } from '../../components/todos/todos.component';
import { TodoService } from '../../services/todo.service';

interface AddTodoPayload {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTodoComponent, TextComponent, TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private todoService: TodoService) {

  }

  createTodo(payload: AddTodoPayload) {
    this.todoService.addTodo(payload).subscribe();
  }
}
