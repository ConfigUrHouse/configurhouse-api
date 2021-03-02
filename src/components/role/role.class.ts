import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from '../user/user.class';
import type { UserRole, UserRoleId } from '../user-role/user-role.class';

export interface RoleAttributes {
  id: number;
  name: string;
  description: string;
}

export type RolePk = "id";
export type RoleId = Role[RolePk];
export type RoleCreationAttributes = Optional<RoleAttributes, RolePk>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  id!: number;
  name!: string;
  description!: string;

  // Role belongsToMany User via id and id_User
  id_User_Users!: User[];
  getId_User_Users!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setId_User_Users!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addId_User_User!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addId_User_Users!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createId_User_User!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeId_User_User!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeId_User_Users!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasId_User_User!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasId_User_Users!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countId_User_Users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Role hasMany UserRole via id
  UserRoles!: UserRole[];
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
    Role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Role;
  }
}
