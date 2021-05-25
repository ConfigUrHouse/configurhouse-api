import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import type { Email, EmailId } from '../email/email.class';
import type { Police, PoliceId } from '../police/police.class';
import type { Role, RoleId } from '../role/role.class';
import type { Token, TokenId } from '../token/token.class';
import type { UserEmail, UserEmailId } from '../user-email/user-email.class';
import type { UserPolice, UserPoliceId } from '../user-police/user-police.class';
import type { UserRole, UserRoleId } from '../user-role/user-role.class';
import joi from 'joi';

export interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: number;
}

export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  active: number;
}

export const validationSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required(),
  firstname: joi.string().trim().required(),
  lastname: joi.string().trim().uppercase().required(),
  //phoneNumber: joi
  //  .string()
  //  .regex(/^((\+)33|0)[0-9](\d{2}){4}$/)
  //  .optional(),
});

export const emailSchema = joi.object({
  email: joi.string().email().lowercase().required(),
});

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserCreationAttributes = Optional<UserAttributes, UserPk>;

export class User extends Model implements UserAttributes {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  active!: number;

  // User hasMany Configuration via id_User
  configurations!: Configuration[];
  getConfigurations!: Sequelize.HasManyGetAssociationsMixin<Configuration>;
  setConfigurations!: Sequelize.HasManySetAssociationsMixin<Configuration, ConfigurationId>;
  addConfiguration!: Sequelize.HasManyAddAssociationMixin<Configuration, ConfigurationId>;
  addConfigurations!: Sequelize.HasManyAddAssociationsMixin<Configuration, ConfigurationId>;
  createConfiguration!: Sequelize.HasManyCreateAssociationMixin<Configuration>;
  removeConfiguration!: Sequelize.HasManyRemoveAssociationMixin<Configuration, ConfigurationId>;
  removeConfigurations!: Sequelize.HasManyRemoveAssociationsMixin<Configuration, ConfigurationId>;
  hasConfiguration!: Sequelize.HasManyHasAssociationMixin<Configuration, ConfigurationId>;
  hasConfigurations!: Sequelize.HasManyHasAssociationsMixin<Configuration, ConfigurationId>;
  countConfigurations!: Sequelize.HasManyCountAssociationsMixin;
  // User belongsToMany Email via id_User and id_Email
  emails!: Email[];
  getEmails!: Sequelize.BelongsToManyGetAssociationsMixin<Email>;
  setEmails!: Sequelize.BelongsToManySetAssociationsMixin<Email, EmailId>;
  addEmail!: Sequelize.BelongsToManyAddAssociationMixin<Email, EmailId>;
  addEmails!: Sequelize.BelongsToManyAddAssociationsMixin<Email, EmailId>;
  createEmail!: Sequelize.BelongsToManyCreateAssociationMixin<Email>;
  removeEmail!: Sequelize.BelongsToManyRemoveAssociationMixin<Email, EmailId>;
  removeEmails!: Sequelize.BelongsToManyRemoveAssociationsMixin<Email, EmailId>;
  hasEmail!: Sequelize.BelongsToManyHasAssociationMixin<Email, EmailId>;
  hasEmails!: Sequelize.BelongsToManyHasAssociationsMixin<Email, EmailId>;
  countEmails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsToMany Police via id_User and id_Police
  polices!: Police[];
  getPolices!: Sequelize.BelongsToManyGetAssociationsMixin<Police>;
  setPolices!: Sequelize.BelongsToManySetAssociationsMixin<Police, PoliceId>;
  addPolice!: Sequelize.BelongsToManyAddAssociationMixin<Police, PoliceId>;
  addPolices!: Sequelize.BelongsToManyAddAssociationsMixin<Police, PoliceId>;
  createPolice!: Sequelize.BelongsToManyCreateAssociationMixin<Police>;
  removePolice!: Sequelize.BelongsToManyRemoveAssociationMixin<Police, PoliceId>;
  removePolices!: Sequelize.BelongsToManyRemoveAssociationsMixin<Police, PoliceId>;
  hasPolice!: Sequelize.BelongsToManyHasAssociationMixin<Police, PoliceId>;
  hasPolices!: Sequelize.BelongsToManyHasAssociationsMixin<Police, PoliceId>;
  countPolices!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsToMany Role via id_User and id_Role
  roles!: Role[];
  getRoles!: Sequelize.BelongsToManyGetAssociationsMixin<Role>;
  setRoles!: Sequelize.BelongsToManySetAssociationsMixin<Role, RoleId>;
  addRole!: Sequelize.BelongsToManyAddAssociationMixin<Role, RoleId>;
  addRoles!: Sequelize.BelongsToManyAddAssociationsMixin<Role, RoleId>;
  createRole!: Sequelize.BelongsToManyCreateAssociationMixin<Role>;
  removeRole!: Sequelize.BelongsToManyRemoveAssociationMixin<Role, RoleId>;
  removeRoles!: Sequelize.BelongsToManyRemoveAssociationsMixin<Role, RoleId>;
  hasRole!: Sequelize.BelongsToManyHasAssociationMixin<Role, RoleId>;
  hasRoles!: Sequelize.BelongsToManyHasAssociationsMixin<Role, RoleId>;
  countRoles!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Token via id_User
  tokens!: Token[];
  getTokens!: Sequelize.HasManyGetAssociationsMixin<Token>;
  setTokens!: Sequelize.HasManySetAssociationsMixin<Token, TokenId>;
  addToken!: Sequelize.HasManyAddAssociationMixin<Token, TokenId>;
  addTokens!: Sequelize.HasManyAddAssociationsMixin<Token, TokenId>;
  createToken!: Sequelize.HasManyCreateAssociationMixin<Token>;
  removeToken!: Sequelize.HasManyRemoveAssociationMixin<Token, TokenId>;
  removeTokens!: Sequelize.HasManyRemoveAssociationsMixin<Token, TokenId>;
  hasToken!: Sequelize.HasManyHasAssociationMixin<Token, TokenId>;
  hasTokens!: Sequelize.HasManyHasAssociationsMixin<Token, TokenId>;
  countTokens!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UserEmail via id
  userEmails!: UserEmail[];
  getUserEmails!: Sequelize.HasManyGetAssociationsMixin<UserEmail>;
  setUserEmails!: Sequelize.HasManySetAssociationsMixin<UserEmail, UserEmailId>;
  addUserEmail!: Sequelize.HasManyAddAssociationMixin<UserEmail, UserEmailId>;
  addUserEmails!: Sequelize.HasManyAddAssociationsMixin<UserEmail, UserEmailId>;
  createUserEmail!: Sequelize.HasManyCreateAssociationMixin<UserEmail>;
  removeUserEmail!: Sequelize.HasManyRemoveAssociationMixin<UserEmail, UserEmailId>;
  removeUserEmails!: Sequelize.HasManyRemoveAssociationsMixin<UserEmail, UserEmailId>;
  hasUserEmail!: Sequelize.HasManyHasAssociationMixin<UserEmail, UserEmailId>;
  hasUserEmails!: Sequelize.HasManyHasAssociationsMixin<UserEmail, UserEmailId>;
  countUserEmails!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UserPolice via id_User
  userPolices!: UserPolice[];
  getUserPolices!: Sequelize.HasManyGetAssociationsMixin<UserPolice>;
  setUserPolices!: Sequelize.HasManySetAssociationsMixin<UserPolice, UserPoliceId>;
  addUserPolice!: Sequelize.HasManyAddAssociationMixin<UserPolice, UserPoliceId>;
  addUserPolices!: Sequelize.HasManyAddAssociationsMixin<UserPolice, UserPoliceId>;
  createUserPolice!: Sequelize.HasManyCreateAssociationMixin<UserPolice>;
  removeUserPolice!: Sequelize.HasManyRemoveAssociationMixin<UserPolice, UserPoliceId>;
  removeUserPolices!: Sequelize.HasManyRemoveAssociationsMixin<UserPolice, UserPoliceId>;
  hasUserPolice!: Sequelize.HasManyHasAssociationMixin<UserPolice, UserPoliceId>;
  hasUserPolices!: Sequelize.HasManyHasAssociationsMixin<UserPolice, UserPoliceId>;
  countUserPolices!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UserRole via id_User
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

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        active: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'User',
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
    return User;
  }
}
