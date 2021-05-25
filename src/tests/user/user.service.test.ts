import bcrypt from 'bcryptjs';
import { SentMessageInfo } from 'nodemailer';
import { emailTransporter } from '../../components/config/email.config';
import { Role } from '../../components/role/role.class';
import RoleService from '../../components/role/role.service';
import TokenService from '../../components/token/token.service';
import { UserRole } from '../../components/user-role/user-role.class';
import { User, UserAttributes } from '../../components/user/user.class';
import UserService from '../../components/user/user.service';
import { testHelpers } from '../__mocks__/test-helpers';

describe('User Service', () => {
  let adminUser: User;
  let collabUser: User;
  let user: User;

  let adminRole: Role;
  let collabRole: Role;
  let userRole: Role;

  beforeEach(() => {
    (adminUser as any) = {
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }, { id_Role: 2 }, { id_Role: 3 }]),
    };
    (collabUser as any) = {
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }, { id_Role: 2 }]),
    };
    (user as any) = {
      id: 123,
      email: 'john.doe@example.com',
      active: 0,
      getUserRoles: jest.fn().mockResolvedValue([{ id_Role: 1 }]),
    };
    (adminRole as any) = { id: 3 };
    (collabRole as any) = { id: 2 };
    (userRole as any) = { id: 1 };
  });

  afterEach(() => {
    testHelpers.resetAll();
  });

  describe('isAdmin', () => {
    it('should return true if user has administrator role', async () => {
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue(adminRole);

      const result = await UserService.isAdmin(adminUser);

      expect(result).toEqual(true);
    });

    it('should return false if user has not administrator role', async () => {
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue(adminRole);

      const result = await UserService.isAdmin(collabUser);

      expect(result).toEqual(false);
    });
  });

  describe('isCollaborator', () => {
    it('should return true if user has collaborator role', async () => {
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue(collabRole);

      const result = await UserService.isCollaborator(collabUser);

      expect(result).toEqual(true);
    });

    it('should return false if user has not collaborator role', async () => {
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue(collabRole);

      const result = await UserService.isCollaborator(user);

      expect(result).toEqual(false);
    });
  });

  describe('create', () => {
    let createUserSpy: jest.SpyInstance<Promise<void>>;
    let bcryptSpy: jest.SpyInstance<string>;
    let createRoleSpy: jest.SpyInstance<Promise<void>>;
    let sendEmailSpy: jest.SpyInstance<Promise<void>>;

    beforeEach(() => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      createUserSpy = jest.spyOn(User, 'create').mockResolvedValue(user as any);
      bcryptSpy = jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');
      jest.spyOn(RoleService, 'findRoleByName').mockResolvedValue(userRole);
      createRoleSpy = jest.spyOn(UserRole, 'create').mockResolvedValue({ id: 1 } as any);
      sendEmailSpy = jest.spyOn(UserService, 'sendVerificationEmail').mockResolvedValue();
    });

    it('should hash password and create user', async () => {
      const result = UserService.create({
        email: 'john.doe@example.com',
        password: 'myVerySecurePassword',
        firstname: '  John  ',
        lastname: '  DOE  ',
      } as UserAttributes);

      await expect(result).resolves.not.toThrow();
      expect(bcryptSpy).toHaveBeenCalled();
      expect(createUserSpy).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        firstname: 'John',
        lastname: 'DOE',
        active: 0,
      });
      expect(createRoleSpy).toHaveBeenCalledWith({
        id_Role: 1,
        id_User: 123,
      });
      expect(sendEmailSpy).toHaveBeenCalledWith('john.doe@example.com', user);
    });

    it('should throw an error if email is already taken', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(user);

      const result = UserService.create({
        email: 'john.doe@example.com',
        password: 'myVerySecurePassword',
        firstname: 'John',
        lastname: 'DOE',
      } as UserAttributes);

      await expect(result).rejects.toThrowError('Email "john.doe@example.com" is already taken');
    });

    it('should throw an error if User insertion fails', async () => {
      jest.spyOn(User, 'create').mockResolvedValue();

      const result = UserService.create({
        email: 'john.doe@example.com',
        password: 'myVerySecurePassword',
        firstname: '  John  ',
        lastname: '  DOE  ',
      } as UserAttributes);

      await expect(result).rejects.toThrowError('User registration failed');
    });

    it('should throw an error if UserRole insertion fails', async () => {
      jest.spyOn(UserRole, 'create').mockResolvedValue();

      const result = UserService.create({
        email: 'john.doe@example.com',
        password: 'myVerySecurePassword',
        firstname: '  John  ',
        lastname: '  DOE  ',
      } as UserAttributes);

      await expect(result).rejects.toThrowError('UserRole creation failed');
    });
  });

  describe('findByEmail', () => {
    it('should return the user with corresponding email', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(user);

      const result = UserService.findByEmail('john.doe@example.com');

      await expect(result).resolves.toEqual(user);
    });

    it('should throw an error if user does not exist', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const result = UserService.findByEmail('john.doe@example.com');

      await expect(result).rejects.toThrowError('User with email john.doe@example.com not found');
    });
  });

  describe('sendVerificationEmail', () => {
    let sendMailSpy: jest.SpyInstance<Promise<SentMessageInfo>>;

    beforeEach(() => {
      jest
        .spyOn(TokenService, 'findTokenTypeByName')
        .mockResolvedValue({ id: 1, name: 'emailVerificationToken' } as any);
      jest.spyOn(TokenService, 'add').mockResolvedValue({ value: 'someFakeToken' } as any);
      sendMailSpy = jest.spyOn(emailTransporter, 'sendMail').mockImplementation();
    });

    it('should send an email to a new user', async () => {
      const result = UserService.sendVerificationEmail('john.doe@example.com', user);

      await expect(result).resolves.not.toThrow();
      expect(sendMailSpy).toHaveBeenCalledWith({
        from: 'contact@example.com',
        to: 'john.doe@example.com',
        subject: 'Veuillez confirmer votre adresse email',
        html: `<p>Veuillez cliquer <a href="http://example:7000/user/verify?token=someFakeToken&email=john.doe@example.com">ici</a> pour vérifier votre adresse email.</p>`,
      });
    });

    it('should send an email to an existing user', async () => {
      jest.spyOn(UserService, 'findByEmail').mockResolvedValue(user);

      const result = UserService.sendVerificationEmail('john.doe@example.com');

      await expect(result).resolves.not.toThrow();
      expect(sendMailSpy).toHaveBeenCalledWith({
        from: 'contact@example.com',
        to: 'john.doe@example.com',
        subject: 'Veuillez confirmer votre adresse email',
        html: `<p>Veuillez cliquer <a href="http://example:7000/user/verify?token=someFakeToken&email=john.doe@example.com">ici</a> pour vérifier votre adresse email.</p>`,
      });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(UserService, 'findByEmail').mockRejectedValue(new Error('User not found'));

      const result = UserService.sendVerificationEmail('john.doe@example.com');

      await expect(result).rejects.toThrowError('User not found');
    });

    it('should throw an error if user is already active', async () => {
      jest.spyOn(UserService, 'findByEmail').mockResolvedValue({ ...user, active: 1 } as any);

      const result = UserService.sendVerificationEmail('john.doe@example.com');

      await expect(result).rejects.toThrowError('User with email john.doe@example.com is already activated');
    });

    it('should throw an error if sendMail throws an error', async () => {
      jest.spyOn(emailTransporter, 'sendMail').mockRejectedValue(new Error('An error occured while sending email'));

      const result = UserService.sendVerificationEmail('john.doe@example.com', user);

      await expect(result).rejects.toThrowError('Email not sent : An error occured while sending email');
    });
  });

  describe('sendPasswordResetEmail', () => {
    let findByEmailSpy: jest.SpyInstance<Promise<User>>;
    let sendMailSpy: jest.SpyInstance<Promise<SentMessageInfo>>;

    beforeEach(() => {
      findByEmailSpy = jest.spyOn(UserService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(TokenService, 'findTokenTypeByName').mockResolvedValue({ id: 1, name: 'passwordResetToken' } as any);
      jest.spyOn(TokenService, 'add').mockResolvedValue({ value: 'someFakeToken' } as any);
      sendMailSpy = jest.spyOn(emailTransporter, 'sendMail').mockImplementation();
    });

    it('should send an email (case string)', async () => {
      const result = UserService.sendPasswordResetEmail('john.doe@example.com');

      await expect(result).resolves.not.toThrow();
      expect(findByEmailSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalledWith({
        from: 'contact@example.com',
        to: 'john.doe@example.com',
        subject: 'Veuillez réinitialiser votre mot de passe',
        html: `<p>Veuillez cliquer <a href="http://example:7000/user/password-reset?token=someFakeToken&email=john.doe@example.com">ici</a> pour réinitialiser votre mot de passe.</p>`,
      });
    });

    it('should send an email (case User)', async () => {
      user = Object.create(User.prototype);
      Object.assign(user, { email: 'john.doe@example.com' });

      const result = UserService.sendPasswordResetEmail(user);

      await expect(result).resolves.not.toThrow();
      expect(findByEmailSpy).not.toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalledWith({
        from: 'contact@example.com',
        to: 'john.doe@example.com',
        subject: 'Veuillez réinitialiser votre mot de passe',
        html: `<p>Veuillez cliquer <a href="http://example:7000/user/password-reset?token=someFakeToken&email=john.doe@example.com">ici</a> pour réinitialiser votre mot de passe.</p>`,
      });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(UserService, 'findByEmail').mockRejectedValue(new Error('User not found'));

      const result = UserService.sendPasswordResetEmail('john.doe@example.com');

      await expect(result).rejects.toThrowError('User not found');
    });

    it('should throw an error if sendMail throws an error', async () => {
      jest.spyOn(emailTransporter, 'sendMail').mockRejectedValue(new Error('An error occured while sending email'));

      const result = UserService.sendPasswordResetEmail('john.doe@example.com');

      await expect(result).rejects.toThrowError('Email not sent : An error occured while sending email');
    });
  });
});
