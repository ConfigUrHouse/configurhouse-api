import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './poste-conso.controller';

export const posteConsoRouter = Router();

posteConsoRouter.get('/', findAll);

posteConsoRouter.get('/:id', findOne);

posteConsoRouter.put('/:id', [auth, validateAdminRole], update);

posteConsoRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

posteConsoRouter.delete('/', [auth, validateAdminRole], deleteAll);
