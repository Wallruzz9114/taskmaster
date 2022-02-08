import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: IUser[] = [];
  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [3, 6, 9, 12];

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => console.log('Error fetch user'),
    });
  }

  public onPageDataChange = (event: any): void => {
    this.page = event;
    this.fetchUsers();
  };

  public onPageSizeChange = (event: any): void => {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
  };
}
