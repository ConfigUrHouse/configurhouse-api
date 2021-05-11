import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import type { ConfigurationValue, ConfigurationValueId } from '../configuration-value/configuration-value.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';

export interface ValueAttributes {
  id: number;
  name: string;
  price: number;
  is_default: number;
  id_OptionConf: number;
  id_Asset: number;
  id_Asset_AssetValue3D: number;
}

export type ValuePk = 'id';
export type ValueId = Value[ValuePk];
export type ValueCreationAttributes = Optional<ValueAttributes, ValuePk>;

export class Value extends Model<ValueAttributes, ValueCreationAttributes> implements ValueAttributes {
  id!: number;
  name!: string;
  price!: number;
  is_default!: number;
  id_OptionConf!: number;
  id_Asset!: number;
  id_Asset_AssetValue3D!: number;

  // Value belongsTo Asset via id_Asset
  asset!: Asset;
  getAsset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setAsset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createAsset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // Value belongsTo Asset via id_Asset_AssetValue3D
  Asset3D!: Asset;
  getAsset3D!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setAsset3D!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createAsset3D!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // Value belongsTo OptionConf via id_OptionConf
  optionConf!: OptionConf;
  getOptionConf!: Sequelize.BelongsToGetAssociationMixin<OptionConf>;
  setOptionConf!: Sequelize.BelongsToSetAssociationMixin<OptionConf, OptionConfId>;
  createOptionConf!: Sequelize.BelongsToCreateAssociationMixin<OptionConf>;
  // Value belongsToMany Configuration via id and id_Configuration
  configurations!: Configuration[];
  getConfigurations!: Sequelize.BelongsToManyGetAssociationsMixin<Configuration>;
  setConfigurations!: Sequelize.BelongsToManySetAssociationsMixin<Configuration, ConfigurationId>;
  addConfiguration!: Sequelize.BelongsToManyAddAssociationMixin<Configuration, ConfigurationId>;
  addConfigurations!: Sequelize.BelongsToManyAddAssociationsMixin<Configuration, ConfigurationId>;
  createConfiguration!: Sequelize.BelongsToManyCreateAssociationMixin<Configuration>;
  removeConfiguration!: Sequelize.BelongsToManyRemoveAssociationMixin<Configuration, ConfigurationId>;
  removeConfigurations!: Sequelize.BelongsToManyRemoveAssociationsMixin<Configuration, ConfigurationId>;
  hasConfiguration!: Sequelize.BelongsToManyHasAssociationMixin<Configuration, ConfigurationId>;
  hasConfigurations!: Sequelize.BelongsToManyHasAssociationsMixin<Configuration, ConfigurationId>;
  countConfigurations!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Value hasMany ConfigurationValue via id
  ConfigurationValues!: ConfigurationValue[];
  getConfigurationValues!: Sequelize.HasManyGetAssociationsMixin<ConfigurationValue>;
  setConfigurationValues!: Sequelize.HasManySetAssociationsMixin<ConfigurationValue, ConfigurationValueId>;
  addConfigurationValue!: Sequelize.HasManyAddAssociationMixin<ConfigurationValue, ConfigurationValueId>;
  addConfigurationValues!: Sequelize.HasManyAddAssociationsMixin<ConfigurationValue, ConfigurationValueId>;
  createConfigurationValue!: Sequelize.HasManyCreateAssociationMixin<ConfigurationValue>;
  removeConfigurationValue!: Sequelize.HasManyRemoveAssociationMixin<ConfigurationValue, ConfigurationValueId>;
  removeConfigurationValues!: Sequelize.HasManyRemoveAssociationsMixin<ConfigurationValue, ConfigurationValueId>;
  hasConfigurationValue!: Sequelize.HasManyHasAssociationMixin<ConfigurationValue, ConfigurationValueId>;
  hasConfigurationValues!: Sequelize.HasManyHasAssociationsMixin<ConfigurationValue, ConfigurationValueId>;
  countConfigurationValues!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Value {
    Value.init(
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
        price: {
          type: DataTypes.DECIMAL(2),
          allowNull: false,
        },
        is_default: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        id_OptionConf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'OptionConf',
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
        id_Asset_AssetValue3D: {
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
        tableName: 'Value',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Value_OptionConf_FK',
            using: 'BTREE',
            fields: [{ name: 'id_OptionConf' }],
          },
          {
            name: 'Value_Asset0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Asset' }],
          },
          {
            name: 'Value_Asset1_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Asset_AssetValue3D' }],
          },
        ],
      }
    );
    return Value;
  }
}
