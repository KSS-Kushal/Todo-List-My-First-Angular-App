import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Todo } from '../models/Todo';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginService } from './login.service';

interface AddTodoPayload {
  title: string;
  description: string;
}

interface DonePayload {
  id: string;
  payload: {
    active: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();
  header;
  constructor(
    private http: HttpClient,
    private localStore: LocalStoreService,
    private loginService: LoginService
  ) {
    const token = loginService.getAuthToken() || '';
    this.header = {
      'auth-token': token,
    };
    this.fetchTodos().subscribe();
  }

  fetchTodos() {
    return this.http
      .get(`${this.localStore.baseUrl}/api/todos/gettodos`, {
        headers: this.header,
      })
      .pipe(
        tap((data: any) => {
          if (data.success) {
            this.todosSubject.next(data.todos);
          }
        })
      );
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(payload: AddTodoPayload): Observable<any> {
    return this.http
      .post(`${this.localStore.baseUrl}/api/todos/createtodos`, payload, {
        headers: this.header,
      })
      .pipe(tap(() => this.fetchTodos().subscribe()));
    // return this.http.post(`${this.localStore.baseUrl}/api/todos/createtodos`, payload, {headers: this.header});
  }

  markAsDone(data: DonePayload) {
    return this.http.put(
      `${this.localStore.baseUrl}/api/todos/updatetodos/${data.id}`,
      data.payload,
      { headers: this.header }
    );
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http
      .delete(`${this.localStore.baseUrl}/api/todos/deletetodo/${todo._id}`, {
        headers: this.header,
      })
      .pipe(tap(() => this.fetchTodos().subscribe()));

    // return this.http.delete(`${this.localStore.baseUrl}/api/todos/deletetodo/${todo._id}`, {headers: this.header})
  }
}
