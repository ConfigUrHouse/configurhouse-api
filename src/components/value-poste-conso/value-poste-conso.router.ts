import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './value-poste-conso.controller';

export const valuePosteConsoRouter = Router();

valuePosteConsoRouter.get('/', findAll);

valuePosteConsoRouter.get('/:id', findOne);

valuePosteConsoRouter.put('/:id', [auth, validateAdminRole], update);

valuePosteConsoRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

valuePosteConsoRouter.delete('/', [auth, validateAdminRole], deleteAll);
