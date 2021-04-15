import { TokenTypes } from '../token-type/token-type.class';
import { UserRole, UserRoles } from '../user-role/user-role.class';
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
    await initUsers();
    await initUserRoles();
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
  if (!(await Asset.findOne({ where: { value: 'Asset 2' } })) && type2) {
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
    });
  }

  const type2 = await ModelType.findOne({ where: { name: 'Model type 2' } });
  const asset2 = await Asset.findOne({ where: { value: 'Asset 2' } });
  if (!(await HouseModel.findOne({ where: { name: 'House model 2' } })) && type2 && asset2) {
    await HouseModel.create({
      name: 'House model 2',
      id_ModelType: type2.id,
      id_Asset: asset2.id,
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

async function initUsers() {
  if (!(await User.findByPk(123))) {
    User.create({
      id: 123,
      firstname: 'Admin',
      lastname: 'ADMIN',
      email: 'admin@configurhouse.com',
      password: '$2a$08$x9sr7mvYceaGKqNWfGTbvueCe/riH1pNgzU/.twRfgCxVTAD8rIWq', // 'password'
      active: 1,
    });
  }
  if (!(await User.findOne({ where: { email: 'marine.khornya@gmail.com' } }))) {
    User.create({
      email: 'marine.khornya@gmail.com',
      firstname: 'Marine',
      lastname: 'MINARD',
      password: '$2a$08$x9sr7mvYceaGKqNWfGTbvueCe/riH1pNgzU/.twRfgCxVTAD8rIWq', // 'password'
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'm.minard@iia-laval.fr' } }))) {
    User.create({
      email: 'm.minard@iia-laval.fr',
      firstname: 'Marine',
      lastname: 'MINARD',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test1@test.com' } }))) {
    User.create({
      email: 'test1@test.com',
      firstname: 'Test1',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test2@test.com' } }))) {
    User.create({
      email: 'test2@test.com',
      firstname: 'Test2',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test3@test.com' } }))) {
    User.create({
      email: 'test3@test.com',
      firstname: 'Test3',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test4@test.com' } }))) {
    User.create({
      email: 'test4@test.com',
      firstname: 'Test4',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test5@test.com' } }))) {
    User.create({
      email: 'test5@test.com',
      firstname: 'Test5',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test6@test.com' } }))) {
    User.create({
      email: 'test6@test.com',
      firstname: 'Test6',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test7@test.com' } }))) {
    User.create({
      email: 'test7@test.com',
      firstname: 'Test7',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test8@test.com' } }))) {
    User.create({
      email: 'test8@test.com',
      firstname: 'Test8',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test9@test.com' } }))) {
    User.create({
      email: 'test9@test.com',
      firstname: 'Test9',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test10@test.com' } }))) {
    User.create({
      email: 'test10@test.com',
      firstname: 'Test10',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
  if (!(await User.findOne({ where: { email: 'test11@test.com' } }))) {
    User.create({
      email: 'test11@test.com',
      firstname: 'Test11',
      lastname: 'Test',
      password: 'password',
      active: 0,
    });
  }
}

async function initUserRoles() {
  const adminRole = await Role.findOne({ where: { name: UserRoles.Administrator } });
  const collabRole = await Role.findOne({ where: { name: UserRoles.Collaborator } });
  const userRole = await Role.findOne({ where: { name: UserRoles.User } });
  if (
    !(await UserRole.findOne({
      where: {
        id: adminRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id: adminRole?.id,
      id_User: 123,
    });
  if (
    !(await UserRole.findOne({
      where: {
        id: collabRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id: collabRole?.id,
      id_User: 123,
    });
  if (
    !(await UserRole.findOne({
      where: {
        id: userRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id: userRole?.id,
      id_User: 123,
    });
}
