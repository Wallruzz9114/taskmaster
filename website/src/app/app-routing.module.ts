import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './modules/tasks/components/create-task/create-task.component';
import { TaskDetailsComponent } from './modules/tasks/components/task-details/task-details.component';
import { TaskEditComponent } from './modules/tasks/components/task-edit/task-edit.component';
import { TaskListComponent } from './modules/tasks/components/task-list/task-list.component';
import { UserDetailsComponent } from './modules/users/components/user-details/user-details.component';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    data: { title: 'Users Page' },
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    data: { title: 'User Details' },
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    data: { title: 'Task Page' },
  },
  {
    path: 'task/new',
    component: CreateTaskComponent,
    data: { title: 'Create Task' },
  },
  {
    path: 'task/edit/:id',
    component: TaskEditComponent,
    data: { title: 'Update Task' },
  },
  {
    path: 'task/:id',
    component: TaskDetailsComponent,
    data: { title: 'Task Details' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
