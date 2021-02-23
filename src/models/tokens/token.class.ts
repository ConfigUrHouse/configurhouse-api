import joi from 'joi';
import { Optional, Model, DataTypes } from 'sequelize';
import { db } from '../../config/mysql.config';

const sequelize = db.instance;

export interface TokenAttributes {
  id: number;
  userId: number;
  token: string;
}

export interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
  public id!: number;
  public userId!: number;
  public token!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const validationSchema = joi.object({
  token: joi.string().length(16).lowercase().required(),
  email: joi.string().email().lowercase().required()
});

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: "user_id"
    },
    token: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'Token',
    sequelize: sequelize,
    underscored: true,
  }
);