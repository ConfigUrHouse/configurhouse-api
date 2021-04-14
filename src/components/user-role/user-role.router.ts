import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findByUserId, update, deleteAll, deleteOne } from './user-role.controller';

export const userRoleRouter = Router();

userRoleRouter.get('/', [auth, validateAdminRole], findAll);

userRoleRouter.get('/:id', [auth, validateAdminRole], findByUserId);

userRoleRouter.put('/:id', [auth, validateAdminRole], update);

userRoleRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

userRoleRouter.delete('/', [auth, validateAdminRole], deleteAll);
