import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from '../user/user.class';
import type { UserPolice, UserPoliceId } from '../user-police/user-police.class';

export interface PoliceAttributes {
  id: number;
  name: string;
  description: string;
}

export type PolicePk = 'id';
export type PoliceId = Police[PolicePk];
export type PoliceCreationAttributes = Optional<PoliceAttributes, PolicePk>;

export class Police extends Model<PoliceAttributes, PoliceCreationAttributes> implements PoliceAttributes {
  id!: number;
  name!: string;
  description!: string;

  // Police belongsToMany User via id and id_User
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
  // Police hasMany UserPolice via id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Police {
    Police.init(
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
        tableName: 'Police',
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
    return Police;
  }
}
