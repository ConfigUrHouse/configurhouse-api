import { TokenTypes } from '../token-type/token-type.class';
import { UserRoles } from '../user-role/user-role.class';
import { Asset, AssetType, Configuration, HouseModel, ModelType, TokenType, User, Role } from './init-models.config';

export async function initData() {
  try {
    await initTokenTypes();
    await initAssetTypes();
    await initAssets();
    await initModelTypes();
    await initHouseModels();
    await initConfigurations();
    await initRoles();
  } catch (error) {
    console.error(error);
  }
}

async function initTokenTypes() {
  if (!(await TokenType.findOne({ where: { name: TokenTypes.EmailVerification } }))) {
    await TokenType.create({ name: TokenTypes.EmailVerification });
  }
  if (!(await TokenType.findOne({ where: { name: TokenTypes.PasswordReset } }))) {
    await TokenType.create({ name: TokenTypes.PasswordReset });
  }
}

async function initAssetTypes() {
  if (!(await AssetType.findOne({ where: { name: 'Asset type 1' } }))) {
    await AssetType.create({ name: 'Asset type 1', description: 'Temp asset type 1' });
  }
  if (!(await AssetType.findOne({ where: { name: 'Asset type 2' } }))) {
    await AssetType.create({ name: 'Asset type 2', description: 'Temp asset type 2' });
  }
}

async function initAssets() {
  const type1 = await AssetType.findOne({ where: { name: 'Asset type 1' } });
  if (!(await Asset.findOne({ where: { value: 'Asset 1' } })) && type1) {
    await Asset.create({ value: 'Asset 1', id_AssetType: type1.id });
  }
  const type2 = await AssetType.findOne({ where: { name: 'Asset type 2' } });
  if (!(await Asset.findOne({ where: { value: 'Asset type 2' } })) && type2) {
    await Asset.create({ value: 'Asset 2', id_AssetType: type2.id });
  }
}

async function initModelTypes() {
  if (!(await ModelType.findOne({ where: { name: 'Model type 1' } }))) {
    await ModelType.create({ name: 'Model type 1', description: 'Temp model type 1' });
  }
  if (!(await ModelType.findOne({ where: { name: 'Model type 2' } }))) {
    await ModelType.create({ name: 'Model type 2', description: 'Temp model type 2' });
  }
}

async function initHouseModels() {
  const type1 = await ModelType.findOne({ where: { name: 'Model type 1' } });
  const asset1 = await Asset.findOne({ where: { value: 'Asset 1' } });
  if (!(await HouseModel.findOne({ where: { name: 'House model 1' } })) && type1 && asset1) {
    await HouseModel.create({
      name: 'House model 1',
      id_ModelType: type1.id,
      id_Asset: asset1.id,
      id_Asset_HouseModelAsset3D: asset1.id,
    });
  }

  const type2 = await ModelType.findOne({ where: { name: 'Model type 2' } });
  const asset2 = await Asset.findOne({ where: { value: 'Asset 2' } });
  if (!(await HouseModel.findOne({ where: { name: 'House model 2' } })) && type2 && asset2) {
    await HouseModel.create({
      name: 'House model 2',
      id_ModelType: type2.id,
      id_Asset: asset2.id,
      id_Asset_HouseModelAsset3D: asset2.id,
    });
  }
}

async function initConfigurations() {
  const user = await User.findOne({ where: { id: 1 } });
  const model1 = await HouseModel.findOne({ where: { name: 'House model 1' } });
  if (user && !(await Configuration.findOne({ where: { name: 'Configuration 1', id_User: user.id } })) && model1) {
    Configuration.create({ name: 'Configuration 1', id_User: user.id, id_HouseModel: model1.id });
  }
  const model2 = await HouseModel.findOne({ where: { name: 'House model 2' } });
  if (user && !(await Configuration.findOne({ where: { name: 'Configuration 2', id_User: user.id } })) && model2) {
    Configuration.create({ name: 'Configuration 2', id_User: user.id, id_HouseModel: model2.id });
  }
}

async function initRoles() {
  if (!(await Role.findOne({ where: { name: UserRoles.User } }))) {
    Role.create({ name: UserRoles.User, description: 'Un utilisateur' });
  }
  if (!(await Role.findOne({ where: { name: UserRoles.Collaborator } }))) {
    Role.create({ name: UserRoles.Collaborator, description: 'Un collaborateur' });
  }
  if (!(await Role.findOne({ where: { name: UserRoles.Administrator } }))) {
    Role.create({ name: UserRoles.Administrator, description: 'Un administrateur' });
  }
}
