import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne, findByAssetId, create } from './mesh.controller';

export const meshRouter = Router();

meshRouter.get('/', findAll);

meshRouter.get('/:id', findOne);

meshRouter.post('/', [auth, validateAdminRole], create);

meshRouter.put('/:id', [auth, validateAdminRole], update);

meshRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

meshRouter.delete('/', [auth, validateAdminRole], deleteAll);

meshRouter.get('/by/:id', findByAssetId);
