import { TokenTypes } from '../token-type/token-type.class';
import { UserRoles } from '../user-role/user-role.class';
import { Role, TokenType } from './init-models.config';

export async function initData() {
  initTokenTypes();
  await initRoles();
}

function initTokenTypes() {
  if (!TokenType.findOne({ where: { name: TokenTypes.EmailVerification } })) {
    TokenType.create({ name: TokenTypes.EmailVerification });
  }
  if (!TokenType.findOne({ where: { name: TokenTypes.PasswordReset } })) {
    TokenType.create({ name: TokenTypes.PasswordReset });
  }
}

async function initRoles() {
  if (!await Role.findOne({ where: { name: UserRoles.User } })) {
    Role.create({ name: UserRoles.User, description: 'Un utilisateur' });
  }
  if (!await Role.findOne({ where: { name: UserRoles.Collaborator } })) {
    Role.create({ name: UserRoles.Collaborator, description: 'Un collaborateur' });
  }
  if (!await Role.findOne({ where: { name: UserRoles.Administrator } })) {
    Role.create({ name: UserRoles.Administrator, description: 'Un administrateur' });
  }
}
