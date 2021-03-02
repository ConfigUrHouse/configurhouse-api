import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './user.controller';

export const userRouter = Router();

userRouter.get('/', findAll);

userRouter.get('/:id', findOne);

userRouter.put('/:id', update);

userRouter.delete('/:id', deleteOne);

userRouter.delete('/', deleteAll);
