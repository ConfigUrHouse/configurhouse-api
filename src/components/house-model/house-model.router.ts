import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './house-model.controller';

export const houseModelRouter = Router();

houseModelRouter.get('/', findAll);

houseModelRouter.get('/:id', findOne);

houseModelRouter.put('/:id', update);

houseModelRouter.delete('/:id', deleteOne);

houseModelRouter.delete('/', deleteAll);
