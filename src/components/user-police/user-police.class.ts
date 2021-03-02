import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Police, PoliceId } from '../police/police.class';
import type { User, UserId } from '../user/user.class';

export interface UserPoliceAttributes {
  id: number;
  id_User: number;
}

export type UserPolicePk = "id" | "id_User";
export type UserPoliceId = UserPolice[UserPolicePk];
export type UserPoliceCreationAttributes = Optional<UserPoliceAttributes, UserPolicePk>;

export class UserPolice extends Model<UserPoliceAttributes, UserPoliceCreationAttributes> implements UserPoliceAttributes {
  id!: number;
  id_User!: number;

  // UserPolice belongsTo Police via id
  id_Polouse!: Police;
  getId_Polouse!: Sequelize.BelongsToGetAssociationMixin<Police>;
  setId_Polouse!: Sequelize.BelongsToSetAssociationMixin<Police, PoliceId>;
  createId_Polouse!: Sequelize.BelongsToCreateAssociationMixin<Police>;
  // UserPolice belongsTo User via id_User
  id_User_User!: User;
  getId_User_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserPolice {
    UserPolice.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Police',
        key: 'id'
      }
    },
    id_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserPolice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "id_User" },
        ]
      },
      {
        name: "UserPolice_User0_FK",
        using: "BTREE",
        fields: [
          { name: "id_User" },
        ]
      },
    ]
  });
  return UserPolice;
  }
}
