import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Role, RoleId } from '../role/role.class';
import type { User, UserId } from '../user/user.class';

export enum UserRoles {
  User = 'User',
  Collaborator = 'Collaborator',
  Administrator = 'Administrator',
}

export interface UserRoleAttributes {
  id: number;
  id_User: number;
}

export type UserRolePk = 'id' | 'id_User';
export type UserRoleId = UserRole[UserRolePk];
export type UserRoleCreationAttributes = Optional<UserRoleAttributes, UserRolePk>;

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  id!: number;
  id_User!: number;

  // UserRole belongsTo Role via id
  role!: Role;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Role>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Role, RoleId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Role>;
  // UserRole belongsTo User via id_User
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRole {
    UserRole.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Role',
            key: 'id',
          },
        },
        id_User: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'User',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'UserRole',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }, { name: 'id_User' }],
          },
          {
            name: 'UserRole_User0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_User' }],
          },
        ],
      }
    );
    return UserRole;
  }
}
