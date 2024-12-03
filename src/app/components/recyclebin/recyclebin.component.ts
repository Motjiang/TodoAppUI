import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../services/todo.service';
import { TodoRequestDto } from 'src/app/models/todoRequestDto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recyclebin',
  templateUrl: './recyclebin.component.html',
  styleUrls: ['./recyclebin.component.css']
})
export class RecyclebinComponent  implements OnInit{

  todos: Todo[] = [];

  constructor(private todoService:TodoService, private toastr:ToastrService){

  }

  ngOnInit(): void {
   this.getAllDeletedTodos();
  }

  getAllDeletedTodos(){
    this.todoService.getAllDeletedTodos().subscribe({
      next:(response) => {
        this.todos = response;
      }
    })
  }

  undoAction(id: string, todo: Todo) {
    const updatedTodo: TodoRequestDto = {
      TaskId: todo.id, // Map 'id' to 'TaskId'
      TaskDescription: todo.description, // Map 'description' to 'TaskDescription'
      TaskCreatedDate: todo.createdDate, // Map 'createdDate' to 'TaskCreatedDate'
      IsTaskCompleted: !todo.isCompleted, // Toggle 'isCompleted' for 'IsTaskCompleted'
      TaskCompletedDate:  new Date(), // Set completed date if completed
      IsTaskDeleted: !todo.isDeleted,
      TaskDeletedDate: new Date(),
      
    };
  
    this.todoService.updateUndoTodo(id, updatedTodo).subscribe({
      next: (response) => {
        console.log('Undo succeeded:', response);
        this.clear();
        this.toastr.success("Retrieved successfully")
        this.getAllDeletedTodos();
      },
      error: (error) => {
        console.error('Error to undo a todo:', error);
      },
    });
  }

  clear(){
    this.toastr.clear();
  }
}
