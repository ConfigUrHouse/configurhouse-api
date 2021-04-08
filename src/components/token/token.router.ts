import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './token.controller';

export const tokenRouter = Router();

tokenRouter.get('/', [auth, validateAdminRole], findAll);

tokenRouter.get('/:id', [auth, validateAdminRole], findOne);

tokenRouter.put('/:id', [auth, validateAdminRole], update);

tokenRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

tokenRouter.delete('/', [auth, validateAdminRole], deleteAll);
