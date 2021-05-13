import type { Sequelize, Model } from 'sequelize';
import { Asset } from '../asset/asset.class';
import type { AssetAttributes, AssetCreationAttributes } from '../asset/asset.class';
import { AssetType } from '../asset-type/asset-type.class';
import type { AssetTypeAttributes, AssetTypeCreationAttributes } from '../asset-type/asset-type.class';
import { Configuration } from '../configuration/configuration.class';
import type { ConfigurationAttributes, ConfigurationCreationAttributes } from '../configuration/configuration.class';
import { ConfigurationValue } from '../configuration-value/configuration-value.class';
import type {
  ConfigurationValueAttributes,
  ConfigurationValueCreationAttributes,
} from '../configuration-value/configuration-value.class';
import { Consommation } from '../consommation/consommation.class';
import type { ConsommationAttributes, ConsommationCreationAttributes } from '../consommation/consommation.class';
import { ConsommationPosteConso } from '../consommation-poste-conso/consommation-poste-conso.class';
import type {
  ConsommationPosteConsoAttributes,
  ConsommationPosteConsoCreationAttributes,
} from '../consommation-poste-conso/consommation-poste-conso.class';
import { Email } from '../email/email.class';
import type { EmailAttributes, EmailCreationAttributes } from '../email/email.class';
import { HouseModel } from '../house-model/house-model.class';
import type { HouseModelAttributes, HouseModelCreationAttributes } from '../house-model/house-model.class';
import { Mesh } from '../mesh/mesh.class';
import type { MeshAttributes, MeshCreationAttributes } from '../mesh/mesh.class';
import { ModelType } from '../model-type/model-type.class';
import type { ModelTypeAttributes, ModelTypeCreationAttributes } from '../model-type/model-type.class';
import { OptionConf } from '../option-conf/option-conf.class';
import type { OptionConfAttributes, OptionConfCreationAttributes } from '../option-conf/option-conf.class';
import { Police } from '../police/police.class';
import type { PoliceAttributes, PoliceCreationAttributes } from '../police/police.class';
import { PosteConso } from '../poste-conso/poste-conso.class';
import type { PosteConsoAttributes, PosteConsoCreationAttributes } from '../poste-conso/poste-conso.class';
import { Role } from '../role/role.class';
import type { RoleAttributes, RoleCreationAttributes } from '../role/role.class';
import { Token } from '../token/token.class';
import type { TokenAttributes, TokenCreationAttributes } from '../token/token.class';
import { TokenType } from '../token-type/token-type.class';
import type { TokenTypeAttributes, TokenTypeCreationAttributes } from '../token-type/token-type.class';
import { User } from '../user/user.class';
import type { UserAttributes, UserCreationAttributes } from '../user/user.class';
import { UserEmail } from '../user-email/user-email.class';
import type { UserEmailAttributes, UserEmailCreationAttributes } from '../user-email/user-email.class';
import { UserPolice } from '../user-police/user-police.class';
import type { UserPoliceAttributes, UserPoliceCreationAttributes } from '../user-police/user-police.class';
import { UserRole } from '../user-role/user-role.class';
import type { UserRoleAttributes, UserRoleCreationAttributes } from '../user-role/user-role.class';
import { Value } from '../value/value.class';
import type { ValueAttributes, ValueCreationAttributes } from '../value/value.class';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';

export {
  Asset,
  AssetType,
  Configuration,
  ConfigurationValue,
  Consommation,
  ConsommationPosteConso,
  Email,
  HouseModel,
  Mesh,
  ModelType,
  OptionConf,
  Police,
  PosteConso,
  Role,
  Token,
  TokenType,
  User,
  UserEmail,
  UserPolice,
  UserRole,
  Value,
};

