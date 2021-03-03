import { User, UserAttributes } from './user.class';
import UserService from './user.service';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import TokenService from '../token/token.service';
import { Token } from '../token/token.class';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.status(201).send({
          message: 'Message to define',
        });
      } else {
        next(new ErrorHandler(500, 'Message to define'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Message to define',
        });
      } else {
        next(new ErrorHandler(500, 'Message to define'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: 'Message to define' });
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

const getToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '15m' });
  return { token, expiresAt: new Date(new Date().getTime() + 15 * 60000) };
};

export const register = (req: Request, res: Response, next: NextFunction) => {
  UserService.create(req.body as UserAttributes)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
};

export const verify = (req: Request, res: Response, next: NextFunction) => {
  UserService.findByEmail(req.query.email as string)
    .then(user => {
      if (user.active) res.status(202).json({ message: 'Email already verified'})
      TokenService.findByToken(req.query.token as string)
        .then((token: Token) => {
          if (token?.id_User !== user.id) throw new ErrorHandler(403, 'Invalid token')
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
    .catch(next);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).send({ success: false, message: 'Incorrect email or password' });
  } else if (!user.active) {
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
