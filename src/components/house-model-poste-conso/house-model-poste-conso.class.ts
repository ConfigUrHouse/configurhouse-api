import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface HouseModelPosteConsoAttributes {
  id_HouseModel: number;
  id_PosteConso: number;
  conso_reference: number;
}

export type HouseModelPosteConsoPk = 'id_HouseModel' | 'id_PosteConso';
export type HouseModelPosteConsoId = HouseModelPosteConso[HouseModelPosteConsoPk];
export type HouseModelPosteConsoCreationAttributes = Optional<
  HouseModelPosteConsoAttributes,
  HouseModelPosteConsoPk
>;

export class HouseModelPosteConso
  extends Model<HouseModelPosteConsoAttributes, HouseModelPosteConsoCreationAttributes>
  implements HouseModelPosteConsoAttributes {
  id_HouseModel!: number;
  id_PosteConso!: number;
  conso_reference!: number;

  // HouseModelPosteConso belongsTo HouseModel via id_HouseModel
  houseModel!: HouseModel;
  getHouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setHouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;
  // HouseModelPosteConso belongsTo PosteConso via id_PosteConso
  posteConso!: PosteConso;
  getPosteConso!: Sequelize.BelongsToGetAssociationMixin<PosteConso>;
  setPosteConso!: Sequelize.BelongsToSetAssociationMixin<PosteConso, PosteConsoId>;
  createPosteConso!: Sequelize.BelongsToCreateAssociationMixin<PosteConso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof HouseModelPosteConso {
    HouseModelPosteConso.init(
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
        conso_reference: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'HouseModelPosteConso',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }, { name: 'id_PosteConso' }],
          },
          {
            name: 'HouseModelPosteConso_PosteConso0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_PosteConso' }],
          },
          {
            name: 'HouseModelPosteConso_HouseModel0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }],
          },
        ],
      }
    );
    return HouseModelPosteConso;
  }
}
