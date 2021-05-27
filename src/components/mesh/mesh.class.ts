import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Asset, AssetId } from '../asset/asset.class';
import type { OptionConf, OptionConfId } from '../option-conf/option-conf.class';

export interface MeshAttributes {
  id: number;
  name: string;
  id_Asset: number;
}

export type MeshPk = 'id';
export type MeshId = Mesh[MeshPk];
export type MeshCreationAttributes = Optional<MeshAttributes, MeshPk>;

export class Mesh extends Model implements MeshAttributes {
  id!: number;
  name!: string;
  id_Asset!: number;

  // Mesh belongsTo Asset via id_Asset
  asset!: Asset;
  getAsset!: Sequelize.BelongsToGetAssociationMixin<Asset>;
  setAsset!: Sequelize.BelongsToSetAssociationMixin<Asset, AssetId>;
  createAsset!: Sequelize.BelongsToCreateAssociationMixin<Asset>;
  // Mesh hasMany OptionConf via id_Mesh
  optionConfs!: OptionConf[];
  getOptionConfs!: Sequelize.HasManyGetAssociationsMixin<OptionConf>;
  setOptionConfs!: Sequelize.HasManySetAssociationsMixin<OptionConf, OptionConfId>;
  addOptionConf!: Sequelize.HasManyAddAssociationMixin<OptionConf, OptionConfId>;
  addOptionConfs!: Sequelize.HasManyAddAssociationsMixin<OptionConf, OptionConfId>;
  createOptionConf!: Sequelize.HasManyCreateAssociationMixin<OptionConf>;
  removeOptionConf!: Sequelize.HasManyRemoveAssociationMixin<OptionConf, OptionConfId>;
  removeOptionConfs!: Sequelize.HasManyRemoveAssociationsMixin<OptionConf, OptionConfId>;
  hasOptionConf!: Sequelize.HasManyHasAssociationMixin<OptionConf, OptionConfId>;
  hasOptionConfs!: Sequelize.HasManyHasAssociationsMixin<OptionConf, OptionConfId>;
  countOptionConfs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Mesh {
    Mesh.init(
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
        id_Asset: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Asset',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'Mesh',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'Mesh_Asset_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Asset' }],
          },
        ],
      }
    );
    return Mesh;
  }
}
