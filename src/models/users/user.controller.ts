import UserService, { IUserCreateParams } from './user.service';
import { Response, Request, NextFunction } from 'express';

export const register = (req: Request, res: Response, next: NextFunction) => {
  UserService.create(req.body as IUserCreateParams)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
};
