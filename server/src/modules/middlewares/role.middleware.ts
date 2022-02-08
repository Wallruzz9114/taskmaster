import { ForbidenException } from './error.middleware';

export class RoleMiddleware {
  public roleAuthorization = (req: any, next: any): void => {
    if (req.user.role !== 'admin') {
      throw new ForbidenException();
    } else {
      next();
    }
  };
}
