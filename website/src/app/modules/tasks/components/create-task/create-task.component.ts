import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from '../../../../../app/modules/users/services/user.service';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public submitted = false;
  public users!: IUser[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => console.log('Error while fetching users'),
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  get selectedUser() {
    return this.form.get('userId');
  }

  public changeUser = (event: any) => {
    this.selectedUser!.setValue(event.target.value, {
      onlySelf: true,
    });
  };

  public onSubmit = (): void => {
    this.submitted = true;

    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.taskService.createTask(this.form.value).subscribe({
      next: (_) => {
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
