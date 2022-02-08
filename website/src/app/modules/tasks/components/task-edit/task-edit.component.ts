import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  loading = false;
  submitted = false;
  error!: any;
  taskId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskId = this.router.snapshot.params['id'];

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (response: ITask) => {
          this.taskForm.patchValue(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  // access to form fields
  get f(): any {
    return this.taskForm.controls;
  }

  public onSubmit = (): void => {
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.route.navigate(['/user/profile']);
        },
        error: (error: any) => {
          this.error = error;
        },
      });
    }
  };
}
