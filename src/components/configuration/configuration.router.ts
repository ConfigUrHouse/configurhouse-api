import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './configuration.controller';

export const configurationRouter = Router();

configurationRouter.get('/', findAll);

configurationRouter.get('/:id', findOne);

configurationRouter.put('/:id', update);

configurationRouter.delete('/:id', deleteOne);

configurationRouter.delete('/', deleteAll);
