import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { errorMiddleware } from './modules/middlewares/error.middleware';
import { LoggerMiddleware } from './modules/middlewares/logger.middleware';
import { TaskController } from './modules/tasks/controller/task.controller';
import { UserController } from './modules/users/controller/user.controller';
import dbConfig from './utils/ormconfig';

const main = async () => {
  await createConnection(dbConfig);

  const serverPort = 3000;
  const websitePort = 4200;
  const app = express();
  const logger = new LoggerMiddleware();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: `http://localhost:${websitePort}`,
      credentials: true,
    })
  );

  app.use('/', new UserController().router);
  app.use('/', new TaskController().router);

  app.use(errorMiddleware);

  app.listen(serverPort, () => {
    logger.loggerMiddleware.info(`Listening to port ${serverPort}`);
  });
};

main().catch((error) => {
  console.log(error);
});
