import bcrypt from 'bcryptjs';
import crypto from 'crypto-random-string';
import { ErrorHandler } from '../../middleware/error-handler';
import { User } from './user.class';
import { emailTransporter } from '../../config/email.config';
import { Token } from './token.class';

export interface IUserCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  emailVerifiedAt?: Date;
}

export default class UserService {

  public static async create(params: IUserCreateParams) {
    if (await User.findOne({ where: { email: params.email } })) {
      throw new ErrorHandler(400, 'Email "' + params.email + '" is already taken');
    }
    const hashedPassword = bcrypt.hashSync(params.password, 8);
    const user = await User.create({
      firstName: params.firstName.trim(),
      lastName: params.lastName.trim(),
      email: params.email,
      password: hashedPassword,
      phoneNumber: params.phoneNumber,
    });
    if (!user) {
      throw new ErrorHandler(409, 'User registration failed')
    }
    Token.destroy({ where: { userId: user.id } }) // use TokenService
    const token = await Token.create({ // use TokenService
      userId: user.id,
      token: crypto({length: 16})
    })
    if (!token) throw new ErrorHandler(409, 'Token creation failed')
    emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: params.email,
      subject: 'Veuillez confirmer votre adresse email',
      html: `<p>Veuillez cliquer <a href="${process.env.API_BASE_URL}/users/verify?token=${token.token}&email=${params.email}">ici</a> pour vérifier votre adresse email.</p>`
    }, (error: Error | null) => {
      if (error) throw new ErrorHandler(500, `Email not sent : ${error.message}`)
    })
  }

  public static async findByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email }
    })
    if (!user) throw new ErrorHandler(404, `User with email ${email} not found`)
    return user
  }
}
