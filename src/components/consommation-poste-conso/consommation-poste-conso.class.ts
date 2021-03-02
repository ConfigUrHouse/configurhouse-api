import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Consommation, ConsommationId } from '../consommation/consommation.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationPosteConsoAttributes {
  id: number;
  id_PosteConso: number;
  Conso: number;
  Conso_reference: number;
}

export type ConsommationPosteConsoPk = 'id' | 'id_PosteConso';
export type ConsommationPosteConsoId = ConsommationPosteConso[ConsommationPosteConsoPk];
export type ConsommationPosteConsoCreationAttributes = Optional<
  ConsommationPosteConsoAttributes,
  ConsommationPosteConsoPk
>;

export class ConsommationPosteConso
  extends Model<ConsommationPosteConsoAttributes, ConsommationPosteConsoCreationAttributes>
  implements ConsommationPosteConsoAttributes {
  id!: number;
  id_PosteConso!: number;
  Conso!: number;
  Conso_reference!: number;

  // ConsommationPosteConso belongsTo Consommation via id
  id_Consommation!: Consommation;
  getId_Consommation!: Sequelize.BelongsToGetAssociationMixin<Consommation>;
  setId_Consommation!: Sequelize.BelongsToSetAssociationMixin<Consommation, ConsommationId>;
  createId_Consommation!: Sequelize.BelongsToCreateAssociationMixin<Consommation>;
  // ConsommationPosteConso belongsTo PosteConso via id_PosteConso
  id_PosteConso_PosteConso!: PosteConso;
  getId_PosteConso_PosteConso!: Sequelize.BelongsToGetAssociationMixin<PosteConso>;
  setId_PosteConso_PosteConso!: Sequelize.BelongsToSetAssociationMixin<PosteConso, PosteConsoId>;
  createId_PosteConso_PosteConso!: Sequelize.BelongsToCreateAssociationMixin<PosteConso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ConsommationPosteConso {
    ConsommationPosteConso.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Consommation',
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
        Conso: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        Conso_reference: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ConsommationPosteConso',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }, { name: 'id_PosteConso' }],
          },
          {
            name: 'ConsommationPosteConso_PosteConso0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_PosteConso' }],
          },
        ],
      }
    );
    return ConsommationPosteConso;
  }
}
