import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole, validateCollaboratorRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './user-email.controller';

export const userEmailRouter = Router();

userEmailRouter.get('/', [auth, validateCollaboratorRole], findAll);

userEmailRouter.get('/:id', [auth, validateCollaboratorRole], findOne);

userEmailRouter.put('/:id', [auth, validateAdminRole], update);

userEmailRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

userEmailRouter.delete('/', [auth, validateAdminRole], deleteAll);
