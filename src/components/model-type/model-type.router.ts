import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './model-type.controller';

export const modelTypeRouter = Router();

modelTypeRouter.get("/", findAll);

modelTypeRouter.get("/:id", findOne);

modelTypeRouter.put("/:id", update);

modelTypeRouter.delete("/:id", deleteOne);

modelTypeRouter.delete("/", deleteAll);