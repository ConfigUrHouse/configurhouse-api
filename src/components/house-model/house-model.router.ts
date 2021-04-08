import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './house-model.controller';

export const houseModelRouter = Router();

//#region GET /houseModel
/**
 * @swagger
 *
 * paths:
 *   /houseModel:
 *     get:
 *       summary: Retrieve all house models
 *       tags:
 *         - HouseModel
 *       parameters:
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           description: Number of house models to get for pagination
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: Number of the page to get for pagination
 *       responses:
 *         200:
 *           description: A paginated list of house models
 *           schema:
 *             $ref: '#/definitions/PaginatedArrayOfHouseModels'
 *         400:
 *           description: Invalid request parameters
 */
houseModelRouter.get('/', findAll);
//#endregion

houseModelRouter.get('/:id', findOne);

houseModelRouter.put('/:id', [auth, validateAdminRole], update);

houseModelRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

houseModelRouter.delete('/', [auth, validateAdminRole], deleteAll);
