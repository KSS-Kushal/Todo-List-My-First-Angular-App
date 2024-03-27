import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TextComponent } from '../text/text.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ CommonModule, TodoItemComponent, TextComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService){
   
  }

  
  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  markAsDone(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !todo.active;
    this.todoService.markAsDone({id: todo._id, payload: {active: todo.active}}).subscribe();
  }

  deleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo).subscribe();
  }

}
