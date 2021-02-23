import { ErrorHandler } from '../../middleware/error-handler';
import { Token } from './token.class';

export default class TokenService {

  public static async create() {

  }

  public static async delete() {

  }
  
  public static async findByToken(token: string) {
    const result = await Token.findOne({
      where: { token: token }
    })
    if (!token) throw new ErrorHandler(404, `Token not found`)
    return result
  }
}
