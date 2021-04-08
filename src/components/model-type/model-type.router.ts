import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './model-type.controller';

export const modelTypeRouter = Router();

modelTypeRouter.get('/', findAll);

modelTypeRouter.get('/:id', findOne);

modelTypeRouter.put('/:id', [auth, validateAdminRole], update);

modelTypeRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

modelTypeRouter.delete('/', [auth, validateAdminRole], deleteAll);
