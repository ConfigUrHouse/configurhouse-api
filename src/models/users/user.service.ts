import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import { User } from './user.class';
import { emailTransporter } from '../../config/email.config';
import TokenService from '../tokens/token.service';

export interface IUserCreateParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
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
    this.sendVerificationEmail(params.email, user)
  }

  public static async findByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email }
    })
    if (!user) throw new ErrorHandler(404, `User with email ${email} not found`)
    return user
  }

  public static async sendVerificationEmail(email: string, user?: User) {
    if (!user) user = await this.findByEmail(email)
    const token = await TokenService.add(user.id)
    emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Veuillez confirmer votre adresse email',
      html: `<p>Veuillez cliquer <a href="${process.env.API_BASE_URL}/users/verify?token=${token.token}&email=${email}">ici</a> pour vérifier votre adresse email.</p>`
    }, (error: Error | null) => {
      if (error) throw new ErrorHandler(500, `Email not sent : ${error.message}`)
    })
  }
}
