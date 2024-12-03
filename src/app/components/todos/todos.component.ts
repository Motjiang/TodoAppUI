import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../services/todo.service';
import { Guid } from 'guid-typescript';
import { TodoDto } from 'src/app/models/todoDto.model';
import { TodoRequestDto } from 'src/app/models/todoRequestDto.model';

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

    onCompletedChange(id: string, todo: Todo) {
      const updatedTodo: TodoRequestDto = {
        TaskId: todo.id, // Map 'id' to 'TaskId'
        TaskDescription: todo.description, // Map 'description' to 'TaskDescription'
        TaskCreatedDate: todo.createdDate, // Map 'createdDate' to 'TaskCreatedDate'
        IsTaskCompleted: !todo.isCompleted, // Toggle 'isCompleted' for 'IsTaskCompleted'
        TaskCompletedDate:  new Date(), // Set completed date if completed
        IsTaskDeleted: false,
        TaskDeletedDate: new Date(),
        
      };
    
      this.todoService.updateTodo(id, updatedTodo).subscribe({
        next: (response) => {
          console.log('Todo updated successfully:', response);
          this.getAllTodos(); // Refresh the list after update
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
    }

    // onCompletedChange(id: string, todo:Todo){
    //   debugger
    //   todo.isCompleted = !todo.isCompleted
    //   this.todoService.updateTodo(id,todo).subscribe({
    //     next: (response) => {          
    //       this.getAllTodos();
    //     }
    //   });
    // }

   


    deleteTodo(id:string) {
      this.todoService.deleteTodo(id).subscribe({
        next:(response) => {
          this.getAllTodos();
        }
      })
    }
}
