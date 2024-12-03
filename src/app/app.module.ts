import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodosComponent } from './components/todos/todos.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecyclebinComponent } from './components/recyclebin/recyclebin.component';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule} from 'ngx-bootstrap/pagination'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodosComponent,
    RecyclebinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
      positionClass:'toast-top-right',
    }),
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
