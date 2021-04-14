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

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  active!: number;

  // User hasMany Configuration via id_User
  Configurations!: Configuration[];
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
  // User belongsToMany Email via id and id_Email
  id_Email_Emails!: Email[];
  getId_Email_Emails!: Sequelize.BelongsToManyGetAssociationsMixin<Email>;
  setId_Email_Emails!: Sequelize.BelongsToManySetAssociationsMixin<Email, EmailId>;
  addId_Email_Email!: Sequelize.BelongsToManyAddAssociationMixin<Email, EmailId>;
  addId_Email_Emails!: Sequelize.BelongsToManyAddAssociationsMixin<Email, EmailId>;
  createId_Email_Email!: Sequelize.BelongsToManyCreateAssociationMixin<Email>;
  removeId_Email_Email!: Sequelize.BelongsToManyRemoveAssociationMixin<Email, EmailId>;
  removeId_Email_Emails!: Sequelize.BelongsToManyRemoveAssociationsMixin<Email, EmailId>;
  hasId_Email_Email!: Sequelize.BelongsToManyHasAssociationMixin<Email, EmailId>;
  hasId_Email_Emails!: Sequelize.BelongsToManyHasAssociationsMixin<Email, EmailId>;
  countId_Email_Emails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsToMany Police via id_User and id
  id_Police!: Police[];
  getId_Police!: Sequelize.BelongsToManyGetAssociationsMixin<Police>;
  setId_Police!: Sequelize.BelongsToManySetAssociationsMixin<Police, PoliceId>;
  addId_Polouse!: Sequelize.BelongsToManyAddAssociationMixin<Police, PoliceId>;
  addId_Police!: Sequelize.BelongsToManyAddAssociationsMixin<Police, PoliceId>;
  createId_Polouse!: Sequelize.BelongsToManyCreateAssociationMixin<Police>;
  removeId_Polouse!: Sequelize.BelongsToManyRemoveAssociationMixin<Police, PoliceId>;
  removeId_Police!: Sequelize.BelongsToManyRemoveAssociationsMixin<Police, PoliceId>;
  hasId_Polouse!: Sequelize.BelongsToManyHasAssociationMixin<Police, PoliceId>;
  hasId_Police!: Sequelize.BelongsToManyHasAssociationsMixin<Police, PoliceId>;
  countId_Police!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsToMany Role via id_User and id
  id_Roles!: Role[];
  getId_Roles!: Sequelize.BelongsToManyGetAssociationsMixin<Role>;
  setId_Roles!: Sequelize.BelongsToManySetAssociationsMixin<Role, RoleId>;
  addId_Role!: Sequelize.BelongsToManyAddAssociationMixin<Role, RoleId>;
  addId_Roles!: Sequelize.BelongsToManyAddAssociationsMixin<Role, RoleId>;
  createId_Role!: Sequelize.BelongsToManyCreateAssociationMixin<Role>;
  removeId_Role!: Sequelize.BelongsToManyRemoveAssociationMixin<Role, RoleId>;
  removeId_Roles!: Sequelize.BelongsToManyRemoveAssociationsMixin<Role, RoleId>;
  hasId_Role!: Sequelize.BelongsToManyHasAssociationMixin<Role, RoleId>;
  hasId_Roles!: Sequelize.BelongsToManyHasAssociationsMixin<Role, RoleId>;
  countId_Roles!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Token via id_User
  Tokens!: Token[];
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
  UserEmails!: UserEmail[];
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
  UserPolice!: UserPolice[];
  getUserPolice!: Sequelize.HasManyGetAssociationsMixin<UserPolice>;
  setUserPolice!: Sequelize.HasManySetAssociationsMixin<UserPolice, UserPoliceId>;
  addUserPolouse!: Sequelize.HasManyAddAssociationMixin<UserPolice, UserPoliceId>;
  addUserPolice!: Sequelize.HasManyAddAssociationsMixin<UserPolice, UserPoliceId>;
  createUserPolouse!: Sequelize.HasManyCreateAssociationMixin<UserPolice>;
  removeUserPolouse!: Sequelize.HasManyRemoveAssociationMixin<UserPolice, UserPoliceId>;
  removeUserPolice!: Sequelize.HasManyRemoveAssociationsMixin<UserPolice, UserPoliceId>;
  hasUserPolouse!: Sequelize.HasManyHasAssociationMixin<UserPolice, UserPoliceId>;
  hasUserPolice!: Sequelize.HasManyHasAssociationsMixin<UserPolice, UserPoliceId>;
  countUserPolice!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany UserRole via id_User
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
