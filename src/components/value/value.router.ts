import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne, findByOptionId, create } from './value.controller';

export const valueRouter = Router();

valueRouter.get('/', findAll);

valueRouter.get('/:id', findOne);

valueRouter.post('/', [auth, validateAdminRole], create);

valueRouter.put('/:id', [auth, validateAdminRole], update);

valueRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

valueRouter.delete('/', [auth, validateAdminRole], deleteAll);

valueRouter.get('/byOption/:id', findByOptionId);
