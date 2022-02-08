import { DeleteResult, getManager, Repository, UpdateResult } from 'typeorm';
import { UserNotFoundException } from '../../../modules/middlewares/error.middleware';
import { LoggerMiddleware } from '../../../modules/middlewares/logger.middleware';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user';

export class UserService {
  public userRepository: Repository<User>;
  public logger = new LoggerMiddleware();

  constructor() {
    this.userRepository = getManager().getRepository(User);
  }

  /** Inserts a new User into the database. */
  public createUser = async (userDto: CreateUserDto): Promise<CreateUserDto> => {
    this.logger.loggerMiddleware.info('Create a new user', userDto);
    const user = await this.searchUser(userDto.email);

    if (user) {
      throw new Error('The User With Email Arleady Exist');
    } else {
      const newUser = this.userRepository.create(userDto);
      return await this.userRepository.save(newUser);
    }
  };

  /** Returns array of all users from db */
  public getAllUsers = async (): Promise<User[]> => {
    return await this.userRepository.find({ where: { isActive: true, isDeleted: false } });
  };

  /** Returns a user by given id */
  public getUserById = async (id: string | number): Promise<User | undefined> => {
    this.logger.loggerMiddleware.info('Fetching user by id: ', id);

    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  };

  public searchUser = async (email: string): Promise<User | undefined> => {
    return await this.userRepository.findOne({
      where: { isActive: true, isDeleted: false, email: email },
    });
  };

  /** Returns a user by email */
  public getUserByEmail = async (email: string): Promise<User | undefined> => {
    const users = await this.userRepository.findOne({
      where: { isActive: true, isDeleted: false, email: email },
    });
    if (!users) {
      throw new Error('The user does not exist');
    } else {
      return users;
    }
  };

  /** Updates a user */
  public updateUser = async (id: number, user: CreateUserDto): Promise<UpdateResult> => {
    try {
      const updatedUser = await this.userRepository.update(id, user);
      return updatedUser;
    } catch (error) {
      throw new UserNotFoundException();
    }
  };

  /** delete user by id */
  public deleteUserById = async (id: number): Promise<DeleteResult> => {
    const user = await this.userRepository.delete(id);
    return user;
  };
}
