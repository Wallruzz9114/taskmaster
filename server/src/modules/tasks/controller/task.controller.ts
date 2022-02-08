import { NextFunction, Response, Router } from 'express';
import { HttpException } from '../../../modules/middlewares/models/http-exception';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../entities/task';
import { TaskService } from '../services/task.service';

export class TaskController {
  public path = '/tasks';
  public router = Router();
  public taskService = new TaskService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.findTask);
    this.router.get(`${this.path}/:id`, this.getTaskById);
    this.router.post(`${this.path}/new`, this.createTask);
    this.router.patch(`${this.path}/update/:id`, this.updateTask);
    this.router.delete(`${this.path}/delete/:id`, this.deleteTask);
  }

  private createTask = async (req: any, res: Response, next: NextFunction) => {
    const taskDto: CreateTaskDto = req.body;

    try {
      const user = await this.taskService.createTask(taskDto);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  private findTask = async (_req: any, res: Response, _next: NextFunction) => {
    const task: Task[] = await this.taskService.getAllTasks();
    res.status(200).send(task);
  };

  private getTaskById = async (req: any, res: Response, next: NextFunction) => {
    const id = +req.params.id;
    const task: Task = await this.taskService.findTaskById(id);
    if (task) {
      res.status(200).send(task);
    } else {
      next(new Error('Error while updating user'));
    }
  };

  private updateTask = async (req: any, res: Response) => {
    const id: number = +req.params.id;
    const taskDto: Task = req.body;
    const task = await this.taskService.findTaskById(taskDto.id);

    if (!req.user.email === task.user.email) {
      throw new HttpException(401, 'Your are not a legitimate user');
    }

    const taskRes = await this.taskService.updateTask(id, taskDto);

    if (taskRes) {
      res.status(200).send(taskRes);
    } else {
      throw new HttpException(400, 'Error Occured while updating task');
    }
  };

  private deleteTask = async (req: any, res: Response, next: NextFunction) => {
    const id: number = +req.params.id;
    const taskUser = await this.taskService.findTaskById(id);

    if (!req.user.email === taskUser.user.email) {
      throw new HttpException(401, 'Your are not authorized');
    }

    const task = await this.taskService.deleteTaskById(id);

    if (task) {
      res.status(200).send('Task deleted successfully');
    } else {
      next(new Error('Failed to delete user'));
    }
  };
}
