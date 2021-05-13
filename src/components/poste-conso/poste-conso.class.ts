import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type {
  HouseModelPosteConso,
  HouseModelPosteConsoId,
} from '../house-model-poste-conso/house-model-poste-conso.class';
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
  // PosteConso hasMany HouseModelPosteConso via id_PosteConso
  houseModelPosteConsos!: HouseModelPosteConso[];
  getHouseModelPosteConsos!: Sequelize.HasManyGetAssociationsMixin<HouseModelPosteConso>;
  setHouseModelPosteConsos!: Sequelize.HasManySetAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  addHouseModelPosteConso!: Sequelize.HasManyAddAssociationMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  addHouseModelPosteConsos!: Sequelize.HasManyAddAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  createHouseModelPosteConso!: Sequelize.HasManyCreateAssociationMixin<HouseModelPosteConso>;
  removeHouseModelPosteConso!: Sequelize.HasManyRemoveAssociationMixin<
    HouseModelPosteConso,
    HouseModelPosteConsoId
  >;
  removeHouseModelPosteConsos!: Sequelize.HasManyRemoveAssociationsMixin<
    HouseModelPosteConso,
    HouseModelPosteConsoId
  >;
  hasHouseModelPosteConso!: Sequelize.HasManyHasAssociationMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  hasHouseModelPosteConsos!: Sequelize.HasManyHasAssociationsMixin<HouseModelPosteConso, HouseModelPosteConsoId>;
  countHouseModelPosteConsos!: Sequelize.HasManyCountAssociationsMixin;

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
