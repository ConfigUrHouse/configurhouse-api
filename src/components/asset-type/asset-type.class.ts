import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';

export interface AssetTypeAttributes {
  id: number;
  name: string;
  description: string;
}

export type AssetTypePk = 'id';
export type AssetTypeId = AssetType[AssetTypePk];
export type AssetTypeCreationAttributes = Optional<AssetTypeAttributes, AssetTypePk>;

export class AssetType extends Model<AssetTypeAttributes, AssetTypeCreationAttributes> implements AssetTypeAttributes {
  id!: number;
  name!: string;
  description!: string;

  // AssetType hasMany Asset via id_AssetType
  Assets!: Asset[];
  getAssets!: Sequelize.HasManyGetAssociationsMixin<Asset>;
  setAssets!: Sequelize.HasManySetAssociationsMixin<Asset, AssetId>;
  addAsset!: Sequelize.HasManyAddAssociationMixin<Asset, AssetId>;
  addAssets!: Sequelize.HasManyAddAssociationsMixin<Asset, AssetId>;
  createAsset!: Sequelize.HasManyCreateAssociationMixin<Asset>;
  removeAsset!: Sequelize.HasManyRemoveAssociationMixin<Asset, AssetId>;
  removeAssets!: Sequelize.HasManyRemoveAssociationsMixin<Asset, AssetId>;
  hasAsset!: Sequelize.HasManyHasAssociationMixin<Asset, AssetId>;
  hasAssets!: Sequelize.HasManyHasAssociationsMixin<Asset, AssetId>;
  countAssets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AssetType {
    AssetType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
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
        tableName: 'AssetType',
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
    return AssetType;
  }
}
