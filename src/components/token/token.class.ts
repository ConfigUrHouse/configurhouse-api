import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { TokenType, TokenTypeId } from '../token-type/token-type.class';
import type { User, UserId } from '../user/user.class';

export interface TokenAttributes {
  id: number;
  value: string;
  expired_at: string;
  validate_at: string;
  id_User: number;
  id_TokenType: number;
}

export type TokenPk = "id";
export type TokenId = Token[TokenPk];
export type TokenCreationAttributes = Optional<TokenAttributes, TokenPk>;

export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
  id!: number;
  value!: string;
  expired_at!: string;
  validate_at!: string;
  id_User!: number;
  id_TokenType!: number;

  // Token belongsTo TokenType via id_TokenType
  id_TokenType_TokenType!: TokenType;
  getId_TokenType_TokenType!: Sequelize.BelongsToGetAssociationMixin<TokenType>;
  setId_TokenType_TokenType!: Sequelize.BelongsToSetAssociationMixin<TokenType, TokenTypeId>;
  createId_TokenType_TokenType!: Sequelize.BelongsToCreateAssociationMixin<TokenType>;
  // Token belongsTo User via id_User
  id_User_User!: User;
  getId_User_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Token {
    Token.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    expired_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    validate_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    id_TokenType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TokenType',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Token',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Token_User_FK",
        using: "BTREE",
        fields: [
          { name: "id_User" },
        ]
      },
      {
        name: "Token_TokenType0_FK",
        using: "BTREE",
        fields: [
          { name: "id_TokenType" },
        ]
      },
    ]
  });
  return Token;
  }
}
