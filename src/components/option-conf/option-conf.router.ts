import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './option-conf.controller';

export const optionConfRouter = Router();

optionConfRouter.get('/', findAll);

optionConfRouter.get('/:id', findOne);

optionConfRouter.put('/:id', [auth, validateAdminRole], update);

optionConfRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

optionConfRouter.delete('/', [auth, validateAdminRole], deleteAll);
