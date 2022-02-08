import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/shared/components/footer/footer.component';
import { NavBarComponent } from './modules/shared/components/nav-bar/nav-bar.component';
import { CreateTaskComponent } from './modules/tasks/components/create-task/create-task.component';
import { TaskDetailsComponent } from './modules/tasks/components/task-details/task-details.component';
import { TaskEditComponent } from './modules/tasks/components/task-edit/task-edit.component';
import { TaskListComponent } from './modules/tasks/components/task-list/task-list.component';
import { TaskService } from './modules/tasks/service/task.service';
import { UserDetailsComponent } from './modules/users/components/user-details/user-details.component';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { UserService } from './modules/users/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    UserListComponent,
    UserDetailsComponent,
    TaskListComponent,
    TaskEditComponent,
    TaskDetailsComponent,
    CreateTaskComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title, TaskService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
