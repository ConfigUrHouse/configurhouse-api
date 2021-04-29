import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, create, update, deleteAll, deleteOne } from './house-model.controller';

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
//#endregion
houseModelRouter.get('/', findAll);

//#region GET /houseModel/:id
/**
 * @swagger
 *
 * paths:
 *   /houseModel/[id]:
 *     get:
 *       summary: Retrieve a house model
 *       tags:
 *         - HouseModel
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *           description: ID of the house model
 *       responses:
 *         200:
 *           description: A house model
 *         400:
 *           description: Request error
 *         404:
 *           description: HouseModel not found
 */
//#endregion
houseModelRouter.get('/:id', findOne);

//#region POST /houseModel
/**
 * @swagger
 *
 * paths:
 *   /houseModel:
 *     post:
 *       summary: Create new house model
 *       tags:
 *         - HouseModel
 *       parameters:
 *         - in: body
 *           name: name
 *           schema:
 *             type: string
 *           description: Name of house model
 *         - in: body
 *           name: id_Asset
 *           schema:
 *             type: integer
 *           description: ID of the model asset
 *         - in: body
 *           name: id_ModelType
 *           schema:
 *             type: integer
 *           description: ID of the model type
 *       responses:
 *         201:
 *           description: The created model
 *         400:
 *           description: Invalid request parameters
 */
//#endregion
houseModelRouter.post('/', create);

//#region PUT /houseModel/:id
/**
 * @swagger
 *
 * paths:
 *   /houseModel/[id]:
 *     put:
 *       summary: Update a house model
 *       tags:
 *         - HouseModel
 *       parameters:
 *         - in: body
 *           name: name
 *           schema:
 *             type: string
 *           description: Name of house model
 *         - in: body
 *           name: id_Asset
 *           schema:
 *             type: integer
 *           description: ID of the model asset
 *         - in: body
 *           name: id_ModelType
 *           schema:
 *             type: integer
 *           description: ID of the model type
 *       responses:
 *         200:
 *           description: The updated model
 *         400:
 *           description: Invalid request parameters
 */
//#endregion
houseModelRouter.put('/:id', [auth, validateAdminRole], update);

//#region DELETE /houseModel/:id
/**
 * @swagger
 *
 * paths:
 *   /houseModel:
 *     delete:
 *       summary: Delete a house model
 *       tags:
 *         - HouseModel
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *           description: ID of the house model
 *       responses:
 *         200:
 *           description: A house model
 *         400:
 *           description: Request error
 *         404:
 *           description: HouseModel not found
 */
//#endregion
houseModelRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

houseModelRouter.delete('/', [auth, validateAdminRole], deleteAll);
