import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { ConsommationPosteConso, ConsommationPosteConsoId } from '../consommation-poste-conso/consommation-poste-conso.class';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { PosteConso, PosteConsoId } from '../poste-conso/poste-conso.class';

export interface ConsommationAttributes {
  id: number;
  nb_personnes: number;
  id_HouseModel: number;
}

export type ConsommationPk = "id";
export type ConsommationId = Consommation[ConsommationPk];
export type ConsommationCreationAttributes = Optional<ConsommationAttributes, ConsommationPk>;

export class Consommation extends Model<ConsommationAttributes, ConsommationCreationAttributes> implements ConsommationAttributes {
  id!: number;
  nb_personnes!: number;
  id_HouseModel!: number;

  // Consommation hasMany ConsommationPosteConso via id
  ConsommationPosteConsos!: ConsommationPosteConso[];
  getConsommationPosteConsos!: Sequelize.HasManyGetAssociationsMixin<ConsommationPosteConso>;
  setConsommationPosteConsos!: Sequelize.HasManySetAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  addConsommationPosteConso!: Sequelize.HasManyAddAssociationMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  addConsommationPosteConsos!: Sequelize.HasManyAddAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  createConsommationPosteConso!: Sequelize.HasManyCreateAssociationMixin<ConsommationPosteConso>;
  removeConsommationPosteConso!: Sequelize.HasManyRemoveAssociationMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  removeConsommationPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  hasConsommationPosteConso!: Sequelize.HasManyHasAssociationMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  hasConsommationPosteConsos!: Sequelize.HasManyHasAssociationsMixin<ConsommationPosteConso, ConsommationPosteConsoId>;
  countConsommationPosteConsos!: Sequelize.HasManyCountAssociationsMixin;
  // Consommation belongsToMany PosteConso via id and id_PosteConso
  id_PosteConso_PosteConsos!: PosteConso[];
  getId_PosteConso_PosteConsos!: Sequelize.BelongsToManyGetAssociationsMixin<PosteConso>;
  setId_PosteConso_PosteConsos!: Sequelize.BelongsToManySetAssociationsMixin<PosteConso, PosteConsoId>;
  addId_PosteConso_PosteConso!: Sequelize.BelongsToManyAddAssociationMixin<PosteConso, PosteConsoId>;
  addId_PosteConso_PosteConsos!: Sequelize.BelongsToManyAddAssociationsMixin<PosteConso, PosteConsoId>;
  createId_PosteConso_PosteConso!: Sequelize.BelongsToManyCreateAssociationMixin<PosteConso>;
  removeId_PosteConso_PosteConso!: Sequelize.BelongsToManyRemoveAssociationMixin<PosteConso, PosteConsoId>;
  removeId_PosteConso_PosteConsos!: Sequelize.BelongsToManyRemoveAssociationsMixin<PosteConso, PosteConsoId>;
  hasId_PosteConso_PosteConso!: Sequelize.BelongsToManyHasAssociationMixin<PosteConso, PosteConsoId>;
  hasId_PosteConso_PosteConsos!: Sequelize.BelongsToManyHasAssociationsMixin<PosteConso, PosteConsoId>;
  countId_PosteConso_PosteConsos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Consommation belongsTo HouseModel via id_HouseModel
  id_HouseModel_HouseModel!: HouseModel;
  getId_HouseModel_HouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setId_HouseModel_HouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createId_HouseModel_HouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Consommation {
    Consommation.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nb_personnes: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    id_HouseModel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HouseModel',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Consommation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Consommation_HouseModel_FK",
        using: "BTREE",
        fields: [
          { name: "id_HouseModel" },
        ]
      },
    ]
  });
  return Consommation;
  }
}
