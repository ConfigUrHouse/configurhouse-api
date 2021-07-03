import { UserRoles } from '../user-role/user-role.class';
import { TokenTypes } from '../token-type/token-type.class';
import {
  Asset,
  AssetType,
  Configuration,
  HouseModel,
  ModelType,
  TokenType,
  User,
  Role,
  ConfigurationValue,
  Value,
  OptionConf,
  PosteConso,
  Mesh,
  UserRole,
  Consommation,
  ConsommationHouseModelPosteConso,
  Police,
} from './init-models.config';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';

export async function initData() {
  try {
    await initTokenTypes();
    await initAssetTypes();
    await initAssets();
    await initModelTypes();
    await initHouseModels();
    await initRoles();
    await initUsers();
    await initUserRoles();
    await initMeshs();
    await initOptionConfs();
    await initValues();
    await initConfigurations();
    await initPostesConso();
    await initValuePosteConsos();
    await initConsommations();
    await initConsommationHouseModelPosteConsos();
    await initPolicies();
  } catch (error) {
    console.log(error);
  }
}

const houseModelT2Name = 'T2';
const houseModelT3Name = 'T3';
const modelTypeT2Name = 'Modèle T2';
const modelTypeT3Name = 'Modèle T3';
const configurationT2Name = 'Configuration T2';
const configurationT3Name = 'Configuration T3';
const userTestEmail = 'barack.afritt@configurhouse.com';

async function initTokenTypes() {
  if (!(await TokenType.findOne({ where: { name: TokenTypes.EmailVerification } }))) {
    await TokenType.create({ name: TokenTypes.EmailVerification });
  }
  if (!(await TokenType.findOne({ where: { name: TokenTypes.PasswordReset } }))) {
    await TokenType.create({ name: TokenTypes.PasswordReset });
  }
}

async function initAssetTypes() {
  if (!(await AssetType.findOne({ where: { name: 'Model' } }))) {
    await AssetType.create({ name: 'Model', description: '3d house model' });
  }
}

async function initAssets() {
  const type1 = await AssetType.findOne({ where: { name: 'Model' } });
  if (!(await Asset.findOne({ where: { value: 'Asset 1' } })) && type1) {
    await Asset.create({ value: 'Asset 1', id_AssetType: type1.id });
  }
  const type2 = await AssetType.findOne({ where: { name: 'Model' } });
  if (!(await Asset.findOne({ where: { value: 'Asset 2' } })) && type2) {
    await Asset.create({ value: 'Asset 2', id_AssetType: type2.id });
  }
}

async function initModelTypes() {
  if (!(await ModelType.findOne({ where: { name: modelTypeT2Name } }))) {
    await ModelType.create({ name: modelTypeT2Name, description: 'Logement T2' });
  }
  if (!(await ModelType.findOne({ where: { name: modelTypeT3Name } }))) {
    await ModelType.create({ name: modelTypeT3Name, description: 'Logement T3' });
  }
}

async function initHouseModels() {
  const type1 = await ModelType.findOne({ where: { name: modelTypeT2Name } });
  const asset1 = await Asset.findOne({ where: { value: 'Asset 1' } });
  if (!(await HouseModel.findOne({ where: { name: houseModelT2Name } })) && type1 && asset1) {
    await HouseModel.create({
      name: houseModelT2Name,
      occupants: 2,
      id_ModelType: type1.id,
      id_Asset: asset1.id,
      price: 150000,
    });
  }

  const type2 = await ModelType.findOne({ where: { name: modelTypeT3Name } });
  const asset2 = await Asset.findOne({ where: { value: 'Asset 2' } });
  if (!(await HouseModel.findOne({ where: { name: houseModelT3Name } })) && type2 && asset2) {
    await HouseModel.create({
      name: houseModelT3Name,
      occupants: 3,
      id_ModelType: type2.id,
      id_Asset: asset2.id,
      price: 215000,
    });
  }
}

