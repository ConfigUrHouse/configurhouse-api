import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Email, EmailId } from '../email/email.class';
import type { User, UserId } from '../user/user.class';

export interface UserEmailAttributes {
  id: number;
  id_Email: number;
}

export type UserEmailPk = "id" | "id_Email";
export type UserEmailId = UserEmail[UserEmailPk];
export type UserEmailCreationAttributes = Optional<UserEmailAttributes, UserEmailPk>;

export class UserEmail extends Model<UserEmailAttributes, UserEmailCreationAttributes> implements UserEmailAttributes {
  id!: number;
  id_Email!: number;

  // UserEmail belongsTo Email via id_Email
  id_Email_Email!: Email;
  getId_Email_Email!: Sequelize.BelongsToGetAssociationMixin<Email>;
  setId_Email_Email!: Sequelize.BelongsToSetAssociationMixin<Email, EmailId>;
  createId_Email_Email!: Sequelize.BelongsToCreateAssociationMixin<Email>;
  // UserEmail belongsTo User via id
  id_User!: User;
  getId_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserEmail {
    UserEmail.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    id_Email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Email',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserEmail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "id_Email" },
        ]
      },
      {
        name: "UserEmail_Email0_FK",
        using: "BTREE",
        fields: [
          { name: "id_Email" },
        ]
      },
    ]
  });
  return UserEmail;
  }
}
