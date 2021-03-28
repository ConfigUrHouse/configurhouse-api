import { Router } from 'express';
import { findAll, findByUserId, update, deleteAll, deleteOne } from './user-role.controller';

export const userRoleRouter = Router();

userRoleRouter.get('/', findAll);

userRoleRouter.get('/:id', findByUserId);

userRoleRouter.put('/:id', update);

userRoleRouter.delete('/:id', deleteOne);

userRoleRouter.delete('/', deleteAll);
