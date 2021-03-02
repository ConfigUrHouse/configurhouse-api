import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './consommation-poste-conso.controller';

export const consommationPosteConsoRouter = Router();

consommationPosteConsoRouter.get("/", findAll);

consommationPosteConsoRouter.get("/:id", findOne);

consommationPosteConsoRouter.put("/:id", update);

consommationPosteConsoRouter.delete("/:id", deleteOne);

consommationPosteConsoRouter.delete("/", deleteAll);