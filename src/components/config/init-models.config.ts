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

  Configuration.belongsToMany(Value, {
    as: 'id_Values',
    through: ConfigurationValue as typeof Model,
    foreignKey: 'id_Configuration',
    otherKey: 'id',
  });
  Consommation.belongsToMany(PosteConso, {
    as: 'id_PosteConso_PosteConsos',
    through: ConsommationPosteConso as typeof Model,
    foreignKey: 'id',
    otherKey: 'id_PosteConso',
  });
  Email.belongsToMany(User, {
    as: 'id_Users',
    through: UserEmail as typeof Model,
    foreignKey: 'id_Email',
    otherKey: 'id',
  });
  Police.belongsToMany(User, {
    as: 'id_User_Users',
    through: UserPolice as typeof Model,
    foreignKey: 'id',
    otherKey: 'id_User',
  });
  PosteConso.belongsToMany(Consommation, {
    as: 'id_Consommations',
    through: ConsommationPosteConso as typeof Model,
    foreignKey: 'id_PosteConso',
    otherKey: 'id',
  });
  Role.belongsToMany(User, {
    as: 'id_User_Users',
    through: UserRole as typeof Model,
    foreignKey: 'id',
    otherKey: 'id_User',
  });
  User.belongsToMany(Email, {
    as: 'id_Email_Emails',
    through: UserEmail as typeof Model,
    foreignKey: 'id',
    otherKey: 'id_Email',
  });
  User.belongsToMany(Police, {
    as: 'id_Police',
    through: UserPolice as typeof Model,
    foreignKey: 'id_User',
    otherKey: 'id',
  });
  User.belongsToMany(Role, {
    as: 'id_Roles',
    through: UserRole as typeof Model,
    foreignKey: 'id_User',
    otherKey: 'id',
  });
  Value.belongsToMany(Configuration, {
    as: 'id_Configuration_Configurations',
    through: ConfigurationValue as typeof Model,
    foreignKey: 'id',
    otherKey: 'id_Configuration',
  });
  HouseModel.belongsTo(Asset, { as: 'asset', foreignKey: 'id_Asset' });
  Asset.hasMany(HouseModel, { as: 'HouseModels', foreignKey: 'id_Asset' });
  Mesh.belongsTo(Asset, { as: 'id_Asset_Asset', foreignKey: 'id_Asset' });
  Asset.hasMany(Mesh, { as: 'Meshes', foreignKey: 'id_Asset' });
  Value.belongsTo(Asset, { as: 'id_Asset_Asset', foreignKey: 'id_Asset' });
  Asset.hasMany(Value, { as: 'Values', foreignKey: 'id_Asset' });
  Value.belongsTo(Asset, { as: 'id_Asset_AssetValue3D_Asset', foreignKey: 'id_Asset_AssetValue3D' });
  Asset.hasMany(Value, { as: 'id_Asset_AssetValue3D_Values', foreignKey: 'id_Asset_AssetValue3D' });
  Asset.belongsTo(AssetType, { as: 'id_AssetType_AssetType', foreignKey: 'id_AssetType' });
  AssetType.hasMany(Asset, { as: 'Assets', foreignKey: 'id_AssetType' });
  ConfigurationValue.belongsTo(Configuration, { as: 'id_Configuration_Configuration', foreignKey: 'id_Configuration' });
  Configuration.hasMany(ConfigurationValue, { as: 'ConfigurationValues', foreignKey: 'id_Configuration' });
  ConsommationPosteConso.belongsTo(Consommation, { as: 'id_Consommation', foreignKey: 'id' });
  Consommation.hasMany(ConsommationPosteConso, { as: 'ConsommationPosteConsos', foreignKey: 'id' });
  UserEmail.belongsTo(Email, { as: 'id_Email_Email', foreignKey: 'id_Email' });
  Email.hasMany(UserEmail, { as: 'UserEmails', foreignKey: 'id_Email' });
  Configuration.belongsTo(HouseModel, { as: 'houseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(Configuration, { as: 'Configurations', foreignKey: 'id_HouseModel' });
  Consommation.belongsTo(HouseModel, { as: 'id_HouseModel_HouseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(Consommation, { as: 'Consommations', foreignKey: 'id_HouseModel' });
  OptionConf.belongsTo(HouseModel, { as: 'houseModel', foreignKey: 'id_HouseModel' });
  HouseModel.hasMany(OptionConf, { as: 'OptionConfs', foreignKey: 'id_HouseModel' });
  OptionConf.belongsTo(Mesh, { as: 'mesh', foreignKey: 'id_Mesh' });
  Mesh.hasMany(OptionConf, { as: 'OptionConfs', foreignKey: 'id_Mesh' });
  HouseModel.belongsTo(ModelType, { as: 'modelType', foreignKey: 'id_ModelType' });
  ModelType.hasMany(HouseModel, { as: 'HouseModels', foreignKey: 'id_ModelType' });
  Value.belongsTo(OptionConf, { as: 'id_OptionConf_OptionConf', foreignKey: 'id_OptionConf' });
  OptionConf.hasMany(Value, { as: 'Values', foreignKey: 'id_OptionConf' });
  UserPolice.belongsTo(Police, { as: 'id_Polouse', foreignKey: 'id' });
  Police.hasMany(UserPolice, { as: 'UserPolice', foreignKey: 'id' });
  ConsommationPosteConso.belongsTo(PosteConso, { as: 'id_PosteConso_PosteConso', foreignKey: 'id_PosteConso' });
  PosteConso.hasMany(ConsommationPosteConso, { as: 'ConsommationPosteConsos', foreignKey: 'id_PosteConso' });
  UserRole.belongsTo(Role, { as: 'id_Role', foreignKey: 'id' });
  Role.hasMany(UserRole, { as: 'UserRoles', foreignKey: 'id' });
  Token.belongsTo(TokenType, { as: 'id_TokenType_TokenType', foreignKey: 'id_TokenType' });
  TokenType.hasMany(Token, { as: 'Tokens', foreignKey: 'id_TokenType' });
  Configuration.belongsTo(User, { as: 'user', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(Configuration, { as: 'Configurations', foreignKey: 'id_User' });
  Token.belongsTo(User, { as: 'id_User_User', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(Token, { as: 'Tokens', foreignKey: 'id_User' });
  UserEmail.belongsTo(User, { as: 'id_User', foreignKey: 'id', onDelete: 'cascade' });
  User.hasMany(UserEmail, { as: 'UserEmails', foreignKey: 'id' });
  UserPolice.belongsTo(User, { as: 'id_User_User', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(UserPolice, { as: 'UserPolice', foreignKey: 'id_User' });
  UserRole.belongsTo(User, { as: 'id_User_User', foreignKey: 'id_User', onDelete: 'cascade' });
  User.hasMany(UserRole, { as: 'UserRoles', foreignKey: 'id_User' });
  ConfigurationValue.belongsTo(Value, { as: 'id_Value', foreignKey: 'id' });
  Value.hasMany(ConfigurationValue, { as: 'ConfigurationValues', foreignKey: 'id' });

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
  };
}
