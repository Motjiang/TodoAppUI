import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { environment } from 'src/environments/environment';
import { TodoDto } from 'src/app/models/todoDto.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }


  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseApiUrl}/api/todo`);
  }

  addTodo(newTodo: TodoDto): Observable<TodoDto> {
    //Empty Guid
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<TodoDto>(`${environment.baseApiUrl}/api/todo`, newTodo);
  }
}
