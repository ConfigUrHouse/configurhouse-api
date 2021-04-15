import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './email.controller';

export const emailRouter = Router();

emailRouter.get('/', findAll);

emailRouter.get('/:id', findOne);

emailRouter.put('/:id', [auth, validateAdminRole], update);

emailRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

emailRouter.delete('/', [auth, validateAdminRole], deleteAll);
