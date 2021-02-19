import { Optional, Model, DataTypes } from 'sequelize';
import { db } from '../../config/mysql.config';

const sequelize = db.instance;

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  emailVerifiedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber?: string;
  public emailVerifiedAt?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      field: 'first_name',
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: 'last_name',
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(128),
      field: 'phone_number',
      allowNull: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      field: 'email_verified_at',
      allowNull: true,
    },
  },
  {
    tableName: 'User',
    sequelize: sequelize,
    underscored: true,
  }
);
