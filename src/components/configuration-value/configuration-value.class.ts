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
  configuration!: Configuration;
  getConfiguration!: Sequelize.BelongsToGetAssociationMixin<Configuration>;
  setConfiguration!: Sequelize.BelongsToSetAssociationMixin<Configuration, ConfigurationId>;
  createConfiguration!: Sequelize.BelongsToCreateAssociationMixin<Configuration>;
  // ConfigurationValue belongsTo Value via id
  value!: Value;
  getValue!: Sequelize.BelongsToGetAssociationMixin<Value>;
  setValue!: Sequelize.BelongsToSetAssociationMixin<Value, ValueId>;
  createValue!: Sequelize.BelongsToCreateAssociationMixin<Value>;

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
