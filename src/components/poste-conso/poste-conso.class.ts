import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Consommation, ConsommationId } from '../consommation/consommation.class';
import type {
  ConsommationPosteConso,
  ConsommationPosteConsoId,
} from '../consommation-poste-conso/consommation-poste-conso.class';
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

  // PosteConso belongsToMany Consommation via id_PosteConso and id_Consommation
  consommations!: Consommation[];
  getConsommations!: Sequelize.BelongsToManyGetAssociationsMixin<Consommation>;
  setConsommations!: Sequelize.BelongsToManySetAssociationsMixin<Consommation, ConsommationId>;
  addConsommation!: Sequelize.BelongsToManyAddAssociationMixin<Consommation, ConsommationId>;
  addConsommations!: Sequelize.BelongsToManyAddAssociationsMixin<Consommation, ConsommationId>;
  createConsommation!: Sequelize.BelongsToManyCreateAssociationMixin<Consommation>;
  removeConsommation!: Sequelize.BelongsToManyRemoveAssociationMixin<Consommation, ConsommationId>;
  removeConsommations!: Sequelize.BelongsToManyRemoveAssociationsMixin<Consommation, ConsommationId>;
  hasConsommation!: Sequelize.BelongsToManyHasAssociationMixin<Consommation, ConsommationId>;
  hasConsommations!: Sequelize.BelongsToManyHasAssociationsMixin<Consommation, ConsommationId>;
  countConsommations!: Sequelize.BelongsToManyCountAssociationsMixin;
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
  // PosteConso hasMany ConsommationPosteConso via id_PosteConso
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
