import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './token-type.controller';

export const tokenTypeRouter = Router();

tokenTypeRouter.get('/', findAll);

tokenTypeRouter.get('/:id', findOne);

tokenTypeRouter.put('/:id', [auth, validateAdminRole], update);

tokenTypeRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

tokenTypeRouter.delete('/', [auth, validateAdminRole], deleteAll);
