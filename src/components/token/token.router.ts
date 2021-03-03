import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './token.controller';

export const tokenRouter = Router();

tokenRouter.get('/', findAll);

tokenRouter.get('/:id', findOne);

tokenRouter.put('/:id', update);

tokenRouter.delete('/:id', deleteOne);

tokenRouter.delete('/', deleteAll);
