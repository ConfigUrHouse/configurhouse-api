import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';

export interface ModelTypeAttributes {
  id: number;
  name: string;
  description: string;
}

export type ModelTypePk = 'id';
export type ModelTypeId = ModelType[ModelTypePk];
export type ModelTypeCreationAttributes = Optional<ModelTypeAttributes, ModelTypePk>;

export class ModelType extends Model implements ModelTypeAttributes {
  id!: number;
  name!: string;
  description!: string;

  // ModelType hasMany HouseModel via id_ModelType
  houseModels!: HouseModel[];
  getHouseModels!: Sequelize.HasManyGetAssociationsMixin<HouseModel>;
  setHouseModels!: Sequelize.HasManySetAssociationsMixin<HouseModel, HouseModelId>;
  addHouseModel!: Sequelize.HasManyAddAssociationMixin<HouseModel, HouseModelId>;
  addHouseModels!: Sequelize.HasManyAddAssociationsMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.HasManyCreateAssociationMixin<HouseModel>;
  removeHouseModel!: Sequelize.HasManyRemoveAssociationMixin<HouseModel, HouseModelId>;
  removeHouseModels!: Sequelize.HasManyRemoveAssociationsMixin<HouseModel, HouseModelId>;
  hasHouseModel!: Sequelize.HasManyHasAssociationMixin<HouseModel, HouseModelId>;
  hasHouseModels!: Sequelize.HasManyHasAssociationsMixin<HouseModel, HouseModelId>;
  countHouseModels!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ModelType {
    ModelType.init(
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
        tableName: 'ModelType',
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
    return ModelType;
  }
}
