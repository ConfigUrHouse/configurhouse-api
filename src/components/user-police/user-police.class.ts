import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Police, PoliceId } from '../police/police.class';
import type { User, UserId } from '../user/user.class';

export interface UserPoliceAttributes {
  id_Police: number;
  id_User: number;
}

export type UserPolicePk = 'id_Police' | 'id_User';
export type UserPoliceId = UserPolice[UserPolicePk];
export type UserPoliceCreationAttributes = Optional<UserPoliceAttributes, UserPolicePk>;

export class UserPolice extends Model implements UserPoliceAttributes {
  id_Police!: number;
  id_User!: number;

  // UserPolice belongsTo Police via id_Police
  police!: Police;
  getPolice!: Sequelize.BelongsToGetAssociationMixin<Police>;
  setPolice!: Sequelize.BelongsToSetAssociationMixin<Police, PoliceId>;
  createPolice!: Sequelize.BelongsToCreateAssociationMixin<Police>;
  // UserPolice belongsTo User via id_User
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserPolice {
    UserPolice.init(
      {
        id_Police: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Police',
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
        tableName: 'UserPolice',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_Police' }, { name: 'id_User' }],
          },
          {
            name: 'UserPolice_User0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_User' }],
          },
          {
            name: 'UserPolice_Police0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Police' }],
          },
        ],
      }
    );
    return UserPolice;
  }
}
