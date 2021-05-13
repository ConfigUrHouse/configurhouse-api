import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './configuration-value.controller';

export const configurationValueRouter = Router();

configurationValueRouter.get('/', findAll);

configurationValueRouter.get('/:idValue-:idConfiguration', findOne);

configurationValueRouter.put('/:idValue-:idConfiguration', [auth, validateAdminRole], update);

configurationValueRouter.delete('/:idValue-:idConfiguration', [auth, validateAdminRole], deleteOne);

configurationValueRouter.delete('/', [auth, validateAdminRole], deleteAll);