export type {
  AssetAttributes,
  AssetCreationAttributes,
  AssetTypeAttributes,
  AssetTypeCreationAttributes,
  ConfigurationAttributes,
  ConfigurationCreationAttributes,
  ConfigurationValueAttributes,
  ConfigurationValueCreationAttributes,
  ConsommationAttributes,
  ConsommationCreationAttributes,
  ConsommationPosteConsoAttributes,
  ConsommationPosteConsoCreationAttributes,
  EmailAttributes,
  EmailCreationAttributes,
  HouseModelAttributes,
  HouseModelCreationAttributes,
  MeshAttributes,
  MeshCreationAttributes,
  ModelTypeAttributes,
  ModelTypeCreationAttributes,
  OptionConfAttributes,
  OptionConfCreationAttributes,
  PoliceAttributes,
  PoliceCreationAttributes,
  PosteConsoAttributes,
  PosteConsoCreationAttributes,
  RoleAttributes,
  RoleCreationAttributes,
  TokenAttributes,
  TokenCreationAttributes,
  TokenTypeAttributes,
  TokenTypeCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserEmailAttributes,
  UserEmailCreationAttributes,
  UserPoliceAttributes,
  UserPoliceCreationAttributes,
  UserRoleAttributes,
  UserRoleCreationAttributes,
  ValueAttributes,
  ValueCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Asset.initModel(sequelize);
  AssetType.initModel(sequelize);
  Configuration.initModel(sequelize);
  ConfigurationValue.initModel(sequelize);
  Consommation.initModel(sequelize);
  ConsommationPosteConso.initModel(sequelize);
  Email.initModel(sequelize);
  HouseModel.initModel(sequelize);
  Mesh.initModel(sequelize);
  ModelType.initModel(sequelize);
  OptionConf.initModel(sequelize);
  Police.initModel(sequelize);
  PosteConso.initModel(sequelize);
  Role.initModel(sequelize);
  Token.initModel(sequelize);
  TokenType.initModel(sequelize);
  User.initModel(sequelize);
  UserEmail.initModel(sequelize);
  UserPolice.initModel(sequelize);
  UserRole.initModel(sequelize);
  Value.initModel(sequelize);
  ValuePosteConso.initModel(sequelize);

  Configuration.belongsToMany(Value, {
    as: 'values',
    through: ConfigurationValue as typeof Model,
    foreignKey: 'id_Configuration',
    otherKey: 'id_Value',
  });
  Consommation.belongsToMany(PosteConso, {
    as: 'posteConsos',
    through: ConsommationPosteConso as typeof Model,
    foreignKey: 'id_Consommation',
    otherKey: 'id_PosteConso',
  });
  Email.belongsToMany(User, {
    as: 'users',
    through: UserEmail as typeof Model,
    foreignKey: 'id_Email',
    otherKey: 'id_User',
  });
  Police.belongsToMany(User, {
    as: 'users',
    through: UserPolice as typeof Model,
    foreignKey: 'id_Police',
    otherKey: 'id_User',
  });
  PosteConso.belongsToMany(Consommation, {
    as: 'consommations',
    through: ConsommationPosteConso as typeof Model,
    foreignKey: 'id_PosteConso',
    otherKey: 'id_Consommation',
  });
  Role.belongsToMany(User, {
    as: 'users',
    through: UserRole as typeof Model,
    foreignKey: 'id_Role',
    otherKey: 'id_User',
  });
  User.belongsToMany(Email, {
    as: 'emails',
    through: UserEmail as typeof Model,
    foreignKey: 'id_User',
    otherKey: 'id_Email',
  });
  User.belongsToMany(Police, {
    as: 'polices',
    through: UserPolice as typeof Model,
    foreignKey: 'id_User',
    otherKey: 'id_Police',
  });
  User.belongsToMany(Role, {
    as: 'roles',
    through: UserRole as typeof Model,
    foreignKey: 'id_User',
    otherKey: 'id_Role',
  });
  Value.belongsToMany(Configuration, {
    as: 'configurations',
    through: ConfigurationValue as typeof Model,
    foreignKey: 'id_Value',
    otherKey: 'id_Configuration',
  });
  Value.belongsToMany(PosteConso, {
    as: 'posteConsos',
    through: ValuePosteConso as typeof Model,
    foreignKey: 'id_Value',
    otherKey: 'id_PosteConso',
  });
  PosteConso.belongsToMany(Value, {
    as: 'values',
    through: ValuePosteConso as typeof Model,
    foreignKey: 'id_PosteConso',
    otherKey: 'id_Value',
  });
  HouseModel.belongsTo(Asset, { as: 'asset', foreignKey: 'id_Asset' });
  Asset.hasMany(HouseModel, { as: 'houseModels', foreignKey: 'id_Asset' });
  Mesh.belongsTo(Asset, { as: 'asset', foreignKey: 'id_Asset' });
  Asset.hasMany(Mesh, { as: 'meshes', foreignKey: 'id_Asset' });
  Value.belongsTo(Asset, { as: 'asset', foreignKey: 'id_Asset' });
  Asset.hasMany(Value, { as: 'values', foreignKey: 'id_Asset' });
  Asset.belongsTo(AssetType, { as: 'assetType', foreignKey: 'id_AssetType' });
  AssetType.hasMany(Asset, { as: 'assets', foreignKey: 'id_AssetType' });
  ConfigurationValue.belongsTo(Configuration, { as: 'configuration', foreignKey: 'id_Configuration' });
  Configuration.hasMany(ConfigurationValue, { as: 'configurationValues', foreignKey: 'id_Configuration' });
  ConsommationPosteConso.belongsTo(Consommation, { as: 'consommation', foreignKey: 'id_Consommation' });
  Consommation.hasMany(ConsommationPosteConso, { as: 'consommationPosteConsos', foreignKey: 'id_Consommation' });
  UserEmail.belongsTo(Email, { as: 'email', foreignKey: 'id_Email' });
  Email.hasMany(UserEmail, { as: 'userEmails', foreignKey: 'id_Email' });
  Configuration.belongsTo(HouseModel, { as: 'houseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(Configuration, { as: 'configurations', foreignKey: 'id_HouseModel' });
  Consommation.belongsTo(HouseModel, { as: 'houseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(Consommation, { as: 'consommations', foreignKey: 'id_HouseModel' });
  OptionConf.belongsTo(HouseModel, { as: 'houseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(OptionConf, { as: 'optionConfs', foreignKey: 'id_HouseModel' });
  OptionConf.belongsTo(Mesh, { as: 'mesh', foreignKey: 'id_Mesh' });
  Mesh.hasMany(OptionConf, { as: 'optionConfs', foreignKey: 'id_Mesh' });
  HouseModel.belongsTo(ModelType, { as: 'modelType', foreignKey: 'id_ModelType' });
  ModelType.hasMany(HouseModel, { as: 'houseModels', foreignKey: 'id_ModelType' });
  Value.belongsTo(OptionConf, { as: 'optionConf', foreignKey: 'id_OptionConf' });
  OptionConf.hasMany(Value, { as: 'values', foreignKey: 'id_OptionConf' });
  UserPolice.belongsTo(Police, { as: 'police', foreignKey: 'id_Police' });
  Police.hasMany(UserPolice, { as: 'userPolice', foreignKey: 'id_Police' });
  ConsommationPosteConso.belongsTo(PosteConso, { as: 'posteConso', foreignKey: 'id_PosteConso' });
  PosteConso.hasMany(ConsommationPosteConso, { as: 'consommationPosteConsos', foreignKey: 'id_PosteConso' });
  UserRole.belongsTo(Role, { as: 'role', foreignKey: 'id_Role' });
  Role.hasMany(UserRole, { as: 'userRoles', foreignKey: 'id_Role' });
  Token.belongsTo(TokenType, { as: 'tokenType', foreignKey: 'id_TokenType' });
  TokenType.hasMany(Token, { as: 'tokens', foreignKey: 'id_TokenType' });
  Configuration.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(Configuration, { as: 'configurations', foreignKey: 'id_User' });
  Token.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(Token, { as: 'tokens', foreignKey: 'id_User' });
  UserEmail.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(UserEmail, { as: 'userEmails', foreignKey: 'id_User' });
  UserPolice.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(UserPolice, { as: 'userPolice', foreignKey: 'id_User' });
  UserRole.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(UserRole, { as: 'userRoles', foreignKey: 'id_User' });
  ConfigurationValue.belongsTo(Value, { as: 'value', foreignKey: 'id_Value' });
  Value.hasMany(ConfigurationValue, { as: 'configurationValues', foreignKey: 'id_Value' });
  ValuePosteConso.belongsTo(Value, { as: 'value', foreignKey: 'id_Value' });
  Value.hasMany(ValuePosteConso, { as: 'valuePosteConsos', foreignKey: 'id_Value' });
  ValuePosteConso.belongsTo(PosteConso, { as: 'posteConso', foreignKey: 'id_PosteConso' });
  PosteConso.hasMany(ValuePosteConso, { as: 'valuePosteConsos', foreignKey: 'id_PosteConso' });

  return {
    Asset: Asset,
    AssetType: AssetType,
    Configuration: Configuration,
    ConfigurationValue: ConfigurationValue,
    Consommation: Consommation,
    ConsommationPosteConso: ConsommationPosteConso,
    Email: Email,
    HouseModel: HouseModel,
    Mesh: Mesh,
    ModelType: ModelType,
    OptionConf: OptionConf,
    Police: Police,
    PosteConso: PosteConso,
    Role: Role,
    Token: Token,
    TokenType: TokenType,
    User: User,
    UserEmail: UserEmail,
    UserPolice: UserPolice,
    UserRole: UserRole,
    Value: Value,
    ValuePosteConso: ValuePosteConso,
  };
}
