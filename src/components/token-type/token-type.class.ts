import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Token, TokenId } from '../token/token.class';

export enum TokenTypes {
  EmailVerification = 'EmailVerification',
  PasswordReset = 'PasswordReset',
}

export interface TokenTypeAttributes {
  id: number;
  name: string;
}

export type TokenTypePk = 'id';
export type TokenTypeId = TokenType[TokenTypePk];
export type TokenTypeCreationAttributes = Optional<TokenTypeAttributes, TokenTypePk>;

export class TokenType extends Model<TokenTypeAttributes, TokenTypeCreationAttributes> implements TokenTypeAttributes {
  id!: number;
  name!: string;

  // TokenType hasMany Token via id_TokenType
  Tokens!: Token[];
  getTokens!: Sequelize.HasManyGetAssociationsMixin<Token>;
  setTokens!: Sequelize.HasManySetAssociationsMixin<Token, TokenId>;
  addToken!: Sequelize.HasManyAddAssociationMixin<Token, TokenId>;
  addTokens!: Sequelize.HasManyAddAssociationsMixin<Token, TokenId>;
  createToken!: Sequelize.HasManyCreateAssociationMixin<Token>;
  removeToken!: Sequelize.HasManyRemoveAssociationMixin<Token, TokenId>;
  removeTokens!: Sequelize.HasManyRemoveAssociationsMixin<Token, TokenId>;
  hasToken!: Sequelize.HasManyHasAssociationMixin<Token, TokenId>;
  hasTokens!: Sequelize.HasManyHasAssociationsMixin<Token, TokenId>;
  countTokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof TokenType {
    TokenType.init(
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
      },
      {
        sequelize,
        tableName: 'TokenType',
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
    return TokenType;
  }
}
