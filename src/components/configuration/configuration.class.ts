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

export class Configuration
  extends Model<ConfigurationAttributes, ConfigurationCreationAttributes>
  implements ConfigurationAttributes {
  id!: number;
  name!: string;
  id_User!: number;
  id_HouseModel!: number;

  // Configuration hasMany ConfigurationValue via id_Configuration
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
  // Configuration belongsToMany Value via id_Configuration and id
  id_Values!: Value[];
  getId_Values!: Sequelize.BelongsToManyGetAssociationsMixin<Value>;
  setId_Values!: Sequelize.BelongsToManySetAssociationsMixin<Value, ValueId>;
  addId_Value!: Sequelize.BelongsToManyAddAssociationMixin<Value, ValueId>;
  addId_Values!: Sequelize.BelongsToManyAddAssociationsMixin<Value, ValueId>;
  createId_Value!: Sequelize.BelongsToManyCreateAssociationMixin<Value>;
  removeId_Value!: Sequelize.BelongsToManyRemoveAssociationMixin<Value, ValueId>;
  removeId_Values!: Sequelize.BelongsToManyRemoveAssociationsMixin<Value, ValueId>;
  hasId_Value!: Sequelize.BelongsToManyHasAssociationMixin<Value, ValueId>;
  hasId_Values!: Sequelize.BelongsToManyHasAssociationsMixin<Value, ValueId>;
  countId_Values!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Configuration belongsTo HouseModel via id_HouseModel
  id_HouseModel_HouseModel!: HouseModel;
  getId_HouseModel_HouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setId_HouseModel_HouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createId_HouseModel_HouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;
  // Configuration belongsTo User via id_User
  id_User_User!: User;
  getId_User_User!: Sequelize.BelongsToGetAssociationMixin<User>;
  setId_User_User!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createId_User_User!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Configuration {
    Configuration.init(
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
