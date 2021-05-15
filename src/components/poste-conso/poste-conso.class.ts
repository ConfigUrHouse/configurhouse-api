import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import {
  ConsommationHouseModelPosteConso,
  ConsommationHouseModelPosteConsoId,
} from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { Consommation, ConsommationId } from '../consommation/consommation.class';
import { HouseModel, HouseModelId } from '../house-model/house-model.class';
import { Value, ValueId } from '../value/value.class';

export interface PosteConsoAttributes {
  id: number;
  name: string;
  description: string;
}

export type PosteConsoPk = 'id';
export type PosteConsoId = PosteConso[PosteConsoPk];
export type PosteConsoCreationAttributes = Optional<PosteConsoAttributes, PosteConsoPk>;

export class PosteConso
  extends Model<PosteConsoAttributes, PosteConsoCreationAttributes>
  implements PosteConsoAttributes {
  id!: number;
  name!: string;
  description!: string;

  // PosteConso belongsToMany HouseModel via id_PosteConso and id_HouseModel
  houseModels!: HouseModel[];
  getHouseModels!: Sequelize.BelongsToManyGetAssociationsMixin<HouseModel>;
  setHouseModels!: Sequelize.BelongsToManySetAssociationsMixin<HouseModel, HouseModelId>;
  addHouseModel!: Sequelize.BelongsToManyAddAssociationMixin<HouseModel, HouseModelId>;
  addHouseModels!: Sequelize.BelongsToManyAddAssociationsMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToManyCreateAssociationMixin<HouseModel>;
  removeHouseModel!: Sequelize.BelongsToManyRemoveAssociationMixin<HouseModel, HouseModelId>;
  removeHouseModels!: Sequelize.BelongsToManyRemoveAssociationsMixin<HouseModel, HouseModelId>;
  hasHouseModel!: Sequelize.BelongsToManyHasAssociationMixin<HouseModel, HouseModelId>;
  hasHouseModels!: Sequelize.BelongsToManyHasAssociationsMixin<HouseModel, HouseModelId>;
  countHouseModels!: Sequelize.BelongsToManyCountAssociationsMixin;
  // PosteConso belongsToMany Value via id_Value and id_PosteConso
  values!: Value[];
  getValues!: Sequelize.BelongsToManyGetAssociationsMixin<Value>;
  setValues!: Sequelize.BelongsToManySetAssociationsMixin<Value, ValueId>;
  addValue!: Sequelize.BelongsToManyAddAssociationMixin<Value, ValueId>;
  addValues!: Sequelize.BelongsToManyAddAssociationsMixin<Value, ValueId>;
  createValues!: Sequelize.BelongsToManyCreateAssociationMixin<Value>;
  removeValue!: Sequelize.BelongsToManyRemoveAssociationMixin<Value, ValueId>;
  removeValues!: Sequelize.BelongsToManyRemoveAssociationsMixin<Value, ValueId>;
  hasValue!: Sequelize.BelongsToManyHasAssociationMixin<Value, ValueId>;
  hasValues!: Sequelize.BelongsToManyHasAssociationsMixin<Value, ValueId>;
  countValues!: Sequelize.BelongsToManyCountAssociationsMixin;
  // PosteConso hasMany ConsommationHouseModelPosteConso via id_PosteConso
  consommationHouseModelPosteConsos!: ConsommationHouseModelPosteConso[];
  getConsommationHouseModelPosteConsos!: Sequelize.HasManyGetAssociationsMixin<ConsommationHouseModelPosteConso>;
  setConsommationHouseModelPosteConsos!: Sequelize.HasManySetAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  addConsommationHouseModelPosteConso!: Sequelize.HasManyAddAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  addConsommationHouseModelPosteConsos!: Sequelize.HasManyAddAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  createConsommationHouseModelPosteConso!: Sequelize.HasManyCreateAssociationMixin<ConsommationHouseModelPosteConso>;
  removeConsommationHouseModelPosteConso!: Sequelize.HasManyRemoveAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  removeConsommationHouseModelPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  hasConsommationHouseModelPosteConso!: Sequelize.HasManyHasAssociationMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  hasConsommationHouseModelPosteConsos!: Sequelize.HasManyHasAssociationsMixin<
    ConsommationHouseModelPosteConso,
    ConsommationHouseModelPosteConsoId
  >;
  // PosteConso belongsToMany Consommation via id_PosteConso and id_Consommation
  consommations!: Consommation[];
  getConsommations!: Sequelize.BelongsToManyGetAssociationsMixin<Consommation>;
  setConsommations!: Sequelize.BelongsToManySetAssociationsMixin<Consommation, ConsommationId>;
  addConsommation!: Sequelize.BelongsToManyAddAssociationMixin<Consommation, ConsommationId>;
  addConsommations!: Sequelize.BelongsToManyAddAssociationsMixin<Consommation, ConsommationId>;
  createConsommations!: Sequelize.BelongsToManyCreateAssociationMixin<Consommation>;
  removeConsommation!: Sequelize.BelongsToManyRemoveAssociationMixin<Consommation, ConsommationId>;
  removeConsommations!: Sequelize.BelongsToManyRemoveAssociationsMixin<Consommation, ConsommationId>;
  hasConsommation!: Sequelize.BelongsToManyHasAssociationMixin<Consommation, ConsommationId>;
  hasConsommations!: Sequelize.BelongsToManyHasAssociationsMixin<Consommation, ConsommationId>;
  countConsommations!: Sequelize.BelongsToManyCountAssociationsMixin;
  countConsommationHouseModelPosteConsos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof PosteConso {
    PosteConso.init(
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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'PosteConso',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
    return PosteConso;
  }
}
