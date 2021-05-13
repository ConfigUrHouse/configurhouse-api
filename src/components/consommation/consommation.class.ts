import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type {
  ConsommationPosteConso,
  ConsommationPosteConsoId,
} from '../consommation-poste-conso/consommation-poste-conso.class';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationAttributes {
  id: number;
  nb_personnes: number;
  id_HouseModel: number;
}

export type ConsommationPk = 'id';
export type ConsommationId = Consommation[ConsommationPk];
export type ConsommationCreationAttributes = Optional<ConsommationAttributes, ConsommationPk>;

export class Consommation
  extends Model<ConsommationAttributes, ConsommationCreationAttributes>
  implements ConsommationAttributes {
  id!: number;
  nb_personnes!: number;
  id_HouseModel!: number;

  // Consommation hasMany ConsommationPosteConso via id_Consommation
  consommationPosteConsos!: ConsommationPosteConso[];
  getConsommationPosteConsos!: Sequelize.HasManyGetAssociationsMixin<ConsommationPosteConso>;
  setConsommationPosteConsos!: Sequelize.HasManySetAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  addConsommationPosteConso!: Sequelize.HasManyAddAssociationMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  addConsommationPosteConsos!: Sequelize.HasManyAddAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  createConsommationPosteConso!: Sequelize.HasManyCreateAssociationMixin<ConsommationPosteConso>;
  removeConsommationPosteConso!: Sequelize.HasManyRemoveAssociationMixin<
    ConsommationPosteConso,
    ConsommationPosteConsoId
  >;
  removeConsommationPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<
    ConsommationPosteConso,
    ConsommationPosteConsoId
  >;
  hasConsommationPosteConso!: Sequelize.HasManyHasAssociationMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  hasConsommationPosteConsos!: Sequelize.HasManyHasAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  countConsommationPosteConsos!: Sequelize.HasManyCountAssociationsMixin;
  // Consommation belongsToMany PosteConso via id_Consommation and id_PosteConso
  posteConsos!: PosteConso[];
  getPosteConsos!: Sequelize.BelongsToManyGetAssociationsMixin<PosteConso>;
  setPosteConsos!: Sequelize.BelongsToManySetAssociationsMixin<PosteConso, PosteConsoId>;
  addPosteConso!: Sequelize.BelongsToManyAddAssociationMixin<PosteConso, PosteConsoId>;
  addPosteConsos!: Sequelize.BelongsToManyAddAssociationsMixin<PosteConso, PosteConsoId>;
  createPosteConso!: Sequelize.BelongsToManyCreateAssociationMixin<PosteConso>;
  removePosteConso!: Sequelize.BelongsToManyRemoveAssociationMixin<PosteConso, PosteConsoId>;
  removePosteConsos!: Sequelize.BelongsToManyRemoveAssociationsMixin<PosteConso, PosteConsoId>;
  hasPosteConso!: Sequelize.BelongsToManyHasAssociationMixin<PosteConso, PosteConsoId>;
  hasPosteConsos!: Sequelize.BelongsToManyHasAssociationsMixin<PosteConso, PosteConsoId>;
  countPosteConsos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Consommation belongsTo HouseModel via id_HouseModel
  houseModel!: HouseModel;
  getHouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setHouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Consommation {
    Consommation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        nb_personnes: {
          type: DataTypes.FLOAT,
          allowNull: false,
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
        tableName: 'Consommation',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Consommation_HouseModel_FK',
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }],
          },
        ],
      }
    );
    return Consommation;
  }
}