async function initConfigurations() {
  const user = await User.findOne({ where: { id: 1 } });
  const model1 = await HouseModel.findOne({ where: { name: houseModelT2Name } });
  if (user && !(await Configuration.findOne({ where: { name: configurationT2Name, id_User: user.id } })) && model1) {
    await Configuration.create({ name: configurationT2Name, id_User: user.id, id_HouseModel: model1.id });
  }
  const model2 = await HouseModel.findOne({ where: { name: houseModelT3Name } });
  if (user && !(await Configuration.findOne({ where: { name: configurationT3Name, id_User: user.id } })) && model2) {
    await Configuration.create({ name: configurationT3Name, id_User: user.id, id_HouseModel: model2.id });
  }
  const user2 = await User.findOne({ where: { email: userTestEmail } });
  if (user2 && model1) {
    const config = await Configuration.findOne({ where: { name: configurationT2Name, id_User: user2.id } });
    const valuePAC = await Value.findOne({ where: { name: 'Pompe à chaleur' } });
    if (
      valuePAC &&
      config &&
      !(await ConfigurationValue.findOne({ where: { id_Value: valuePAC.id, id_Configuration: config.id } }))
    ) {
      await ConfigurationValue.create({
        id_Value: valuePAC.id,
        id_Configuration: config.id,
      });
    }
    const valueBois = await Value.findOne({ where: { name: 'Bois' } });
    if (
      valueBois &&
      config &&
      !(await ConfigurationValue.findOne({ where: { id_Value: valueBois.id, id_Configuration: config.id } }))
    ) {
      await ConfigurationValue.create({
        id_Value: valueBois.id,
        id_Configuration: config.id,
      });
    }
  }
}

async function initValues() {
  const asset1 = await Asset.findOne({ where: { value: 'Asset 1' } });
  const asset2 = await Asset.findOne({ where: { value: 'Asset 2' } });
  const model = await HouseModel.findOne({ where: { name: houseModelT2Name } });
  const optionConfChauffage = await OptionConf.findOne({
    where: { name: 'Système de chauffage', id_HouseModel: model?.id },
  });
  const optionConfCharpente = await OptionConf.findOne({ where: { name: 'Charpente', id_HouseModel: model?.id } });
  if (!(await Value.findOne({ where: { name: 'Flame' } })) && asset1 && optionConfChauffage) {
    await Value.create({
      name: 'Flame',
      value: '#D36135',
      price: 1022,
      id_OptionConf: optionConfChauffage.id,
      is_default: 1,
    });
  }
  if (!(await Value.findOne({ where: { name: 'Radiateurs électriques' } })) && asset1 && optionConfChauffage) {
    await Value.create({
      name: 'Chestnut',
      value: '#A24936',
      price: 1042,
      id_OptionConf: optionConfChauffage.id,
      is_default: 0,
    });
  }
  if (!(await Value.findOne({ where: { name: 'Green Sheen' } })) && asset2 && optionConfCharpente) {
    await Value.create({
      name: 'Green Sheen',
      value: '#83BCA9',
      price: 1032,
      id_OptionConf: optionConfCharpente.id,
      is_default: 1,
    });
  }
  if (!(await Value.findOne({ where: { name: 'Prussion Blue' } })) && asset2 && optionConfCharpente) {
    await Value.create({
      name: 'Prussion Blue',
      value: '#003459',
      price: 902,
      id_OptionConf: optionConfCharpente.id,
      is_default: 0,
    });
  }
}

async function initValuePosteConsos() {
  const posteConsoChauffage = await PosteConso.findOne({ where: { name: 'Chauffage' } });
  const posteConsoEau = await PosteConso.findOne({ where: { name: 'Eau chaude' } });
  const valuePAC = await Value.findOne({ where: { name: 'Pompe à chaleur' } });
  const valueBois = await Value.findOne({ where: { name: 'Bois' } });
  if (
    valuePAC &&
    posteConsoChauffage &&
    !(await ValuePosteConso.findOne({ where: { id_Value: valuePAC.id, id_PosteConso: posteConsoChauffage.id } }))
  ) {
    ValuePosteConso.create({
      id_Value: valuePAC.id,
      id_PosteConso: posteConsoChauffage.id,
      conso: 80,
    });
  }
  if (
    valuePAC &&
    posteConsoEau &&
    !(await ValuePosteConso.findOne({ where: { id_Value: valuePAC.id, id_PosteConso: posteConsoEau.id } }))
  ) {
    ValuePosteConso.create({
      id_Value: valuePAC.id,
      id_PosteConso: posteConsoEau.id,
      conso: 90,
    });
  }
  if (
    valueBois &&
    posteConsoChauffage &&
    !(await ValuePosteConso.findOne({ where: { id_Value: valueBois.id, id_PosteConso: posteConsoChauffage.id } }))
  ) {
    ValuePosteConso.create({
      id_Value: valueBois.id,
      id_PosteConso: posteConsoChauffage.id,
      conso: 150,
    });
  }
}

