import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './value.controller';

export const valueRouter = Router();

valueRouter.get("/", findAll);

valueRouter.get("/:id", findOne);

valueRouter.put("/:id", update);

valueRouter.delete("/:id", deleteOne);

valueRouter.delete("/", deleteAll);