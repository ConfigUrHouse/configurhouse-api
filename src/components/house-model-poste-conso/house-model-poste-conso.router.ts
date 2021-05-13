import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './house-model-poste-conso.controller';

export const houseModelPosteConsoRouter = Router();

houseModelPosteConsoRouter.get('/', findAll);

houseModelPosteConsoRouter.get('/:idHouseModel-:idPosteConso', findOne);

houseModelPosteConsoRouter.put('/:idHouseModel-:idPosteConso', [auth, validateAdminRole], update);

houseModelPosteConsoRouter.delete('/:idHouseModel-:idPosteConso', [auth, validateAdminRole], deleteOne);

houseModelPosteConsoRouter.delete('/', [auth, validateAdminRole], deleteAll);
