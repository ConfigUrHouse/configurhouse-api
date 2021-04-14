import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './consommation-poste-conso.controller';

export const consommationPosteConsoRouter = Router();

consommationPosteConsoRouter.get('/', findAll);

consommationPosteConsoRouter.get('/:id', findOne);

consommationPosteConsoRouter.put('/:id', [auth, validateAdminRole], update);

consommationPosteConsoRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

consommationPosteConsoRouter.delete('/', [auth, validateAdminRole], deleteAll);
