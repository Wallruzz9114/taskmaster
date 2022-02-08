import { Task } from '../modules/tasks/entities/task';
import { User } from '../modules/users/entities/user';

const dbConfig: any = {
  type: 'sqlite',
  database: 'database.sqlite',
  logging: true,
  synchronize: true,
  entities: [User, Task],
  migrations: ['src/db/migrations/**/*.ts'],
  seeds: ['src/db/seeds/**/*.ts'],
  factories: ['src/db/factories/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entities',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
    seedsDir: ['src/db/seeds'],
    factoriesDir: ['src/db/factories'],
  },
};

console.log(dbConfig);

export default dbConfig;
