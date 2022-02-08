import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public currentUser!: IUser;
  public listU: IUser[] = [];

  constructor() {}

  ngOnInit(): void {}
}
