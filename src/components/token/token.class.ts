import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { TokenType, TokenTypeId } from '../token-type/token-type.class';
import type { User, UserId } from '../user/user.class';
import joi from 'joi';

export interface TokenAttributes {
  id: number;
  value: string;
  expired_at: Date;
  validate_at?: Date;
  id_User: number;
  id_TokenType: number;
}

export const validationSchema = joi.object({
  token: joi.string().length(16).lowercase().required(),
  email: joi.string().email().lowercase().required(),
});

export type TokenPk = 'id';
export type TokenId = Token[TokenPk];
export type TokenCreationAttributes = Optional<TokenAttributes, TokenPk>;

export class Token extends Model implements TokenAttributes {
  id!: number;
  value!: string;
  expired_at!: Date;
  validate_at!: Date;
  id_User!: number;
  id_TokenType!: number;

  // Token belongsTo TokenType via id_TokenType
  tokenType!: TokenType;
  getTokenType!: Sequelize.BelongsToGetAssociationMixin<TokenType>;
  setTokenType!: Sequelize.BelongsToSetAssociationMixin<TokenType, TokenTypeId>;
  createTokenType!: Sequelize.BelongsToCreateAssociationMixin<TokenType>;
  // Token belongsTo User via id_User
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Token {
    Token.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        value: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        expired_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        validate_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        id_User: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        id_TokenType: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'TokenType',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Token',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Token_User_FK',
            using: 'BTREE',
            fields: [{ name: 'id_User' }],
          },
          {
            name: 'Token_TokenType0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_TokenType' }],
          },
        ],
      }
    );
    return Token;
  }
}
