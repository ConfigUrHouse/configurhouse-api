/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { db as mysql } from './components/config/mysql.config';
import { handleNotFound, handleError } from './middleware/error-handler';
import { specs } from './shared/swagger-specs';
import { WebpackHotModule } from './interface/webpack-hot-module';
import { initModels } from './components/config/init-models.config';
import path from 'path';
/**
 * Routers import
 */
import { assetRouter } from './components/asset/asset.router';
import { assetTypeRouter } from './components/asset-type/asset-type.router';
import { configurationRouter } from './components/configuration/configuration.router';
import { configurationValueRouter } from './components/configuration-value/configuration-value.router';
import { emailRouter } from './components/email/email.router';
import { houseModelRouter } from './components/house-model/house-model.router';
import { meshRouter } from './components/mesh/mesh.router';
import { modelTypeRouter } from './components/model-type/model-type.router';
import { optionConfRouter } from './components/option-conf/option-conf.router';
import { policeRouter } from './components/police/police.router';
import { posteConsoRouter } from './components/poste-conso/poste-conso.router';
import { roleRouter } from './components/role/role.router';
import { tokenRouter } from './components/token/token.router';
import { tokenTypeRouter } from './components/token-type/token-type.router';
import { userRouter } from './components/user/user.router';
import { userEmailRouter } from './components/user-email/user-email.router';
import { userPoliceRouter } from './components/user-police/user-police.router';
import { userRoleRouter } from './components/user-role/user-role.router';
import { valueRouter } from './components/value/value.router';
import { utilsRouter } from './components/utils/utils.router';
import { initData } from './components/config/init-data.config';

declare const module: WebpackHotModule;

(async () => {
  /**
   * Permit to use .env file and env variable
   */
  dotenv.config();

  /**
   * Initialize server
   */
  const app = express();

  /**
   * Request handling midlewares
   */
  app.use(helmet());
  app.use((req, res, next) => {
    next();
  }, cors());
  app.use(express.json());
  app.use('/public', express.static('public'));

  app.use('/asset', assetRouter);
  app.use('/assetType', assetTypeRouter);
  app.use('/configuration', configurationRouter);
  app.use('/configurationValue', configurationValueRouter);
  app.use('/email', emailRouter);
  app.use('/houseModel', houseModelRouter);
  app.use('/mesh', meshRouter);
  app.use('/modelType', modelTypeRouter);
  app.use('/optionConf', optionConfRouter);
  app.use('/police', policeRouter);
  app.use('/posteConso', posteConsoRouter);
  app.use('/role', roleRouter);
  app.use('/token', tokenRouter);
  app.use('/tokenType', tokenTypeRouter);
  app.use('/user', userRouter);
  app.use('/userEmail', userEmailRouter);
  app.use('/userPolice', userPoliceRouter);
  app.use('/userRole', userRoleRouter);
  app.use('/value', valueRouter);
  app.use('/utils', utilsRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(handleNotFound);
  app.use(handleError);

  /**
   * View engine
   */
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

  /**
   * Database initialization
   */
  initModels(mysql.instance);

  await mysql.instance.sync();
  // Réinitialiser la BDD avec force
  // await mysql.instance.sync({ force: true });

  await initData();

  /**
   * Port gestion
   */
  if (!process.env.PORT) {
    process.exit(1);
  }
  const PORT: number = parseInt(process.env.PORT as string, 10);

  /**
   * Server gestion
   */
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  /**
   * Hot reloading
   */
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
})();
