import { Component } from '@angular/core';
import { Todo } from 'src/app/components/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

    todos: Todo[] = [];
}
