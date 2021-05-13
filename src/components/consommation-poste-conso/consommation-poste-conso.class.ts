import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Consommation, ConsommationId } from '../consommation/consommation.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationPosteConsoAttributes {
  id_Consommation: number;
  id_PosteConso: number;
  Conso: number;
  Conso_reference: number;
}

export type ConsommationPosteConsoPk = 'id_Consommation' | 'id_PosteConso';
export type ConsommationPosteConsoId = ConsommationPosteConso[ConsommationPosteConsoPk];
export type ConsommationPosteConsoCreationAttributes = Optional<
  ConsommationPosteConsoAttributes,
  ConsommationPosteConsoPk
>;

export class ConsommationPosteConso
  extends Model<ConsommationPosteConsoAttributes, ConsommationPosteConsoCreationAttributes>
  implements ConsommationPosteConsoAttributes {
  id_Consommation!: number;
  id_PosteConso!: number;
  Conso!: number;
  Conso_reference!: number;

  // ConsommationPosteConso belongsTo Consommation via id_Consommation
  consommation!: Consommation;
  getConsommation!: Sequelize.BelongsToGetAssociationMixin<Consommation>;
  setConsommation!: Sequelize.BelongsToSetAssociationMixin<Consommation, ConsommationId>;
  createConsommation!: Sequelize.BelongsToCreateAssociationMixin<Consommation>;
  // ConsommationPosteConso belongsTo PosteConso via id_PosteConso
  idPosteConso!: PosteConso;
  getPosteConso!: Sequelize.BelongsToGetAssociationMixin<PosteConso>;
  setPosteConso!: Sequelize.BelongsToSetAssociationMixin<PosteConso, PosteConsoId>;
  createPosteConso!: Sequelize.BelongsToCreateAssociationMixin<PosteConso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ConsommationPosteConso {
    ConsommationPosteConso.init(
      {
        id_Consommation: {
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
            fields: [{ name: 'id_Consommation' }, { name: 'id_PosteConso' }],
          },
          {
            name: 'ConsommationPosteConso_PosteConso0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_PosteConso' }],
          },
          {
            name: 'ConsommationPosteConso_Consommation0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Consommation' }],
          },
        ],
      }
    );
    return ConsommationPosteConso;
  }
}
