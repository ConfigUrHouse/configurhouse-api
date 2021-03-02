import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './role.controller';

export const roleRouter = Router();

roleRouter.get("/", findAll);

roleRouter.get("/:id", findOne);

roleRouter.put("/:id", update);

roleRouter.delete("/:id", deleteOne);

roleRouter.delete("/", deleteAll);