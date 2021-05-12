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
  // Police hasMany UserPolice via id
  userPolices!: UserPolice[];
  getUserPolices!: Sequelize.HasManyGetAssociationsMixin<UserPolice>;
  setUserPolices!: Sequelize.HasManySetAssociationsMixin<UserPolice, UserPoliceId>;
  addUserPolice!: Sequelize.HasManyAddAssociationMixin<UserPolice, UserPoliceId>;
  addUserPolices!: Sequelize.HasManyAddAssociationsMixin<UserPolice, UserPoliceId>;
  createUserPolices!: Sequelize.HasManyCreateAssociationMixin<UserPolice>;
  removeUserPolice!: Sequelize.HasManyRemoveAssociationMixin<UserPolice, UserPoliceId>;
  removeUserPolices!: Sequelize.HasManyRemoveAssociationsMixin<UserPolice, UserPoliceId>;
  hasUserPolice!: Sequelize.HasManyHasAssociationMixin<UserPolice, UserPoliceId>;
  hasUserPolices!: Sequelize.HasManyHasAssociationsMixin<UserPolice, UserPoliceId>;
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
