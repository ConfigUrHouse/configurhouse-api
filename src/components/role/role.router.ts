import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './role.controller';

export const roleRouter = Router();

roleRouter.get('/', findAll);

roleRouter.get('/:id', findOne);

roleRouter.put('/:id', [auth, validateAdminRole], update);

roleRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

roleRouter.delete('/', [auth, validateAdminRole], deleteAll);
