import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/components/models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {


    todos: Todo[] = [];

    constructor(private todoService:TodoService){}

    ngOnInit(): void {
      this.todoService.getAllTodos().subscribe({
        next: (reponse) => {
          this.todos = reponse
        }
      });
    }
}
