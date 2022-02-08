import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public tasks: ITask[] = [];
  public page = 1;
  public count = 0;
  public pageSize = 2;
  public pageSizes = [3, 6, 9, 12];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks = (): void => {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks = response;
      },
      error: () => console.log('Error while fetching tasks'),
    });
  };

  public onPageDataChange = (event: any): void => {
    this.page = event;
    this.getTasks();
  };

  public onPageSizeChange = (event: any): void => {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getTasks();
  };
}
