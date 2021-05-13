import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { Model } from 'sequelize/types';
import RoleService from '../../components/role/role.service';
import { Token } from '../../components/token/token.class';
import TokenService from '../../components/token/token.service';
import { User } from '../../components/user/user.class';
import {
  deleteAll,
  deleteOne,
  findAll,
  findOne,
  login,
  refreshToken,
  register,
  sendVerificationEmail,
  update,
  verify,
} from '../../components/user/user.controller';
import UserService from '../../components/user/user.service';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';
import { testHelpers } from '../__mocks__/test-helpers';

describe('User Controller', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let user: User;
  let user1: User;
  let user2: User;
  let user3: User;
  let token: Token;

  beforeEach(() => {
    req = testHelpers.mockReq();
    res = testHelpers.mockRes();
    next = testHelpers.mockNext();
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2021-01-01T00:00:01Z').getTime());
    jest.spyOn(jwt, 'sign').mockImplementation((_) => 'fakeToken');
    (getPagingData as any) = jest.fn((data, page, limit?) => data);
    (getPagination as any) = jest.fn((page, size) => ({ offset: page, limit: size }));
    (user as any) = {
      id: 123,
      firstname: 'John',
      lastname: 'DOE',
      email: 'john.doe@example.com',
      active: 0,
    };
    user.update = jest.fn().mockResolvedValue(user);
    (user1 as any) = {
      id: 1,
      firstname: 'Benjamin',
      lastname: 'RAGOT',
      email: 'benjamin.ragot@example.com',
      active: 1,
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }, { id_Role: 2 }]),
    };
    (user2 as any) = {
      id: 2,
      firstname: 'Peter',
      lastname: 'BAUDRY',
      email: 'peter.baudry@example.com',
      active: 1,
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }, { id_Role: 2 }, { id_Role: 3 }]),
    };
    (user3 as any) = {
      id: 3,
      firstname: 'Simon',
      lastname: 'BULTEL',
      email: 'simon.bultel@example.com',
      active: 1,
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }]),
    };
    (token as any) = {
      id: 1,
      id_User: 123,
      value: 'SomeToken',
      expired_at: new Date('2021-01-01T00:00:02Z'),
    };
    token.update = jest.fn().mockReturnValue(token);
  });

  afterEach(() => {
    testHelpers.resetAll();
  });

  describe('findAll', () => {
    let findAndCountAllSpy: jest.SpyInstance<Promise<{ rows: Model<any, any>[]; count: number }>>;

    beforeEach(() => {
      findAndCountAllSpy = jest
        .spyOn(User, 'findAndCountAll')
        .mockResolvedValue({ rows: [user1, user2, user3], count: 3 });
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue({ id: 3 } as any);
    });

    it('should return a paginated list of users', async () => {
      await findAll(req, res, next);

      expect(findAndCountAllSpy).toHaveBeenCalledWith({
        attributes: {
          exclude: ['password'],
        },
        limit: undefined,
        offset: 0,
        where: {},
      });
      expect(res.send).toHaveBeenCalledWith({ count: 3, rows: [user1, user2, user3] });
      expect(getPagingData).toHaveBeenCalledWith({ count: 3, rows: [user1, user2, user3] }, 0, undefined);
    });

    it('should apply filters', async () => {
      req.query = {
        firstname: 'John',
        lastname: 'Doe',
        role: 'Admin',
      };

      await findAll(req, res, next);

      expect(findAndCountAllSpy).toHaveBeenCalledWith({
        attributes: {
          exclude: ['password'],
        },
        limit: undefined,
        offset: 0,
        where: {
          firstname: 'John',
          lastname: 'Doe',
        },
      });
      expect(getPagingData).toHaveBeenCalledWith({ count: 1, rows: [user2] }, 0, undefined);
      expect(res.send).toHaveBeenCalledWith({ count: 1, rows: [user2] });
    });

    it('should paginate data', async () => {
      req.query = {
        size: '2',
        page: '1',
      };

      await findAll(req, res, next);

      expect(getPagination).toHaveBeenCalledWith(1, 2);
      expect(findAndCountAllSpy).toHaveBeenCalledWith({
        attributes: {
          exclude: ['password'],
        },
        limit: 2,
        offset: 1,
        where: {},
      });
      expect(getPagingData).toHaveBeenCalledWith({ count: 3, rows: [user1, user2, user3] }, 1, 2);
      expect(res.send).toHaveBeenCalledWith({ count: 3, rows: [user1, user2, user3] });
    });

    it('throw an error if findAndCountAll throws an error', async () => {
      jest.spyOn(User, 'findAndCountAll').mockRejectedValue(new Error('Some error'));

      await findAll(req, res, next);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorHandler(500, 'Some error'));
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      req.params = { id: '1' };
      const findByPkSpy = jest.spyOn(User, 'findByPk').mockResolvedValue(user1);

      await findOne(req, res, next);

      expect(findByPkSpy).toHaveBeenCalledWith('1', { attributes: { exclude: ['password'] } });
      expect(res.send).toHaveBeenCalledWith(user1);
    });

    it('should throw an error if user is not found', async () => {
      req.params = { id: '1' };
      jest.spyOn(User, 'findByPk').mockResolvedValue(null);

      await findOne(req, res, next);

      expect(next).toHaveBeenCalledWith(new ErrorHandler(404, 'User not found'));
    });

    it('should throw an error if findByPk throws an error', async () => {
      req.params = { id: '1' };
      jest.spyOn(User, 'findByPk').mockRejectedValue(new Error('Some error'));

      await findOne(req, res, next);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorHandler(500, 'Some error'));
    });
  });

  describe('update', () => {
    beforeEach(() => {
      req.params = { id: '1' };
      req.body = {
        firstname: 'John',
        lastname: 'DOE',
      };
    });

    it('should update a user', async () => {
      const updateSpy = jest.spyOn(User, 'update').mockResolvedValue([1, []]);

      await update(req, res, next);

      expect(updateSpy).toHaveBeenCalledWith(req.body, { where: { id: '1' } });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'User updated',
      });
    });

    it('should throw an error if update fails', async () => {
      const updateSpy = jest.spyOn(User, 'update').mockResolvedValue([0, []]);

      await update(req, res, next);

      expect(updateSpy).toHaveBeenCalledWith(req.body, { where: { id: '1' } });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorHandler(500, 'User update failed'));
    });

    it('should throw an error if update fails', async () => {
      const updateSpy = jest.spyOn(User, 'update').mockRejectedValue(new Error('Some error'));

      await update(req, res, next);

      expect(updateSpy).toHaveBeenCalledWith(req.body, { where: { id: '1' } });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorHandler(500, 'Some error'));
    });
  });

  describe('deleteOne', () => {
    it('should delete a user', async () => {
      req.params = { id: '1' };
      const destroySpy = jest.spyOn(User, 'destroy').mockResolvedValue(1);

      await deleteOne(req, res, next);

      expect(destroySpy).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(res.send).toHaveBeenCalledWith({ success: true, message: 'User deleted' });
    });
  });

  describe('deleteAll', () => {
    it('should delete all users', async () => {
      const destroySpy = jest.spyOn(User, 'destroy').mockResolvedValue(1);

      await deleteAll(req, res, next);

      expect(destroySpy).toHaveBeenCalledWith({ where: {}, truncate: false });
      expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Users deleted' });
    });
  });

  describe('register', () => {
    beforeEach(() => {
      req.body = {
        email: 'john.doe@example.com',
        password: 'myVerySecurePassword',
        firstname: 'John',
        lastname: 'DOE',
      };
    });

    it('should create a user', async () => {
      const createUserSpy = jest.spyOn(UserService, 'create').mockResolvedValue();

      await register(req, res, next);

      expect(createUserSpy);
      expect(res.json).toHaveBeenCalledWith({ message: 'Registration successful' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should throw an error if insertion fails', async () => {
      const createUserSpy = jest.spyOn(UserService, 'create').mockRejectedValue(new Error('Some error'));

      await register(req, res, next);

      expect(createUserSpy);
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new Error('Some error'));
    });
  });

  describe('verify', () => {
    it('should activate user', async () => {
      req.query = {
        email: 'john.doe@example.com',
      };
      jest.spyOn(UserService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(TokenService, 'findByTypeAndValue').mockResolvedValue(token);

      await verify(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Email verification successful' });
    });
  });

  describe('sendVerificationEmail', () => {
    it('should call UserService sendVerificationEmail', async () => {
      req.query = {
        email: 'john.doe@example.com',
      };
      const spy = jest.spyOn(UserService, 'sendVerificationEmail').mockResolvedValue();

      await sendVerificationEmail(req, res, next);

      expect(spy).toHaveBeenCalledWith(req.query.email);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Verification email sent' });
    });
  });

  describe('login', () => {
    it('should log user in with a new token', async () => {
      req.body = {
        email: 'john.doe@example.com',
        password: 'password',
      };
      jest.spyOn(User, 'findOne').mockResolvedValue({ ...user, active: 1 } as User);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'Login successful',
        token: 'fakeToken',
        expiresAt: new Date('2021-01-01T00:15:01.000Z'),
        userId: user.id,
      });
    });
  });

  describe('refreshToken', () => {
    it('should send a new token', async () => {
      req.headers = {
        authorization: 'test fakeToken',
      };
      jest
        .spyOn(jwt, 'verify')
        .mockImplementation(
          (
            token: string,
            secret: Secret | GetPublicKeyOrSecret,
            options: jwt.VerifyOptions | undefined,
            callback: jwt.VerifyCallback | undefined
          ) => {
            if (callback) {
              callback.call(null, null, { id: 'fakeId' });
            }
          }
        );

      await refreshToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'Token refresh successful',
        token: 'fakeToken',
        expiresAt: new Date('2021-01-01T00:15:01.000Z'),
      });
    });
  });
});
