import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './police.controller';

export const policeRouter = Router();

policeRouter.get('/', findAll);

policeRouter.get('/:id', findOne);

policeRouter.put('/:id', [auth, validateAdminRole], update);

policeRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

policeRouter.delete('/', [auth, validateAdminRole], deleteAll);
