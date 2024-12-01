import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {


    todos: Todo[] = [];
    newTodo: Todo = {
      id:'',
      description:'',
      createdDate: new Date(),
      isCompleted: false,
      completedDate: new Date()
    };

    constructor(private todoService:TodoService){}

    getAllTodos() {
      this.todoService.getAllTodos().subscribe({
        next: (reponse) => {
          this.todos = reponse
        }
      });
    }

    ngOnInit(): void {
      this.getAllTodos();      
    }

    addTodo() {
      this.todoService.addTodo(this.newTodo).subscribe({
        next: (response) => {
          console.log('Todo added successfully:', response);
          this.getAllTodos(); // Fetch all todos after adding a new one
        },
        error: (error) => {
          console.error('Error adding todo:', error);
        },
      });
    }
}
