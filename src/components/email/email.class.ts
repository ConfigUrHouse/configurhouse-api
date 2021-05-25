import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from '../user/user.class';
import type { UserEmail, UserEmailId } from '../user-email/user-email.class';

export interface EmailAttributes {
  id: number;
  send_at: string;
  description: string;
}

export type EmailPk = 'id';
export type EmailId = Email[EmailPk];
export type EmailCreationAttributes = Optional<EmailAttributes, EmailPk>;

export class Email extends Model implements EmailAttributes {
  id!: number;
  send_at!: string;
  description!: string;

  // Email belongsToMany User via id_Email and id_User
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
  // Email hasMany UserEmail via id_Email
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Email {
    Email.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        send_at: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Email',
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
    return Email;
  }
}
