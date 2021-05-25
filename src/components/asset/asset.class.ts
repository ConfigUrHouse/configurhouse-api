import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { AssetType, AssetTypeId } from '../asset-type/asset-type.class';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { Mesh, MeshId } from '../mesh/mesh.class';
import type { Value, ValueId } from '../value/value.class';

export interface AssetAttributes {
  id: number;
  value: string;
  id_AssetType: number;
}

export type AssetPk = 'id';
export type AssetId = Asset[AssetPk];
export type AssetCreationAttributes = Optional<AssetAttributes, AssetPk>;

export class Asset extends Model implements AssetAttributes {
  id!: number;
  value!: string;
  id_AssetType!: number;

  // Asset hasMany HouseModel via id_Asset
  houseModels!: HouseModel[];
  getHouseModels!: Sequelize.HasManyGetAssociationsMixin<HouseModel>;
  setHouseModels!: Sequelize.HasManySetAssociationsMixin<HouseModel, HouseModelId>;
  addHouseModel!: Sequelize.HasManyAddAssociationMixin<HouseModel, HouseModelId>;
  addHouseModels!: Sequelize.HasManyAddAssociationsMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.HasManyCreateAssociationMixin<HouseModel>;
  removeHouseModel!: Sequelize.HasManyRemoveAssociationMixin<HouseModel, HouseModelId>;
  removeHouseModels!: Sequelize.HasManyRemoveAssociationsMixin<HouseModel, HouseModelId>;
  hasHouseModel!: Sequelize.HasManyHasAssociationMixin<HouseModel, HouseModelId>;
  hasHouseModels!: Sequelize.HasManyHasAssociationsMixin<HouseModel, HouseModelId>;
  countHouseModels!: Sequelize.HasManyCountAssociationsMixin;
  // Asset hasMany Mesh via id_Asset
  meshes!: Mesh[];
  getMeshes!: Sequelize.HasManyGetAssociationsMixin<Mesh>;
  setMeshes!: Sequelize.HasManySetAssociationsMixin<Mesh, MeshId>;
  addMesh!: Sequelize.HasManyAddAssociationMixin<Mesh, MeshId>;
  addMeshes!: Sequelize.HasManyAddAssociationsMixin<Mesh, MeshId>;
  createMesh!: Sequelize.HasManyCreateAssociationMixin<Mesh>;
  removeMesh!: Sequelize.HasManyRemoveAssociationMixin<Mesh, MeshId>;
  removeMeshes!: Sequelize.HasManyRemoveAssociationsMixin<Mesh, MeshId>;
  hasMesh!: Sequelize.HasManyHasAssociationMixin<Mesh, MeshId>;
  hasMeshes!: Sequelize.HasManyHasAssociationsMixin<Mesh, MeshId>;
  countMeshes!: Sequelize.HasManyCountAssociationsMixin;
  // Asset hasMany Value via id_Asset
  values!: Value[];
  getValues!: Sequelize.HasManyGetAssociationsMixin<Value>;
  setValues!: Sequelize.HasManySetAssociationsMixin<Value, ValueId>;
  addValue!: Sequelize.HasManyAddAssociationMixin<Value, ValueId>;
  addValues!: Sequelize.HasManyAddAssociationsMixin<Value, ValueId>;
  createValue!: Sequelize.HasManyCreateAssociationMixin<Value>;
  removeValue!: Sequelize.HasManyRemoveAssociationMixin<Value, ValueId>;
  removeValues!: Sequelize.HasManyRemoveAssociationsMixin<Value, ValueId>;
  hasValue!: Sequelize.HasManyHasAssociationMixin<Value, ValueId>;
  hasValues!: Sequelize.HasManyHasAssociationsMixin<Value, ValueId>;
  countValues!: Sequelize.HasManyCountAssociationsMixin;
  // Asset belongsTo AssetType via id_AssetType
  assetType!: AssetType;
  getAssetType!: Sequelize.BelongsToGetAssociationMixin<AssetType>;
  setAssetType!: Sequelize.BelongsToSetAssociationMixin<AssetType, AssetTypeId>;
  createAssetType!: Sequelize.BelongsToCreateAssociationMixin<AssetType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Asset {
    Asset.init(
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
        id_AssetType: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'AssetType',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Asset',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Asset_AssetType_FK',
            using: 'BTREE',
            fields: [{ name: 'id_AssetType' }],
          },
        ],
      }
    );
    return Asset;
  }
}
