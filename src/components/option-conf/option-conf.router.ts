import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './option-conf.controller';

export const optionConfRouter = Router();

optionConfRouter.get("/", findAll);

optionConfRouter.get("/:id", findOne);

optionConfRouter.put("/:id", update);

optionConfRouter.delete("/:id", deleteOne);

optionConfRouter.delete("/", deleteAll);