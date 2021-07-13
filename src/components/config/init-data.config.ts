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
    await initModelTypes();
    await initRoles();
    await initUsers();
    await initUserRoles();
    await initPostesConso();
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

async function initModelTypes() {
  if (!(await ModelType.findOne({ where: { name: modelTypeT2Name } }))) {
    await ModelType.create({ name: modelTypeT2Name, description: 'Logement T2' });
  }
  if (!(await ModelType.findOne({ where: { name: modelTypeT3Name } }))) {
    await ModelType.create({ name: modelTypeT3Name, description: 'Logement T3' });
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
