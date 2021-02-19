/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { db as mysql } from './config/mysql.config';
import { usersRouter } from './models/users/users.router';
import { handleNotFound, handleError } from './middleware/error-handler';
import morgan from 'morgan';
import { specs } from './shared/swagger-specs';
import { WebpackHotModule } from './shared/webpack-hot-module';

declare const module: WebpackHotModule;

(async () => {
  dotenv.config();

  if (!process.env.PORT) {
    process.exit(1);
  }

  const PORT: number = parseInt(process.env.PORT as string, 10);
  const app = express();


  app.use(helmet());
  app.use((req, res, next) => {
    next();
  }, cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(handleNotFound);
  app.use(handleError);
  app.use(morgan('dev'));

  await mysql.instance.sync({ force: true });

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
})();
