import { getManager, Repository } from 'typeorm';
import { LoggerMiddleware } from '../../../modules/middlewares/logger.middleware';
import { User } from '../../../modules/users/entities/user';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../entities/task';

export class TaskService {
  public taskRepository: Repository<Task>;
  public userRepository: Repository<User>;
  public logger = new LoggerMiddleware();

  constructor() {
    this.taskRepository = getManager().getRepository(Task);
    this.userRepository = getManager().getRepository(User);
  }

  public createTask = async (taskDto: CreateTaskDto): Promise<any> => {
    const task = await this.taskRepository.findOne({
      where: { name: taskDto.name },
    });

    if (task) {
      throw new Error('The Task arleady exist');
    }

    const user = await this.userRepository.findOne(taskDto.userId);

    const tasks = this.taskRepository.create({
      ...taskDto,
      user: user,
    });

    const TaskRes = await this.taskRepository.save(tasks);

    try {
      return TaskRes;
    } catch (except) {
      throw new Error('Task Register Error');
    }
  };

  public getAllTasks = async (): Promise<Task[]> => {
    const tasks: Task[] = await this.taskRepository.find({
      where: { isActive: true, isDeleted: false },
      relations: ['user'],
    });

    this.logger.loggerMiddleware.info(tasks);

    if (!tasks) {
      throw new Error('The No Tasks Found');
    }

    try {
      return tasks;
    } catch (except) {
      throw new Error('Task Register Error');
    }
  };

  public findTaskByTitle = async (name: string): Promise<Task[]> => {
    return this.taskRepository.find({ where: { name: name }, relations: ['user'] });
  };

  public findTaskById = async (id: number): Promise<Task | any> => {
    return this.taskRepository.findOne(id, { relations: ['user'] });
  };

  public updateTask = async (id: number, Task: Task): Promise<any> => {
    const task = await this.findTaskById(id);

    if (!task) {
      throw new Error('The task not found');
    } else {
      try {
        return await this.taskRepository.update(id, Task);
      } catch (error) {
        throw new Error('User Update Error');
      }
    }
  };

  public deleteTaskById = async (id: number): Promise<any> => {
    this.taskRepository.delete(id);
  };
}
