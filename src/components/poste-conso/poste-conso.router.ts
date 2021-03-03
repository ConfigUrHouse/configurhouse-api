import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './poste-conso.controller';

export const posteConsoRouter = Router();

posteConsoRouter.get('/', findAll);

posteConsoRouter.get('/:id', findOne);

posteConsoRouter.put('/:id', update);

posteConsoRouter.delete('/:id', deleteOne);

posteConsoRouter.delete('/', deleteAll);
