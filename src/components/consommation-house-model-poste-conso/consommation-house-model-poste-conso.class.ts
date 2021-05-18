import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { Consommation } from '../config/init-models.config';
import { ConsommationId } from '../consommation/consommation.class';
import { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationHouseModelPosteConsoAttributes {
  id_HouseModel: number;
  id_PosteConso: number;
  id_Consommation: number;
}

export type ConsommationHouseModelPosteConsoPk = 'id_HouseModel' | 'id_PosteConso';
export type ConsommationHouseModelPosteConsoId = ConsommationHouseModelPosteConso[ConsommationHouseModelPosteConsoPk];
export type ConsommationHouseModelPosteConsoCreationAttributes = Optional<
  ConsommationHouseModelPosteConsoAttributes,
  ConsommationHouseModelPosteConsoPk
>;

export class ConsommationHouseModelPosteConso
  extends Model<ConsommationHouseModelPosteConsoAttributes, ConsommationHouseModelPosteConsoCreationAttributes>
  implements ConsommationHouseModelPosteConsoAttributes {
  id_HouseModel!: number;
  id_PosteConso!: number;
  id_Consommation!: number;

  // ConsommationHouseModelPosteConso belongsTo HouseModel via id_HouseModel
  houseModel!: HouseModel;
  getHouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setHouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;
  // ConsommationHouseModelPosteConso belongsTo PosteConso via id_PosteConso
  posteConso!: PosteConso;
  getPosteConso!: Sequelize.BelongsToGetAssociationMixin<PosteConso>;
  setPosteConso!: Sequelize.BelongsToSetAssociationMixin<PosteConso, PosteConsoId>;
  createPosteConso!: Sequelize.BelongsToCreateAssociationMixin<PosteConso>;
  // ConsommationHouseModelPosteConso belongsTo PosteConso via id_PosteConso
  consommation!: Consommation;
  getConsommation!: Sequelize.BelongsToGetAssociationMixin<Consommation>;
  setConsommation!: Sequelize.BelongsToSetAssociationMixin<Consommation, ConsommationId>;
  createConsommation!: Sequelize.BelongsToCreateAssociationMixin<Consommation>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ConsommationHouseModelPosteConso {
    ConsommationHouseModelPosteConso.init(
      {
        id_HouseModel: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'HouseModel',
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
        id_Consommation: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Consommation',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'ConsommationHouseModelPosteConso',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }, { name: 'id_PosteConso' }, { name: 'id_Consommation'}],
          },
          {
            name: 'ConsommationHouseModelPosteConso_PosteConso0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_PosteConso' }],
          },
          {
            name: 'ConsommationHouseModelPosteConso_HouseModel0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }],
          },
          {
            name: 'ConsommationHouseModelPosteConso_Consommation0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Consommation' }],
          },
        ],
      }
    );
    return ConsommationHouseModelPosteConso;
  }
}
