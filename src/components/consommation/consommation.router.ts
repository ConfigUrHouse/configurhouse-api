import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './consommation.controller';

export const consommationRouter = Router();

consommationRouter.get('/', findAll);

consommationRouter.get('/:id', findOne);

consommationRouter.put('/:id', [auth, validateAdminRole], update);

consommationRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

consommationRouter.delete('/', [auth, validateAdminRole], deleteAll);
