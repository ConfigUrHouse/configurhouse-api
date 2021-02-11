import { Optional, Model, DataTypes, Association } from "sequelize";
import { db } from '../../config/mysql.config';

const sequelize = db.instance;

export interface UserAttributes {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  emailVerifiedAt: Date | undefined
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public firstName!: string
  public lastName!: string
  public phoneNumber!: string
  public emailVerifiedAt: Date | undefined

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export const initialize = {
  table: () => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(50),
          allowNull: false,
        },
        firstName: {
          type: new DataTypes.STRING(50),
          field: "first_name",
          allowNull: false,
        },
        lastName: {
          type: new DataTypes.STRING(50),
          field: "last_name",
          allowNull: false,
        },
        phoneNumber: {
          type: new DataTypes.STRING(128),
          field: "phone_number",
          allowNull: true,
        },
        emailVerifiedAt: {
          type: DataTypes.DATE,
          field: "email_verified_at",
          allowNull: true,
        }
      },
      {
        tableName: "User",
        sequelize: sequelize
      }
    )
  }
};