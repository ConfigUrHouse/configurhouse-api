import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './police.controller';

export const policeRouter = Router();

policeRouter.get("/", findAll);

policeRouter.get("/:id", findOne);

policeRouter.put("/:id", update);

policeRouter.delete("/:id", deleteOne);

policeRouter.delete("/", deleteAll);