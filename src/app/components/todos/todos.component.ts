import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../services/todo.service';
import { Guid } from 'guid-typescript';
import { TodoDto } from 'src/app/models/todoDto.model';
import { TodoRequestDto } from 'src/app/models/todoRequestDto.model';
import { ToastrService } from 'ngx-toastr';

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

    private hoverTimeout: any;
    private hoverTimeLimit: number = 10000; 
    private isHovering: boolean = false;

    constructor(private todoService:TodoService, private toastr:ToastrService){
      
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
          this.newTodo.TaskDescription = '';
          this.clear();
          this.toastr.success("Task added successfully")
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
          if(updatedTodo.IsTaskCompleted){
            this.clear();
            this.toastr.success("Task Completed")
          }
          else if(!updatedTodo.IsTaskCompleted){
            this.clear();
            this.toastr.info("Task marked not complete")
          }
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

   
    onMouseOver() {
      this.isHovering = true;
  
      this.clear();
      this.toastr.error('Click to delete this item.', 'Delete Tooltip', {
        timeOut: 3000
      });
  
      // Set a timeout to change the message after the hover time limit
      this.hoverTimeout = setTimeout(() => {
        if (this.isHovering) {
          this.clear();
          this.toastr.warning('You have been hovering for a while! Ready to delete?', 'Delete Tooltip', {
            timeOut: 4000
          });
        }
      }, this.hoverTimeLimit);
    }
  
    onMouseLeave() {
      this.isHovering = false;
  
      // Clear the timeout if mouse leaves the button before the limit
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
  
      // You can also display a different Toastr message if you wish to notify the user when they leave the button.
      this.clear();
    }

    clear(){
      this.toastr.clear();
    }

   


    deleteTodo(id:string) {
      this.todoService.deleteTodo(id).subscribe({
        next:(response) => {
          this.clear();
          this.toastr.success("Moved to recycle bin")
          this.getAllTodos();
        }
      })
    }
}
