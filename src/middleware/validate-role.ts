import { Response, Request, NextFunction } from 'express';
import { User } from '../components/user/user.class';
import UserService from '../components/user/user.service';
import { ErrorHandler } from './error-handler';

export async function validateAdminRole(req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await User.findOne({ where: { id: res.locals.userId } });
  if (!user) {
    res.status(403).send({ success: 'false', message: 'Unauthorized' });
    return;
  }
  try {
    if (await UserService.isAdmin(user)) {
      next();
    } else {
      res.status(403).send({ success: 'false', message: 'Unauthorized' });
    }
  } catch (error) {
    next(new ErrorHandler(error.statusCode, error.message));
  }
}

export async function validateCollaboratorRole(req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await User.findOne({ where: { id: res.locals.userId } });
  if (!user) {
    res.status(403).send({ success: 'false', message: 'Unauthorized' });
    return;
  }
  try {
    if (await UserService.isCollaborator(user)) {
      next();
    } else {
      res.status(403).send({ success: 'false', message: 'Unauthorized' });
    }
  } catch (error) {
    next(new ErrorHandler(error.statusCode, error.message));
  }
}
