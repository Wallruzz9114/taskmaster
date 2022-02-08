import { ITask } from './task';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
  tasks: ITask[];
}
