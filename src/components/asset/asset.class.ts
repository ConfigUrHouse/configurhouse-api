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

export class Asset extends Model<AssetAttributes, AssetCreationAttributes> implements AssetAttributes {
  id!: number;
  value!: string;
  id_AssetType!: number;

  // Asset hasMany HouseModel via id_Asset
  HouseModels!: HouseModel[];
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
  Meshes!: Mesh[];
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
  Values!: Value[];
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
  // Asset hasMany Value via id_Asset_AssetValue3D
  id_Asset_AssetValue3D_Values!: Value[];
  getId_Asset_AssetValue3D_Values!: Sequelize.HasManyGetAssociationsMixin<Value>;
  setId_Asset_AssetValue3D_Values!: Sequelize.HasManySetAssociationsMixin<Value, ValueId>;
  addId_Asset_AssetValue3D_Value!: Sequelize.HasManyAddAssociationMixin<Value, ValueId>;
  addId_Asset_AssetValue3D_Values!: Sequelize.HasManyAddAssociationsMixin<Value, ValueId>;
  createId_Asset_AssetValue3D_Value!: Sequelize.HasManyCreateAssociationMixin<Value>;
  removeId_Asset_AssetValue3D_Value!: Sequelize.HasManyRemoveAssociationMixin<Value, ValueId>;
  removeId_Asset_AssetValue3D_Values!: Sequelize.HasManyRemoveAssociationsMixin<Value, ValueId>;
  hasId_Asset_AssetValue3D_Value!: Sequelize.HasManyHasAssociationMixin<Value, ValueId>;
  hasId_Asset_AssetValue3D_Values!: Sequelize.HasManyHasAssociationsMixin<Value, ValueId>;
  countId_Asset_AssetValue3D_Values!: Sequelize.HasManyCountAssociationsMixin;
  // Asset belongsTo AssetType via id_AssetType
  id_AssetType_AssetType!: AssetType;
  getId_AssetType_AssetType!: Sequelize.BelongsToGetAssociationMixin<AssetType>;
  setId_AssetType_AssetType!: Sequelize.BelongsToSetAssociationMixin<AssetType, AssetTypeId>;
  createId_AssetType_AssetType!: Sequelize.BelongsToCreateAssociationMixin<AssetType>;

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
