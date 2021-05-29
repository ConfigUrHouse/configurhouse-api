import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { ConfigurationValue, ConfigurationValueId } from '../configuration-value/configuration-value.class';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { User, UserId } from '../user/user.class';
import type { Value, ValueId } from '../value/value.class';

export interface ConfigurationAttributes {
  id: number;
  name: string;
  id_User: number;
  id_HouseModel: number;
}

export type ConfigurationPk = 'id';
export type ConfigurationId = Configuration[ConfigurationPk];
export type ConfigurationCreationAttributes = Optional<ConfigurationAttributes, ConfigurationPk>;

export class Configuration extends Model implements ConfigurationAttributes {
  id!: number;
  name!: string;
  id_User!: number;
  id_HouseModel!: number;

  // Configuration hasMany ConfigurationValue via id_Configuration
  configurationValues!: ConfigurationValue[];
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
  // Configuration belongsToMany Value via id_Configuration and id_Value
  values!: Value[];
  getValues!: Sequelize.BelongsToManyGetAssociationsMixin<Value>;
  setValues!: Sequelize.BelongsToManySetAssociationsMixin<Value, ValueId>;
  addValue!: Sequelize.BelongsToManyAddAssociationMixin<Value, ValueId>;
  addValues!: Sequelize.BelongsToManyAddAssociationsMixin<Value, ValueId>;
  createValue!: Sequelize.BelongsToManyCreateAssociationMixin<Value>;
  removeValue!: Sequelize.BelongsToManyRemoveAssociationMixin<Value, ValueId>;
  removeValues!: Sequelize.BelongsToManyRemoveAssociationsMixin<Value, ValueId>;
  hasValue!: Sequelize.BelongsToManyHasAssociationMixin<Value, ValueId>;
  hasValues!: Sequelize.BelongsToManyHasAssociationsMixin<Value, ValueId>;
  countValues!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Configuration belongsTo HouseModel via id_HouseModel
  houseModel!: HouseModel;
  getHouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setHouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;
  // Configuration belongsTo User via id_User
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Configuration {
    Configuration.init(
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
        id_User: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        id_HouseModel: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'HouseModel',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Configuration',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Configuration_User_FK',
            using: 'BTREE',
            fields: [{ name: 'id_User' }],
          },
          {
            name: 'Configuration_HouseModel0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }],
          },
        ],
      }
    );
    return Configuration;
  }
}
