import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Email, EmailId } from '../email/email.class';
import type { User, UserId } from '../user/user.class';

export interface UserEmailAttributes {
  id_User: number;
  id_Email: number;
}

export type UserEmailPk = 'id_User' | 'id_Email';
export type UserEmailId = UserEmail[UserEmailPk];
export type UserEmailCreationAttributes = Optional<UserEmailAttributes, UserEmailPk>;

export class UserEmail extends Model<UserEmailAttributes, UserEmailCreationAttributes> implements UserEmailAttributes {
  id_User!: number;
  id_Email!: number;

  // UserEmail belongsTo Email via id_Email
  email!: Email;
  getEmail!: Sequelize.BelongsToGetAssociationMixin<Email>;
  setEmail!: Sequelize.BelongsToSetAssociationMixin<Email, EmailId>;
  createEmail!: Sequelize.BelongsToCreateAssociationMixin<Email>;
  // UserEmail belongsTo User via id_User
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserEmail {
    UserEmail.init(
      {
        id_User: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        id_Email: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Email',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'UserEmail',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_User' }, { name: 'id_Email' }],
          },
          {
            name: 'UserEmail_Email0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Email' }],
          },
          {
            name: 'UserEmail_User0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_User' }],
          },
        ],
      }
    );
    return UserEmail;
  }
}
