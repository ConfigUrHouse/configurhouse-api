import { ErrorHandler } from '../../middleware/error-handler';
import crypto from 'crypto-random-string';
import { Token } from './token.class';

export default class TokenService {

  public static async add(id: number) {
    Token.destroy({ where: { userId: id } })
    const token = await Token.create({
      userId: id,
      token: crypto({length: 16})
    })
    if (!token) throw new ErrorHandler(409, 'Token creation failed')
    return token
  }

  public static async findByToken(token: string) {
    const result = await Token.findOne({
      where: { token: token }
    })
    if (!token) throw new ErrorHandler(404, `Token not found`)
    return result
  }
}
