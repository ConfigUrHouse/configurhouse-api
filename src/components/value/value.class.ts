import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import type { ConfigurationValue, ConfigurationValueId } from '../configuration-value/configuration-value.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';

export interface ValueAttributes {
  id: number;
  name: string;
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
  is_default!: number;
  id_OptionConf!: number;
  id_Asset!: number;
  id_Asset_AssetValue3D!: number;

  // Value belongsTo Asset via id_Asset
  id_Asset_Asset!: Asset;
  getId_Asset_Asset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setId_Asset_Asset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createId_Asset_Asset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // Value belongsTo Asset via id_Asset_AssetValue3D
  id_Asset_AssetValue3D_Asset!: Asset;
  getId_Asset_AssetValue3D_Asset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setId_Asset_AssetValue3D_Asset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createId_Asset_AssetValue3D_Asset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // Value belongsTo OptionConf via id_OptionConf
  id_OptionConf_OptionConf!: OptionConf;
  getId_OptionConf_OptionConf!: Sequelize.BelongsToGetAssociationMixin<OptionConf>;
  setId_OptionConf_OptionConf!: Sequelize.BelongsToSetAssociationMixin<OptionConf, OptionConfId>;
  createId_OptionConf_OptionConf!: Sequelize.BelongsToCreateAssociationMixin<OptionConf>;
  // Value belongsToMany Configuration via id and id_Configuration
  id_Configuration_Configurations!: Configuration[];
  getId_Configuration_Configurations!: Sequelize.BelongsToManyGetAssociationsMixin<Configuration>;
  setId_Configuration_Configurations!: Sequelize.BelongsToManySetAssociationsMixin<Configuration, ConfigurationId>;
  addId_Configuration_Configuration!: Sequelize.BelongsToManyAddAssociationMixin<Configuration, ConfigurationId>;
  addId_Configuration_Configurations!: Sequelize.BelongsToManyAddAssociationsMixin<Configuration, ConfigurationId>;
  createId_Configuration_Configuration!: Sequelize.BelongsToManyCreateAssociationMixin<Configuration>;
  removeId_Configuration_Configuration!: Sequelize.BelongsToManyRemoveAssociationMixin<Configuration, ConfigurationId>;
  removeId_Configuration_Configurations!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    Configuration,
    ConfigurationId
  >;
  hasId_Configuration_Configuration!: Sequelize.BelongsToManyHasAssociationMixin<Configuration, ConfigurationId>;
  hasId_Configuration_Configurations!: Sequelize.BelongsToManyHasAssociationsMixin<Configuration, ConfigurationId>;
  countId_Configuration_Configurations!: Sequelize.BelongsToManyCountAssociationsMixin;
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
        },
        name: {
          type: DataTypes.STRING(200),
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
