import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import type { Consommation, ConsommationId } from '../consommation/consommation.class';
import type { ModelType, ModelTypeId } from '../model-type/model-type.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';

export interface HouseModelAttributes {
  id: number;
  name: string;
  id_ModelType: number;
  id_Asset: number;
  id_Asset_HouseModelAsset3D: number;
}

export type HouseModelPk = "id";
export type HouseModelId = HouseModel[HouseModelPk];
export type HouseModelCreationAttributes = Optional<HouseModelAttributes, HouseModelPk>;

export class HouseModel extends Model<HouseModelAttributes, HouseModelCreationAttributes> implements HouseModelAttributes {
  id!: number;
  name!: string;
  id_ModelType!: number;
  id_Asset!: number;
  id_Asset_HouseModelAsset3D!: number;

  // HouseModel belongsTo Asset via id_Asset
  id_Asset_Asset!: Asset;
  getId_Asset_Asset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setId_Asset_Asset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createId_Asset_Asset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // HouseModel belongsTo Asset via id_Asset_HouseModelAsset3D
  id_Asset_HouseModelAsset3D_Asset!: Asset;
  getId_Asset_HouseModelAsset3D_Asset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setId_Asset_HouseModelAsset3D_Asset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createId_Asset_HouseModelAsset3D_Asset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // HouseModel hasMany Configuration via id_HouseModel
  Configurations!: Configuration[];
  getConfigurations!: Sequelize.HasManyGetAssociationsMixin<Configuration>;
  setConfigurations!: Sequelize.HasManySetAssociationsMixin<Configuration, ConfigurationId>;
  addConfiguration!: Sequelize.HasManyAddAssociationMixin<Configuration, ConfigurationId>;
  addConfigurations!: Sequelize.HasManyAddAssociationsMixin<Configuration, ConfigurationId>;
  createConfiguration!: Sequelize.HasManyCreateAssociationMixin<Configuration>;
  removeConfiguration!: Sequelize.HasManyRemoveAssociationMixin<Configuration, ConfigurationId>;
  removeConfigurations!: Sequelize.HasManyRemoveAssociationsMixin<Configuration, ConfigurationId>;
  hasConfiguration!: Sequelize.HasManyHasAssociationMixin<Configuration, ConfigurationId>;
  hasConfigurations!: Sequelize.HasManyHasAssociationsMixin<Configuration, ConfigurationId>;
  countConfigurations!: Sequelize.HasManyCountAssociationsMixin;
  // HouseModel hasMany Consommation via id_HouseModel
  Consommations!: Consommation[];
  getConsommations!: Sequelize.HasManyGetAssociationsMixin<Consommation>;
  setConsommations!: Sequelize.HasManySetAssociationsMixin<Consommation, ConsommationId>;
  addConsommation!: Sequelize.HasManyAddAssociationMixin<Consommation, ConsommationId>;
  addConsommations!: Sequelize.HasManyAddAssociationsMixin<Consommation, ConsommationId>;
  createConsommation!: Sequelize.HasManyCreateAssociationMixin<Consommation>;
  removeConsommation!: Sequelize.HasManyRemoveAssociationMixin<Consommation, ConsommationId>;
  removeConsommations!: Sequelize.HasManyRemoveAssociationsMixin<Consommation, ConsommationId>;
  hasConsommation!: Sequelize.HasManyHasAssociationMixin<Consommation, ConsommationId>;
  hasConsommations!: Sequelize.HasManyHasAssociationsMixin<Consommation, ConsommationId>;
  countConsommations!: Sequelize.HasManyCountAssociationsMixin;
  // HouseModel hasMany OptionConf via id_HouseModel
  OptionConfs!: OptionConf[];
  getOptionConfs!: Sequelize.HasManyGetAssociationsMixin<OptionConf>;
  setOptionConfs!: Sequelize.HasManySetAssociationsMixin<OptionConf, OptionConfId>;
  addOptionConf!: Sequelize.HasManyAddAssociationMixin<OptionConf, OptionConfId>;
  addOptionConfs!: Sequelize.HasManyAddAssociationsMixin<OptionConf, OptionConfId>;
  createOptionConf!: Sequelize.HasManyCreateAssociationMixin<OptionConf>;
  removeOptionConf!: Sequelize.HasManyRemoveAssociationMixin<OptionConf, OptionConfId>;
  removeOptionConfs!: Sequelize.HasManyRemoveAssociationsMixin<OptionConf, OptionConfId>;
  hasOptionConf!: Sequelize.HasManyHasAssociationMixin<OptionConf, OptionConfId>;
  hasOptionConfs!: Sequelize.HasManyHasAssociationsMixin<OptionConf, OptionConfId>;
  countOptionConfs!: Sequelize.HasManyCountAssociationsMixin;
  // HouseModel belongsTo ModelType via id_ModelType
  id_ModelType_ModelType!: ModelType;
  getId_ModelType_ModelType!: Sequelize.BelongsToGetAssociationMixin<ModelType>;
  setId_ModelType_ModelType!: Sequelize.BelongsToSetAssociationMixin<ModelType, ModelTypeId>;
  createId_ModelType_ModelType!: Sequelize.BelongsToCreateAssociationMixin<ModelType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof HouseModel {
    HouseModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    id_ModelType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ModelType',
        key: 'id'
      }
    },
    id_Asset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Asset',
        key: 'id'
      }
    },
    id_Asset_HouseModelAsset3D: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Asset',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'HouseModel',
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
        name: "HouseModel_ModelType_FK",
        using: "BTREE",
        fields: [
          { name: "id_ModelType" },
        ]
      },
      {
        name: "HouseModel_Asset0_FK",
        using: "BTREE",
        fields: [
          { name: "id_Asset" },
        ]
      },
      {
        name: "HouseModel_Asset1_FK",
        using: "BTREE",
        fields: [
          { name: "id_Asset_HouseModelAsset3D" },
        ]
      },
    ]
  });
  return HouseModel;
  }
}
