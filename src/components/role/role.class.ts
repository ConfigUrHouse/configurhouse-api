import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from '../user/user.class';
import type { UserRole, UserRoleId } from '../user-role/user-role.class';

export interface RoleAttributes {
  id: number;
  name: string;
  description: string;
}

export type RolePk = 'id';
export type RoleId = Role[RolePk];
export type RoleCreationAttributes = Optional<RoleAttributes, RolePk>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  id!: number;
  name!: string;
  description!: string;

  // Role belongsToMany User via id_Role and id_User
  users!: User[];
  getUsers!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setUsers!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addUser!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addUsers!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createUser!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeUser!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasUser!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasUsers!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countUsers!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Role hasMany UserRole via id_Role
  userRoles!: UserRole[];
  getUserRoles!: Sequelize.HasManyGetAssociationsMixin<UserRole>;
  setUserRoles!: Sequelize.HasManySetAssociationsMixin<UserRole, UserRoleId>;
  addUserRole!: Sequelize.HasManyAddAssociationMixin<UserRole, UserRoleId>;
  addUserRoles!: Sequelize.HasManyAddAssociationsMixin<UserRole, UserRoleId>;
  createUserRole!: Sequelize.HasManyCreateAssociationMixin<UserRole>;
  removeUserRole!: Sequelize.HasManyRemoveAssociationMixin<UserRole, UserRoleId>;
  removeUserRoles!: Sequelize.HasManyRemoveAssociationsMixin<UserRole, UserRoleId>;
  hasUserRole!: Sequelize.HasManyHasAssociationMixin<UserRole, UserRoleId>;
  hasUserRoles!: Sequelize.HasManyHasAssociationsMixin<UserRole, UserRoleId>;
  countUserRoles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Role {
    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Role',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
    return Role;
  }
}
