import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Configuration, ConfigurationId } from '../configuration/configuration.class';
import type { Value, ValueId } from '../value/value.class';

export interface ConfigurationValueAttributes {
  id: number;
  id_Configuration: number;
}

export type ConfigurationValuePk = 'id' | 'id_Configuration';
export type ConfigurationValueId = ConfigurationValue[ConfigurationValuePk];
export type ConfigurationValueCreationAttributes = Optional<ConfigurationValueAttributes, ConfigurationValuePk>;

export class ConfigurationValue
  extends Model<ConfigurationValueAttributes, ConfigurationValueCreationAttributes>
  implements ConfigurationValueAttributes {
  id!: number;
  id_Configuration!: number;

  // ConfigurationValue belongsTo Configuration via id_Configuration
  id_Configuration_Configuration!: Configuration;
  getId_Configuration_Configuration!: Sequelize.BelongsToGetAssociationMixin<Configuration>;
  setId_Configuration_Configuration!: Sequelize.BelongsToSetAssociationMixin<Configuration, ConfigurationId>;
  createId_Configuration_Configuration!: Sequelize.BelongsToCreateAssociationMixin<Configuration>;
  // ConfigurationValue belongsTo Value via id
  id_Value!: Value;
  getId_Value!: Sequelize.BelongsToGetAssociationMixin<Value>;
  setId_Value!: Sequelize.BelongsToSetAssociationMixin<Value, ValueId>;
  createId_Value!: Sequelize.BelongsToCreateAssociationMixin<Value>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ConfigurationValue {
    ConfigurationValue.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Value',
            key: 'id',
          },
        },
        id_Configuration: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Configuration',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'ConfigurationValue',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }, { name: 'id_Configuration' }],
          },
          {
            name: 'ConfigurationValue_Configuration0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Configuration' }],
          },
        ],
      }
    );
    return ConfigurationValue;
  }
}
