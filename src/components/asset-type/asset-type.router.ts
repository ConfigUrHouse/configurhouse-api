import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './asset-type.controller';

export const assetTypeRouter = Router();

assetTypeRouter.get('/', findAll);

assetTypeRouter.get('/:id', findOne);

assetTypeRouter.put('/:id', [auth, validateAdminRole], update);

assetTypeRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

assetTypeRouter.delete('/', [auth, validateAdminRole], deleteAll);
