import { TokenTypes } from '../token-type/token-type.class';
import { TokenType } from './init-models.config';

export function initData() {
  initTokenTypes();
}

function initTokenTypes() {
  if (!TokenType.findOne({ where: { name: TokenTypes.EmailVerification } })) {
    TokenType.create({ name: TokenTypes.EmailVerification });
  }
  if (!TokenType.findOne({ where: { name: TokenTypes.PasswordReset } })) {
    TokenType.create({ name: TokenTypes.PasswordReset });
  }
}
