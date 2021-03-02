import { Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './user-role.controller';

export const userRoleRouter = Router();

userRoleRouter.get("/", findAll);

userRoleRouter.get("/:id", findOne);

userRoleRouter.put("/:id", update);

userRoleRouter.delete("/:id", deleteOne);

userRoleRouter.delete("/", deleteAll);