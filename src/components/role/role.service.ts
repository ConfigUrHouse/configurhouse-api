import { ErrorHandler } from '../../middleware/error-handler';
import { UserRoles } from '../user-role/user-role.class';
import { Role } from './role.class';

export default class RoleService {
  public static async findRoleByName(userRole: UserRoles): Promise<Role> {
    const role = await Role.findOne({ where: { name: userRole.valueOf() } });
    if (!role) throw new ErrorHandler(404, `Role '${userRole.valueOf()}' not found`);
    return role;
  }
}
