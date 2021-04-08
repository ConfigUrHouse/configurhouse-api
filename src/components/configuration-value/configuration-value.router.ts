import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './configuration-value.controller';

export const configurationValueRouter = Router();

configurationValueRouter.get('/', findAll);

configurationValueRouter.get('/:id', findOne);

configurationValueRouter.put('/:id', [auth, validateAdminRole], update);

configurationValueRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

configurationValueRouter.delete('/', [auth, validateAdminRole], deleteAll);
