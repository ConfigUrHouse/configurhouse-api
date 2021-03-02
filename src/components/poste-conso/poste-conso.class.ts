import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Consommation, ConsommationId } from '../consommation/consommation.class';
import type {
  ConsommationPosteConso,
  ConsommationPosteConsoId,
} from '../consommation-poste-conso/consommation-poste-conso.class';

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

  // PosteConso belongsToMany Consommation via id_PosteConso and id
  id_Consommations!: Consommation[];
  getId_Consommations!: Sequelize.BelongsToManyGetAssociationsMixin<Consommation>;
  setId_Consommations!: Sequelize.BelongsToManySetAssociationsMixin<Consommation, ConsommationId>;
  addId_Consommation!: Sequelize.BelongsToManyAddAssociationMixin<Consommation, ConsommationId>;
  addId_Consommations!: Sequelize.BelongsToManyAddAssociationsMixin<Consommation, ConsommationId>;
  createId_Consommation!: Sequelize.BelongsToManyCreateAssociationMixin<Consommation>;
  removeId_Consommation!: Sequelize.BelongsToManyRemoveAssociationMixin<Consommation, ConsommationId>;
  removeId_Consommations!: Sequelize.BelongsToManyRemoveAssociationsMixin<Consommation, ConsommationId>;
  hasId_Consommation!: Sequelize.BelongsToManyHasAssociationMixin<Consommation, ConsommationId>;
  hasId_Consommations!: Sequelize.BelongsToManyHasAssociationsMixin<Consommation, ConsommationId>;
  countId_Consommations!: Sequelize.BelongsToManyCountAssociationsMixin;
  // PosteConso hasMany ConsommationPosteConso via id_PosteConso
  ConsommationPosteConsos!: ConsommationPosteConso[];
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
