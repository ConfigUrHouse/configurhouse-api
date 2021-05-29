import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne, addOne } from './asset.controller';

export const assetRouter = Router();

assetRouter.get('/', findAll);

assetRouter.get('/:id', findOne);

assetRouter.put('/:id', [auth, validateAdminRole], update);

assetRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

assetRouter.delete('/', [auth, validateAdminRole], deleteAll);

assetRouter.post('/', [auth, validateAdminRole], addOne);
