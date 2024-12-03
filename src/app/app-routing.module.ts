import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { RecyclebinComponent } from './components/recyclebin/recyclebin.component';

const routes: Routes = [
  {
    path:'todos',
    component:TodosComponent
  },
  {
    path:'deleted',
    component:RecyclebinComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
