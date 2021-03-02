import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './email.controller';

export const emailRouter = Router();

emailRouter.get("/", findAll);

emailRouter.get("/:id", findOne);

emailRouter.put("/:id", update);

emailRouter.delete("/:id", deleteOne);

emailRouter.delete("/", deleteAll);