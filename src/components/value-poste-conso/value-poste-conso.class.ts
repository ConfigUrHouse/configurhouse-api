import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';
import { Value, ValueId } from '../value/value.class';

export interface ValuePosteConsoAttributes {
  id: number;
  id_PosteConso: number;
  modifier: number;
}

export type ValuePosteConsoPk = 'id' | 'id_PosteConso';
export type ValuePosteConsoId = ValuePosteConso[ValuePosteConsoPk];
export type ValuePosteConsoCreationAttributes = Optional<ValuePosteConsoAttributes, ValuePosteConsoPk>;

export class ValuePosteConso
  extends Model<ValuePosteConsoAttributes, ValuePosteConsoCreationAttributes>
  implements ValuePosteConsoAttributes {
  id!: number;
  id_PosteConso!: number;
  modifier!: number;

  // ValuePosteConso belongsTo Value via id
  value!: Value;
  getValue!: Sequelize.BelongsToGetAssociationMixin<Value>;
  setValue!: Sequelize.BelongsToSetAssociationMixin<Value, ValueId>;
  createValue!: Sequelize.BelongsToCreateAssociationMixin<Value>;
  // ValuePosteConso belongsTo PosteConso via id_PosteConso
  posteConso!: PosteConso;
  getPosteConso!: Sequelize.BelongsToGetAssociationMixin<PosteConso>;
  setPosteConso!: Sequelize.BelongsToSetAssociationMixin<PosteConso, PosteConsoId>;
  createPosteConso!: Sequelize.BelongsToCreateAssociationMixin<PosteConso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ValuePosteConso {
    ValuePosteConso.init(
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
        id_PosteConso: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'PosteConso',
            key: 'id',
          },
        },
        modifier: {
          type: DataTypes.DECIMAL(7,2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ValuePosteConso',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }, { name: 'id_PosteConso' }],
          },
          {
            name: 'ValuePosteConso_PosteConso0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_PosteConso' }],
          },
        ],
      }
    );
    return ValuePosteConso;
  }
}
