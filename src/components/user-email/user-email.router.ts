import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './user-email.controller';

export const userEmailRouter = Router();

userEmailRouter.get('/', findAll);

userEmailRouter.get('/:id', findOne);

userEmailRouter.put('/:id', update);

userEmailRouter.delete('/:id', deleteOne);

userEmailRouter.delete('/', deleteAll);
