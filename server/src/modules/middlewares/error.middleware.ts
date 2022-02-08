import { NextFunction, Request, Response } from 'express';
import { HttpException } from './models/http-exception';

export const errorMiddleware = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({ status, message });
};

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, 'The user does not exist');
  }
}

export class EmailNotFoundException extends HttpException {
  constructor() {
    super(404, 'The user email does not exist');
  }
}

export class ComparePasswordException extends HttpException {
  constructor() {
    super(401, 'Failed to compare password');
  }
}

export class InvalidPassowrdException extends HttpException {
  constructor() {
    super(401, 'Invalid password provided');
  }
}

export class UnathorizedException extends HttpException {
  constructor() {
    super(401, 'You are not authorized, login to continue');
  }
}

export class CreateAccountException extends HttpException {
  constructor() {
    super(400, 'Failed to create account, Try again Letter');
  }
}

export class ForbidenException extends HttpException {
  constructor() {
    super(505, 'Your Forbidden to Access Resources Requested');
  }
}
