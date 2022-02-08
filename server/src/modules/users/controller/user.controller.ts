import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user';
import { UserService } from '../services/user.service';

export class UserController {
  public path = '/users';
  public router = Router();
  public usersService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.patch(`${this.path}/update/:id`, this.updateUser);
    this.router.delete(`${this.path}/delete/:id`, this.deleteUser);
  }

  private getUsers = async (_request: Request, response: Response, _next: NextFunction) => {
    const users: User[] = await this.usersService.getAllUsers();
    response.status(200).send(users);
  };

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const users: User | undefined = await this.usersService.getUserById(id);

    if (users) {
      response.status(200).send(users);
    } else {
      next(new Error('Error while updating user'));
    }
  };

  private updateUser = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = +request.params.id;
    const userData: CreateUserDto = request.body;
    const user = await this.usersService.updateUser(id, userData);

    if (user) {
      response.status(200).send(user);
    } else {
      next(new Error('Error Occured while updating user'));
    }
  };

  private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = +request.params.id;
    const successResponse = await this.usersService.deleteUserById(id);

    if (successResponse) {
      response.status(200).send('User deleted successfully');
    } else {
      next(new Error('Failed to delete user'));
    }
  };
}
