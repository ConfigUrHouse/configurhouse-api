import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './user-police.controller';

export const userPoliceRouter = Router();

userPoliceRouter.get('/', findAll);

userPoliceRouter.get('/:id', findOne);

userPoliceRouter.put('/:id', update);

userPoliceRouter.delete('/:id', deleteOne);

userPoliceRouter.delete('/', deleteAll);
