import joi from 'joi';
import { Optional, Model, DataTypes } from 'sequelize';
import { db } from '../../config/mysql.config';

const sequelize = db.instance;

export interface TokenAttributes {
  userId: number;
  token: string;
}

export interface TokenCreationAttributes extends Optional<TokenAttributes, 'userId'> {}

export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      field: "user_id",
      primaryKey: true,
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