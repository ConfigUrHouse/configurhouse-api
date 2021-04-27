import { NextFunction, Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne, addOne } from './asset.controller';
import multer from 'multer';

export const assetRouter = Router();

assetRouter.get('/', findAll);

assetRouter.get('/:id', findOne);

assetRouter.put('/:id', [auth, validateAdminRole], update);

//assetRouter.delete('/:id', [auth, validateAdminRole], deleteOne);
assetRouter.delete('/:id', deleteOne);
assetRouter.delete('/', [auth, validateAdminRole], deleteAll);

assetRouter.post('/', addOne);
//assetRouter.post('/',[auth, validateAdminRole], addOne);