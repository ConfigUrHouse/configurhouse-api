import { ErrorHandler } from '../../middleware/error-handler';
import crypto from 'crypto-random-string';
import { Token } from './token.class';
import { TokenType, TokenTypes } from '../token-type/token-type.class';
import { User } from '../user/user.class';

export default class TokenService {
  public static async add(user: User, tokenType: TokenType): Promise<Token> {
    await Token.update(
      { expired_at: new Date(Date.now()) },
      { where: { id_User: user.id, id_TokenType: tokenType.id } }
    );
    const token = await Token.create({
      id_User: user.id,
      id_TokenType: tokenType.id,
      expired_at: new Date(new Date().getTime() + parseInt(process.env.TOKEN_DURATION as string) * 60000),
      validate_at: undefined,
      value: crypto({ length: 16 }),
    });
    if (!token) throw new ErrorHandler(409, 'Token creation failed');
    return token;
  }

  public static async findByTypeAndValue(type: TokenTypes, value: string): Promise<Token> {
    const tokenType: TokenType = await TokenService.findTokenTypeByName(type);
    const result = await Token.findOne({
      where: { value: value, id_TokenType: tokenType.id },
    });
    if (!result) throw new ErrorHandler(404, `Token not found`);
    return result;
  }

  public static async findTokenTypeByName(type: TokenTypes): Promise<TokenType> {
    const tokenType = await TokenType.findOne({ where: { name: type.valueOf() } });
    if (!tokenType) throw new ErrorHandler(404, `TokenType ${type.valueOf()} not found`);
    return tokenType;
  }
}
