import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import { HouseModelPosteConso, HouseModelPosteConsoId } from '../house-model-poste-conso/house-model-poste-conso.class';
import type { ModelType, ModelTypeId } from '../model-type/model-type.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';

export interface HouseModelAttributes {
  id: number;
  name: string;
  occupants: number;
  id_ModelType: number;
  id_Asset: number;
}

export type HouseModelPk = 'id';
export type HouseModelId = HouseModel[HouseModelPk];
export type HouseModelCreationAttributes = Optional<HouseModelAttributes, HouseModelPk>;

export class HouseModel
  extends Model<HouseModelAttributes, HouseModelCreationAttributes>
  implements HouseModelAttributes {
  id!: number;
  name!: string;
  occupants!: number;
  id_ModelType!: number;
  id_Asset!: number;

  // HouseModel belongsTo Asset via id_Asset
  asset!: Asset;
  getAsset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setAsset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createAsset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // HouseModel hasMany Configuration via id_HouseModel
  configurations!: Configuration[];
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
  // HouseModel hasMany HouseModelPosteConso via id_HouseModel
  houseModelPosteConsos!: HouseModelPosteConso[];
  getHouseModelPosteConsos!: Sequelize.HasManyGetAssociationsMixin<HouseModelPosteConso>;
  setHouseModelPosteConsos!: Sequelize.HasManySetAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  addHouseModelPosteConso!: Sequelize.HasManyAddAssociationMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  addHouseModelPosteConsos!: Sequelize.HasManyAddAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  createHouseModelPosteConso!: Sequelize.HasManyCreateAssociationMixin<HouseModelPosteConso>;
  removeHouseModelPosteConso!: Sequelize.HasManyRemoveAssociationMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  removeHouseModelPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  hasHouseModelPosteConso!: Sequelize.HasManyHasAssociationMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  hasHouseModelPosteConsos!: Sequelize.HasManyHasAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  countHouseModelPosteConsos!: Sequelize.HasManyCountAssociationsMixin;
  // HouseModel hasMany OptionConf via id_HouseModel
  optionConfs!: OptionConf[];
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
  modelType!: ModelType;
  getModelType!: Sequelize.BelongsToGetAssociationMixin<ModelType>;
  setModelType!: Sequelize.BelongsToSetAssociationMixin<ModelType, ModelTypeId>;
  createModelType!: Sequelize.BelongsToCreateAssociationMixin<ModelType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof HouseModel {
    HouseModel.init(
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
        occupants: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_ModelType: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'ModelType',
            key: 'id',
          },
        },
        id_Asset: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Asset',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'HouseModel',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'HouseModel_ModelType_FK',
            using: 'BTREE',
            fields: [{ name: 'id_ModelType' }],
          },
          {
            name: 'HouseModel_Asset_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Asset' }],
          },
        ],
      }
    );
    return HouseModel;
  }
}
