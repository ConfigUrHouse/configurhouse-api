import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from '../user/user.class';
import type { UserEmail, UserEmailId } from '../user-email/user-email.class';

export interface EmailAttributes {
  id: number;
  send_at: string;
  description: string;
}

export type EmailPk = "id";
export type EmailId = Email[EmailPk];
export type EmailCreationAttributes = Optional<EmailAttributes, EmailPk>;

export class Email extends Model<EmailAttributes, EmailCreationAttributes> implements EmailAttributes {
  id!: number;
  send_at!: string;
  description!: string;

  // Email belongsToMany User via id_Email and id
  id_Users!: User[];
  getId_Users!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setId_Users!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addId_User!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addId_Users!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createId_User!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeId_User!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeId_Users!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasId_User!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasId_Users!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countId_Users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Email hasMany UserEmail via id_Email
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Email {
    Email.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    send_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Email',
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
  return Email;
  }
}
