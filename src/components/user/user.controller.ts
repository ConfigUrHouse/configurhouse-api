import { User, UserAttributes, UserData } from './user.class';
import UserService from './user.service';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import TokenService from '../token/token.service';
import { Token } from '../token/token.class';
import { TokenTypes } from '../token-type/token-type.class';
import { getPagination, getPagingData } from '../../shared/pagination';
import RoleService from '../role/role.service';
import { UserRole, UserRoles } from '../user-role/user-role.class';
import { asyncFilter } from '../../shared/tools';
import { Role } from '../role/role.class';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const size = req.query.size ? parseInt(req.query.size as string) : undefined;
  const page = req.query.page ? parseInt(req.query.page as string) : 0;
  const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0 };
  const firstname = req.query.firstname as string;
  const lastname = req.query.lastname as string;
  const roleName = req.query.role as string;
  const filters: { firstname?: string; lastname?: string; role?: string } = {};
  if (firstname) filters.firstname = firstname;
  if (lastname) filters.lastname = lastname;
  try {
    const data: { rows: User[]; count: number } = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      limit: limit,
      offset: offset,
      where: filters,
    });
    if (roleName) {
      const role = await RoleService.findRoleByName(UserRoles[roleName as keyof typeof UserRoles]);
      const filteredRows = await asyncFilter(data.rows, async (user: User) => {
        const userRoles = await user.getUserRoles();
        return userRoles.some((userRole) => userRole.id_Role === role.id);
      });
      res.send(getPagingData({ count: filteredRows.length, rows: filteredRows }, page, limit));
    } else {
      res.send(getPagingData(data, page, limit));
    }
  } catch (err) {
    next(new ErrorHandler(err.statusCode, err.message));
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const data = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (data) {
      res.send(data);
    } else {
      next(new ErrorHandler(404, 'User not found'));
    }
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const [num] = await User.update(req.body, {
      where: { id: id },
    });
    if (num === 1) {
      res.status(201).send({
        success: true,
        message: 'User updated',
      });
    } else {
      next(new ErrorHandler(500, 'User update failed'));
    }
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const num = await User.destroy({
      where: { id: id },
    });
    if (num === 1) {
      res.send({
        success: true,
        message: 'User deleted',
      });
    } else {
      next(new ErrorHandler(500, 'User deletion failed'));
    }
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await User.destroy({
      where: {},
      truncate: false,
    });
    res.send({
      success: true,
      message: 'Users deleted',
    });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

const getToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '59m' });
  return { token, expiresAt: new Date(new Date(Date.now()).getTime() + 59 * 60000) };
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.create(req.body as UserAttributes);
    res.json({ message: 'Registration successful', success: true });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
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
  res.redirect(`${process.env.APP_BASE_URL}/login?verified=true`);
};

export const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.sendVerificationEmail(req.query.email as string);
    res.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    next(new ErrorHandler(error.statusCode, error.message));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).send({ success: false, message: "L'identifiant ou le mot de passe est incorrect" });
  } else if (!user.active) {
    res.status(400).send({ success: false, message: "L'adresse mail n'est pas vérifiée" });
  } else {
    res.status(200).send({ success: true, message: 'Login successful', ...getToken(user.id), userId: user.id });
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const currentToken = req.headers.authorization?.split(' ')[1] as string;
  jwt.verify(currentToken, process.env.APP_SECRET as string, undefined, (err, decoded: any) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Server error' });
    } else if (!decoded) {
      res.status(500).send({ success: false, message: 'Server error' });
    } else {
      res.status(200).send({ success: true, message: 'Token refresh successful', ...getToken(decoded.id) });
    }
  });
};

export const sendPasswordResetEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.sendPasswordResetEmail(req.query.email as string);
    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user: User = await UserService.findByEmail(email);
    if (!user.active) return next(new ErrorHandler(403, 'Email not verified'));

    const token: Token = await TokenService.findByTypeAndValue(TokenTypes.PasswordReset, req.query.token as string);
    if (token.id_User !== user.id || token.expired_at <= new Date(Date.now()))
      return next(new ErrorHandler(403, 'Invalid token'));

    const updatedToken: Token = await token.update({ validate_at: new Date(Date.now()) });
    if (!updatedToken) return next(new ErrorHandler(409, 'Password reset failed'));

    const hashedPassword = bcrypt.hashSync(password, 8);
    const updatedUser: User = await user.update({ password: hashedPassword });
    if (!updatedUser) return next(new ErrorHandler(409, 'Password reset failed'));
  } catch (err) {
    return next(err);
  }

  res.json({ success: true, message: 'Password reset successful' });
};

export const updateRoles = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  if (!user) return next(new ErrorHandler(404, 'User not found'));
  const availableRoles: Role[] = await Role.findAll();
  const roleIds: number[] = req.body.roles.map((role: string) => parseInt(role));
  const roles = roleIds.map((roleId) => {
    const role = availableRoles.find((availableRole) => availableRole.id === roleId);
    if (!role) return null;
    return role;
  });
  if (roles.indexOf(null) !== -1)
    return next(new ErrorHandler(400, `Invalid role id '${roleIds[roles.indexOf(null)]}'`));
  const currentRoles: UserRole[] = await user.getUserRoles();
  availableRoles.forEach(async (availableRole) => {
    const hasRole = currentRoles.some((role) => role.id_Role === availableRole.id);
    if (hasRole && !roleIds.includes(availableRole.id)) {
      try {
        await UserRole.destroy({ where: { id_Role: availableRole.id, id_User: user.id } });
      } catch (err) {
        return next(new ErrorHandler(500, 'Unable to delete UserRole'));
      }
    } else if (!hasRole && roleIds.includes(availableRole.id)) {
      try {
        await UserRole.create({ id_Role: availableRole.id, id_User: user.id });
      } catch (err) {
        return next(new ErrorHandler(500, 'Unable to create UserRole'));
      }
    }
    res.json({ success: true, message: 'User roles updated' });
  });
};
