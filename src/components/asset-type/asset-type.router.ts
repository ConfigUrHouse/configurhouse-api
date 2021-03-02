import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './asset-type.controller';

export const assetTypeRouter = Router();

assetTypeRouter.get('/', findAll);

assetTypeRouter.get('/:id', findOne);

assetTypeRouter.put('/:id', update);

assetTypeRouter.delete('/:id', deleteOne);

assetTypeRouter.delete('/', deleteAll);
