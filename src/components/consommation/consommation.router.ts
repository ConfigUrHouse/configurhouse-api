import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './consommation.controller';

export const consommationRouter = Router();

consommationRouter.get('/', findAll);

consommationRouter.get('/:id', findOne);

consommationRouter.put('/:id', update);

consommationRouter.delete('/:id', deleteOne);

consommationRouter.delete('/', deleteAll);
