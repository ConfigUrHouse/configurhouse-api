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
houseModelRouter.get('/', findAll);
//#endregion

//#region GET /houseModel/:id
/**
 * @swagger
 *
 * paths:
 *   /houseModel:
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
houseModelRouter.get('/:id', findOne);
//#endregion

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
houseModelRouter.post('/', create);
//#endregion

//#region PUT /houseModel/:id
/**
 * @swagger
 *
 * paths:
 *   /houseModel:
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
houseModelRouter.put('/:id', [auth, validateAdminRole], update);
//#endregion

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
houseModelRouter.delete('/:id', [auth, validateAdminRole], deleteOne);
//#endregion

houseModelRouter.delete('/', [auth, validateAdminRole], deleteAll);
