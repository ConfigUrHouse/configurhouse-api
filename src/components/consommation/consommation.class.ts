import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import {
  ConsommationHouseModelPosteConso,
  ConsommationHouseModelPosteConsoId,
} from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { HouseModel, HouseModelId } from '../house-model/house-model.class';
import { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationAttributes {
  id: number;
  name: string;
  conso: number;
  is_reference: number;
}

export type ConsommationPk = 'id';
export type ConsommationId = Consommation[ConsommationPk];
export type ConsommationCreationAttributes = Optional<ConsommationAttributes, ConsommationPk>;

export class Consommation extends Model implements ConsommationAttributes {
  id!: number;
  name!: string;
  conso!: number;
  is_reference!: number;

  // Consommation hasMany ConsommationHouseModelPosteConso via id_Consommation
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
  countConsommationHouseModelPosteConsos!: Sequelize.HasManyCountAssociationsMixin;
  // Consommation belongsToMany PosteConso via id_Consommation and id_PosteConso
  posteConsos!: PosteConso[];
  getPosteConsos!: Sequelize.BelongsToManyGetAssociationsMixin<PosteConso>;
  setPosteConsos!: Sequelize.BelongsToManySetAssociationsMixin<PosteConso, PosteConsoId>;
  addPosteConso!: Sequelize.BelongsToManyAddAssociationMixin<PosteConso, PosteConsoId>;
  addPosteConsos!: Sequelize.BelongsToManyAddAssociationsMixin<PosteConso, PosteConsoId>;
  createPosteConsos!: Sequelize.BelongsToManyCreateAssociationMixin<PosteConso>;
  removePosteConso!: Sequelize.BelongsToManyRemoveAssociationMixin<PosteConso, PosteConsoId>;
  removePosteConsos!: Sequelize.BelongsToManyRemoveAssociationsMixin<PosteConso, PosteConsoId>;
  hasPosteConso!: Sequelize.BelongsToManyHasAssociationMixin<PosteConso, PosteConsoId>;
  hasPosteConsos!: Sequelize.BelongsToManyHasAssociationsMixin<PosteConso, PosteConsoId>;
  countPosteConsos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Consommation belongsToMany HouseModel via id_Consommation and id_HouseModel
  houseModels!: HouseModel[];
  getHouseModels!: Sequelize.BelongsToManyGetAssociationsMixin<HouseModel>;
  setHouseModels!: Sequelize.BelongsToManySetAssociationsMixin<HouseModel, HouseModelId>;
  addHouseModel!: Sequelize.BelongsToManyAddAssociationMixin<HouseModel, HouseModelId>;
  addHouseModels!: Sequelize.BelongsToManyAddAssociationsMixin<HouseModel, HouseModelId>;
  createHouseModels!: Sequelize.BelongsToManyCreateAssociationMixin<HouseModel>;
  removeHouseModel!: Sequelize.BelongsToManyRemoveAssociationMixin<HouseModel, HouseModelId>;
  removeHouseModels!: Sequelize.BelongsToManyRemoveAssociationsMixin<HouseModel, HouseModelId>;
  hasHouseModel!: Sequelize.BelongsToManyHasAssociationMixin<HouseModel, HouseModelId>;
  hasHouseModels!: Sequelize.BelongsToManyHasAssociationsMixin<HouseModel, HouseModelId>;
  countHouseModels!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Consommation {
    Consommation.init(
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
        conso: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_reference: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Consommation',
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
    return Consommation;
  }
}
