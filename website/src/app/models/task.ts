import { IUser } from './user';

export interface ITask {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
