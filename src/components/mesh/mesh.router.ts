import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './mesh.controller';

export const meshRouter = Router();

meshRouter.get('/', findAll);

meshRouter.get('/:id', findOne);

meshRouter.put('/:id', update);

meshRouter.delete('/:id', deleteOne);

meshRouter.delete('/', deleteAll);
