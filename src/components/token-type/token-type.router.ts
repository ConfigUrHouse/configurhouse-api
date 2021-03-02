import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './token-type.controller';

export const tokenTypeRouter = Router();

tokenTypeRouter.get("/", findAll);

tokenTypeRouter.get("/:id", findOne);

tokenTypeRouter.put("/:id", update);

tokenTypeRouter.delete("/:id", deleteOne);

tokenTypeRouter.delete("/", deleteAll);