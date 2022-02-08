import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  public task!: ITask;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const taskId: any = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId).subscribe({
      next: (response) => {
        this.task = response;
      },
      error: () => console.log('Error while getting task'),
    });
  }
}
