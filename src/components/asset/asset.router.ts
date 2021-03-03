import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './asset.controller';

export const assetRouter = Router();

assetRouter.get('/', findAll);

assetRouter.get('/:id', findOne);

assetRouter.put('/:id', update);

assetRouter.delete('/:id', deleteOne);

assetRouter.delete('/', deleteAll);
