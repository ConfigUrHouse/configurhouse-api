/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { db as mysql } from './components/utils/mysql.config';
import { handleNotFound, handleError } from './middleware/error-handler';
import { specs } from './shared/swagger-specs';
import { WebpackHotModule } from './interface/webpack-hot-module';
import { initModels } from './components/utils/init-models.config';

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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(handleNotFound);
  app.use(handleError);

  /**
   * Database initialization
   */
  initModels(mysql.instance);
  await mysql.instance.sync({ force: true });

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
