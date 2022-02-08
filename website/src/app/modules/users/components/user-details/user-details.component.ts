import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { TaskService } from 'src/app/modules/tasks/service/task.service';
import { IUser } from '../../../../../app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user!: IUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: (response) => {
          this.user = response;
        },
        error: () => console.log('Error while fetching user'),
      });
    }
  }

  public deleteTask(task: ITask): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
