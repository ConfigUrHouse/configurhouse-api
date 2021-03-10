import { User, UserAttributes } from './user.class';
import UserService from './user.service';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import TokenService from '../token/token.service';
import { Token } from '../token/token.class';
import { TokenTypes } from '../token-type/token-type.class';
import { getPagination, getPagingData } from '../../shared/pagination';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  const size = req.query.size ? parseInt(req.query.size as string) : undefined
  const page = req.query.page ? parseInt(req.query.page as string) : 0
  const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0} ;
  const firstname = req.query.firstname as string
  const lastname = req.query.lastname as string
  const type = req.query.type
  const filters: { firstname?: string, lastname?: string, type?: string } = {}
  if (firstname) filters.firstname = firstname
  if (lastname) filters.lastname = lastname
  //TODO filter by type
  User.findAndCountAll({
    limit: limit,
    offset: offset,
    where: filters
  })
    .then((data) => {
      res.send(getPagingData(data, page, limit));
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

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = await UserService.findByEmail(req.query.email as string);
  if (user.active) res.status(202).json({ message: 'Email already verified' });
  const token: Token = await TokenService.findByTypeAndValue(TokenTypes.EmailVerification, req.query.token as string);
  if (token.id_User !== user.id || token.expired_at <= new Date(Date.now()))
    return next(new ErrorHandler(403, 'Invalid token'));
  const updatedToken: Token = await token.update({ validate_at: new Date(Date.now()) });
  if (!updatedToken) return next(new ErrorHandler(409, 'Email verification failed'));
  const updatedUser: User = await user.update({ active: 1 });
  if (!updatedUser) return next(new ErrorHandler(409, 'Email verification failed'));
  res.json({ success: true, message: 'Email verification successful' });
};

export const sendVerificationEmail = (req: Request, res: Response, next: NextFunction) => {
  UserService.sendVerificationEmail(req.query.email as string)
    .then(() => res.json({ success: true, message: 'Verification email sent' }))
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
