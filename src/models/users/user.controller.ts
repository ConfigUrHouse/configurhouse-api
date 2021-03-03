import UserService, { IUserCreateParams } from './user.service';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import TokenService from '../tokens/token.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './user.class';

const getToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '15m' });
  return { token, expiresAt: new Date(new Date().getTime() + 15 * 60000) };
};

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

export const sendVerificationEmail = (req: Request, res: Response, next: NextFunction) => {
  UserService.sendVerificationEmail(req.query.email as string)
    .then(() => res.json({ message: 'Verification email sent' }))
    .catch(next)
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).send({ success: false, message: 'Incorrect email or password' });
  } else if (!user.emailVerifiedAt) {
    res.status(400).send({ success: false, message: 'Email not verified' });
  } else {
    res.status(200).send({ success: true, message: 'Login successful', ...getToken(user.id) });
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const currentToken = req.headers.authorization?.split(' ')[1] as string;
  jwt.verify(currentToken, process.env.APP_SECRET as string, (err, decoded: any) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Server error' });
    } else if (!decoded) {
      res.status(500).send({ success: false, message: 'Server error' });
    } else {
      res.status(200).send({ success: true, message: 'Token refresh successful', ...getToken(decoded.id) });
    }
  });
};