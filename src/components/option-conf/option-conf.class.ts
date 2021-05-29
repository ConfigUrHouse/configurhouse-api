import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { HouseModel, HouseModelId } from '../house-model/house-model.class';
import type { Mesh, MeshId } from '../mesh/mesh.class';
import type { Value, ValueId } from '../value/value.class';

export interface OptionConfAttributes {
  id: number;
  name: string;
  id_HouseModel: number;
  id_Mesh: number;
}

export type OptionConfPk = 'id';
export type OptionConfId = OptionConf[OptionConfPk];
export type OptionConfCreationAttributes = Optional<OptionConfAttributes, OptionConfPk>;

export class OptionConf extends Model implements OptionConfAttributes {
  id!: number;
  name!: string;
  id_HouseModel!: number;
  id_Mesh!: number;

  // OptionConf belongsTo HouseModel via id_HouseModel
  houseModel!: HouseModel;
  getHouseModel!: Sequelize.BelongsToGetAssociationMixin<HouseModel>;
  setHouseModel!: Sequelize.BelongsToSetAssociationMixin<HouseModel, HouseModelId>;
  createHouseModel!: Sequelize.BelongsToCreateAssociationMixin<HouseModel>;
  // OptionConf belongsTo Mesh via id_Mesh
  mesh!: Mesh;
  getMesh!: Sequelize.BelongsToGetAssociationMixin<Mesh>;
  setMesh!: Sequelize.BelongsToSetAssociationMixin<Mesh, MeshId>;
  createMesh!: Sequelize.BelongsToCreateAssociationMixin<Mesh>;
  // OptionConf hasMany Value via id_OptionConf
  values!: Value[];
  getValues!: Sequelize.HasManyGetAssociationsMixin<Value>;
  setValues!: Sequelize.HasManySetAssociationsMixin<Value, ValueId>;
  addValue!: Sequelize.HasManyAddAssociationMixin<Value, ValueId>;
  addValues!: Sequelize.HasManyAddAssociationsMixin<Value, ValueId>;
  createValue!: Sequelize.HasManyCreateAssociationMixin<Value>;
  removeValue!: Sequelize.HasManyRemoveAssociationMixin<Value, ValueId>;
  removeValues!: Sequelize.HasManyRemoveAssociationsMixin<Value, ValueId>;
  hasValue!: Sequelize.HasManyHasAssociationMixin<Value, ValueId>;
  hasValues!: Sequelize.HasManyHasAssociationsMixin<Value, ValueId>;
  countValues!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof OptionConf {
    OptionConf.init(
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
        id_HouseModel: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'HouseModel',
            key: 'id',
          },
        },
        id_Mesh: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Mesh',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'OptionConf',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'OptionConf_HouseModel_FK',
            using: 'BTREE',
            fields: [{ name: 'id_HouseModel' }],
          },
          {
            name: 'OptionConf_Mesh0_FK',
            using: 'BTREE',
            fields: [{ name: 'id_Mesh' }],
          },
        ],
      }
    );
    return OptionConf;
  }
}
