import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../services/todo.service';
import { Guid } from 'guid-typescript';
import { TodoDto } from 'src/app/models/todoDto.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {


    todos: Todo[] = [];
    newTodo: TodoDto = {
      id:'',
      TaskDescription:'',
      TaskCreatedDate: new Date(),
      IsTaskCompleted: false,
      TaskCompletedDate: new Date()
    };

    constructor(private todoService:TodoService){
      
    }

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
          this.getAllTodos(); 
        },
        error: (error) => {
          console.error('Error adding todo:', error);
        },
      });
    }
}