async function initPostesConso() {
  if (!(await PosteConso.findOne({ where: { name: 'Chauffage' } }))) {
    await PosteConso.create({
      name: 'Chauffage',
      description: 'Energie consommée par les équipements de chauffage',
    });
  }
  if (!(await PosteConso.findOne({ where: { name: 'Eau chaude' } }))) {
    await PosteConso.create({
      name: 'Eau chaude',
      description: "Energie consommée pour la production d'eau chaude",
    });
  }
  if (!(await PosteConso.findOne({ where: { name: 'Eclairage' } }))) {
    await PosteConso.create({
      name: 'Eclairage',
      description: "Energie consommée pour l'éclairage",
    });
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
  if (!(await User.findOne({ where: { email: userTestEmail } }))) {
    await User.create({
      firstname: 'Barack',
      lastname: 'AFRITT',
      email: userTestEmail,
      password: '$2a$08$x9sr7mvYceaGKqNWfGTbvueCe/riH1pNgzU/.twRfgCxVTAD8rIWq', // 'password'
      active: 1,
    });
  }
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
        id_Role: adminRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id_Role: adminRole?.id,
      id_User: 123,
    });
  if (
    !(await UserRole.findOne({
      where: {
        id_Role: collabRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id_Role: collabRole?.id,
      id_User: 123,
    });
  if (
    !(await UserRole.findOne({
      where: {
        id_Role: userRole?.id,
        id_User: 123,
      },
    }))
  )
    UserRole.create({
      id_Role: userRole?.id,
      id_User: 123,
    });
}

async function initMeshs() {
  const asset1 = await Asset.findOne({ where: { value: 'Asset 1' } });
  if (!(await Mesh.findOne({ where: { name: 'Mesh Chauffage' } })) && asset1) {
    await Mesh.create({
      name: 'Mesh Chauffage',
      same: false,
      id_Asset: asset1.id,
    });
  }

  const asset2 = await Asset.findOne({ where: { value: 'Asset 2' } });
  if (!(await Mesh.findOne({ where: { name: 'Mesh Charpente' } })) && asset2) {
    await Mesh.create({
      name: 'Mesh Charpente',
      same: false,
      id_Asset: asset2.id,
    });
  }
}

async function initOptionConfs() {
  const mesh1 = await Mesh.findOne({ where: { name: 'Mesh Chauffage' } });
  const mesh2 = await Mesh.findOne({ where: { name: 'Mesh Charpente' } });
  const model1 = await HouseModel.findOne({ where: { name: houseModelT2Name } });
  if (
    model1 &&
    mesh1 &&
    !(await OptionConf.findOne({ where: { name: 'Système de chauffage', id_HouseModel: model1.id } }))
  ) {
    await OptionConf.create({ name: 'Système de chauffage', id_HouseModel: model1.id, id_Mesh: mesh1.id });
  }

  if (model1 && mesh2 && !(await OptionConf.findOne({ where: { name: 'Charpente', id_HouseModel: model1.id } }))) {
    await OptionConf.create({ name: 'Charpente', id_HouseModel: model1.id, id_Mesh: mesh2.id });
  }

  const model2 = await HouseModel.findOne({ where: { name: houseModelT3Name } });
  if (model2 && mesh2 && !(await OptionConf.findOne({ where: { name: 'Charpente', id_HouseModel: model2.id } }))) {
    await OptionConf.create({ name: 'Charpente', id_HouseModel: model2.id, id_Mesh: mesh2.id });
  }
}

async function initConsommations() {
  if (!(await Consommation.findOne({ where: { name: 'Ampoules' } })))
    Consommation.create({
      name: 'Ampoules',
      conso: 200,
      is_reference: 0,
    });
  if (!(await Consommation.findOne({ where: { name: 'Chauffage référence 2 personnes 30m²' } }))) {
    Consommation.create({
      name: 'Chauffage référence 2 personnes 30m²',
      conso: 4092,
      is_reference: 1,
    });
  }
  if (!(await Consommation.findOne({ where: { name: 'Eau chaude référence 2 personnes 30m²' } }))) {
    Consommation.create({
      name: 'Eau chaude référence 2 personnes 30m²',
      conso: 462,
      is_reference: 1,
    });
  }
  if (!(await Consommation.findOne({ where: { name: 'Eclairage référence 2 personnes 30m²' } }))) {
    Consommation.create({
      name: 'Eclairage référence 2 personnes 30m²',
      conso: 100,
      is_reference: 1,
    });
  }
}

async function initConsommationHouseModelPosteConsos() {
  const model1 = await HouseModel.findOne({ where: { name: houseModelT2Name } });
  const consoBaseAmpoules = await Consommation.findOne({ where: { name: 'Ampoules' } });
  const consoRefChauffage = await Consommation.findOne({ where: { name: 'Chauffage référence 2 personnes 30m²' } });
  const consoRefEauChaude = await Consommation.findOne({ where: { name: 'Eau chaude référence 2 personnes 30m²' } });
  const consoRefEclairage = await Consommation.findOne({ where: { name: 'Eclairage référence 2 personnes 30m²' } });
  const posteConsoEclairage = await PosteConso.findOne({ where: { name: 'Eclairage' } });
  const posteConsoChauffage = await PosteConso.findOne({ where: { name: 'Chauffage' } });
  const posteConsoEauChaude = await PosteConso.findOne({ where: { name: 'Eau chaude' } });
  if (
    model1 &&
    consoBaseAmpoules &&
    posteConsoEclairage &&
    !(await ConsommationHouseModelPosteConso.findOne({
      where: { id_Consommation: consoBaseAmpoules.id, id_HouseModel: model1.id, id_PosteConso: posteConsoEclairage.id },
    }))
  )
    ConsommationHouseModelPosteConso.create({
      id_Consommation: consoBaseAmpoules.id,
      id_HouseModel: model1.id,
      id_PosteConso: posteConsoEclairage.id,
    });
  if (
    model1 &&
    posteConsoChauffage &&
    consoRefChauffage &&
    !(await ConsommationHouseModelPosteConso.findOne({
      where: { id_HouseModel: model1.id, id_PosteConso: posteConsoChauffage.id, id_Consommation: consoRefChauffage.id },
    }))
  ) {
    ConsommationHouseModelPosteConso.create({
      id_HouseModel: model1.id,
      id_PosteConso: posteConsoChauffage.id,
      id_Consommation: consoRefChauffage.id,
    });
  }

  if (
    model1 &&
    posteConsoEauChaude &&
    consoRefEauChaude &&
    !(await ConsommationHouseModelPosteConso.findOne({
      where: { id_HouseModel: model1.id, id_PosteConso: posteConsoEauChaude.id, id_Consommation: consoRefEauChaude.id },
    }))
  ) {
    ConsommationHouseModelPosteConso.create({
      id_HouseModel: model1.id,
      id_PosteConso: posteConsoEauChaude.id,
      id_Consommation: consoRefEauChaude.id,
    });
  }

  if (
    model1 &&
    posteConsoEclairage &&
    consoRefEclairage &&
    !(await ConsommationHouseModelPosteConso.findOne({
      where: { id_HouseModel: model1.id, id_PosteConso: posteConsoEclairage.id, id_Consommation: consoRefEclairage.id },
    }))
  ) {
    ConsommationHouseModelPosteConso.create({
      id_HouseModel: model1.id,
      id_PosteConso: posteConsoEclairage.id,
      id_Consommation: consoRefEclairage.id,
    });
  }
}

async function initPolicies() {
  const collectIntern = await Police.findOne({ where: { name: 'collectIntern' } });
  const sharePartner = await Police.findOne({ where: { name: 'sharePartner' } });
  const mailPartner = await Police.findOne({ where: { name: 'mailPartner' } });

  if (!collectIntern) {
    Police.create({
      name: 'collectIntern',
      description:
        "J'autorise la société Deschamps à collecter et utiliser les données personnelles récoltées sur l'application.",
    });
  }
  if (!sharePartner) {
    Police.create({
      name: 'sharePartner',
      description:
        "J'autorise la société Deschamps à collecter et partager à ses partenaires les données personnelles récoltées sur l'application.",
    });
  }
  if (!mailPartner) {
    Police.create({
      name: 'mailPartner',
      description:
        "J'autorise la société Deschamps à partager mes données personnelles afin d'être recontacté par d'éventuels partenaires.",
    });
  }
}
