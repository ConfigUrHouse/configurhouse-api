import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './configuration-value.controller';

export const configurationValueRouter = Router();

configurationValueRouter.get("/", findAll);

configurationValueRouter.get("/:id", findOne);

configurationValueRouter.put("/:id", update);

configurationValueRouter.delete("/:id", deleteOne);

configurationValueRouter.delete("/", deleteAll);