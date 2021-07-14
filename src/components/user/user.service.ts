import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../../middleware/error-handler';
import { User, UserAttributes } from './user.class';
import { emailTransporter } from '../config/email.config';
import TokenService from '../token/token.service';
import { Token } from '../token/token.class';
import { TokenType } from '../config/init-models.config';
import { TokenTypes } from '../token-type/token-type.class';
import { UserRole, UserRoles } from '../user-role/user-role.class';
import RoleService from '../role/role.service';
import { emailHTML } from '../../shared/tools';

export default class UserService {
  public static async isAdmin(user: User) {
    const userRoles = await user.getUserRoles();
    const adminRole = await RoleService.findRoleByName(UserRoles.Administrator);
    return userRoles.some((userRole) => userRole.id_Role === adminRole.id);
  }

  public static async isCollaborator(user: User) {
    const userRoles = await user.getUserRoles();
    const collaboratorRole = await RoleService.findRoleByName(UserRoles.Collaborator);
    return userRoles.some((userRole) => userRole.id_Role === collaboratorRole.id);
  }

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
    const role = await RoleService.findRoleByName(UserRoles.User);
    const userRole = await UserRole.create({
      id_Role: role.id,
      id_User: user.id,
    });
    if (!userRole) {
      throw new ErrorHandler(409, 'UserRole creation failed');
    }
    await this.sendVerificationEmail(params.email, user);
  }

  public static async findByEmail(email: string) {
    const user = await User.findOne({
      where: { email },
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
        html: emailHTML(
          'Vérifier votre adresse email',
          `
            <p>Bonjour,</p>
            <p>
              Veuillez cliquer le lien ci-dessous pour vérifier votre adresse email :
            </p>
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="btn btn-primary"
            >
              <tbody>
                <tr>
                  <td align="left">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="${process.env.API_BASE_URL}/user/verify?token=${token.value}&email=${email}"
                              target="_blank"
                            >
                              Cliquer ici 
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              Votre compte ne sera pas utilisable avant cette vérification.
            </p>
          `
        ),
      });
    } catch (error) {
      throw new ErrorHandler(500, `Email not sent : ${error.message}`);
    }
  }

  public static async sendPasswordResetEmail(to: string | User) {
    const user = to instanceof User ? to : await this.findByEmail(to);

    const tokenType = await TokenService.findTokenTypeByName(TokenTypes.PasswordReset);
    const token = await TokenService.add(user, tokenType);
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Veuillez réinitialiser votre mot de passe',
        html: emailHTML(
          'Réinitialiser votre mot de passe',
          `
            <p>Bonjour,</p>
            <p>
              Veuillez cliquer le lien ci-dessous pour réinitialiser votre mot de passe :
            </p>
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="btn btn-primary"
            >
              <tbody>
                <tr>
                  <td align="left">
                    <table
                      role="presentation"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="${process.env.API_BASE_URL}/user/password-reset?token=${token.value}&email=${user.email}"
                              target="_blank"
                            >
                              Cliquer ici
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              Si vous n'avez pas demandé le changement de votre mot de passe veuillez ne pas prendre en compte ce mail.
            </p>
          `
        ),
      });
    } catch (error) {
      throw new ErrorHandler(500, `Email not sent : ${error.message}`);
    }
  }
}
