import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './user-police.controller';

export const userPoliceRouter = Router();

userPoliceRouter.get('/', [auth, validateAdminRole], findAll);

userPoliceRouter.get('/:id', [auth, validateAdminRole], findOne);

userPoliceRouter.put('/:id', [auth, validateAdminRole], update);

userPoliceRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

userPoliceRouter.delete('/', [auth, validateAdminRole], deleteAll);
