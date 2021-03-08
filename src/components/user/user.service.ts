import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import { User, UserAttributes } from './user.class';
import { emailTransporter } from '../config/email.config';
import TokenService from '../token/token.service';
import { Token, TokenAttributes } from '../token/token.class';
import { TokenType } from '../config/init-models.config';
import { TokenTypes } from '../token-type/token-type.class';

export default class UserService {
  public static async create(params: UserAttributes) {
    if (await User.findOne({ where: { email: params.email } })) {
      throw new ErrorHandler(400, 'Email "' + params.email + '" is already taken');
    }
    const hashedPassword = bcrypt.hashSync(params.password, 8);
    const user = await User.create({
      firstname: params.firstname.trim(),
      lastname: params.lastname.trim(),
      email: params.email,
      password: hashedPassword,
      active: 0,
    });
    if (!user) {
      throw new ErrorHandler(409, 'User registration failed');
    }
    await this.sendVerificationEmail(params.email, user);
  }

  public static async findByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) throw new ErrorHandler(404, `User with email ${email} not found`);
    return user;
  }

  public static async sendVerificationEmail(email: string, user?: User) {
    if (!user) user = await this.findByEmail(email);
    if (user.active) throw new ErrorHandler(403, `User with email ${email} is already activated`);
    const tokenType: TokenType = await TokenService.findTokenTypeByName(TokenTypes.EmailVerification);
    const token: Token = await TokenService.add(user, tokenType);
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Veuillez confirmer votre adresse email',
        html: `<p>Veuillez cliquer <a href="${process.env.API_BASE_URL}/user/verify?token=${token.value}&email=${email}">ici</a> pour vérifier votre adresse email.</p>`,
      });
    } catch (error) {
      throw new ErrorHandler(500, `Email not sent : ${error.message}`);
    }
  }
}
