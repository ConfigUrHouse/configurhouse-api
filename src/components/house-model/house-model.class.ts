import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import {
  ConsommationHouseModelPosteConso,
  ConsommationHouseModelPosteConsoId,
} from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { Consommation, ConsommationId } from '../consommation/consommation.class';
import type { ModelType, ModelTypeId } from '../model-type/model-type.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';
import { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

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
  extends Model
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
  // HouseModel hasMany ConsommationHouseModelPosteConso via id_HouseModel
  consommationHouseModelPosteConsos!: ConsommationHouseModelPosteConso[];
  getConsommationHouseModelPosteConsos!: Sequelize.HasManyGetAssociationsMixin<ConsommationHouseModelPosteConso>;
  setConsommationHouseModelPosteConsos!: Sequelize.HasManySetAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  addConsommationHouseModelPosteConso!: Sequelize.HasManyAddAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  addConsommationHouseModelPosteConsos!: Sequelize.HasManyAddAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  createConsommationHouseModelPosteConso!: Sequelize.HasManyCreateAssociationMixin<ConsommationHouseModelPosteConso>;
  removeConsommationHouseModelPosteConso!: Sequelize.HasManyRemoveAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  removeConsommationHouseModelPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  hasConsommationHouseModelPosteConso!: Sequelize.HasManyHasAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  hasConsommationHouseModelPosteConsos!: Sequelize.HasManyHasAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  countConsommationHouseModelPosteConsos!: Sequelize.HasManyCountAssociationsMixin;
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
  // HouseModel belongsToMany PosteConso via id_HouseModel and id_PosteConso
  posteConsos!: PosteConso[];
  getPosteConsos!: Sequelize.BelongsToManyGetAssociationsMixin<PosteConso>;
  setPosteConsos!: Sequelize.BelongsToManySetAssociationsMixin<PosteConso, PosteConsoId>;
  addPosteConso!: Sequelize.BelongsToManyAddAssociationMixin<PosteConso, PosteConsoId>;
  addPosteConsos!: Sequelize.BelongsToManyAddAssociationsMixin<PosteConso, PosteConsoId>;
  createPosteConsos!: Sequelize.BelongsToManyCreateAssociationMixin<PosteConso>;
  removePosteConso!: Sequelize.BelongsToManyRemoveAssociationMixin<PosteConso, PosteConsoId>;
  removePosteConsos!: Sequelize.BelongsToManyRemoveAssociationsMixin<PosteConso, PosteConsoId>;
  hasPosteConso!: Sequelize.BelongsToManyHasAssociationMixin<PosteConso, PosteConsoId>;
  hasPosteConsos!: Sequelize.BelongsToManyHasAssociationsMixin<PosteConso, PosteConsoId>;
  countPosteConsos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // HouseModel belongsToMany Consommation via id_HouseModel and id_Consommation
  consommations!: Consommation[];
  getConsommations!: Sequelize.BelongsToManyGetAssociationsMixin<Consommation>;
  setConsommations!: Sequelize.BelongsToManySetAssociationsMixin<Consommation, ConsommationId>;
  addConsommation!: Sequelize.BelongsToManyAddAssociationMixin<Consommation, ConsommationId>;
  addConsommations!: Sequelize.BelongsToManyAddAssociationsMixin<Consommation, ConsommationId>;
  createConsommations!: Sequelize.BelongsToManyCreateAssociationMixin<Consommation>;
  removeConsommation!: Sequelize.BelongsToManyRemoveAssociationMixin<Consommation, ConsommationId>;
  removeConsommations!: Sequelize.BelongsToManyRemoveAssociationsMixin<Consommation, ConsommationId>;
  hasConsommation!: Sequelize.BelongsToManyHasAssociationMixin<Consommation, ConsommationId>;
  hasConsommations!: Sequelize.BelongsToManyHasAssociationsMixin<Consommation, ConsommationId>;
  countConsommations!: Sequelize.BelongsToManyCountAssociationsMixin;

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
