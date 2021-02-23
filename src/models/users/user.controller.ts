import UserService, { IUserCreateParams } from './user.service';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import TokenService from './token.service';

export const register = (req: Request, res: Response, next: NextFunction) => {
  UserService.create(req.body as IUserCreateParams)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
};

export const verify = (req: Request, res: Response, next: NextFunction) => {
  UserService.findByEmail(req.query.email as string)
    .then(user => {
      if (user.emailVerifiedAt) res.status(202).json({ message: 'Email already verified'})
      TokenService.findByToken(req.query.token as string)
        .then(token => {
          if (token?.userId !== user.id) throw new ErrorHandler(403, 'Invalid token')
          user.update({ emailVerifiedAt: Date.now() })
            .then(_ => {
              res.json({ message: 'Email verification successful' })
            })
            .catch(() => { throw new ErrorHandler(409, 'Email verification failed') })
        })
        .catch(next)
    })
    .catch(next)
};
