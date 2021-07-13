import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, create, update, deleteAll, deleteOne, findByHouseModel } from './option-conf.controller';

export const optionConfRouter = Router();

//#region GET /optionConf
/**
 * @swagger
 *
 * paths:
 *   /optionConf:
 *     get:
 *       summary: Retrieve all configuration options
 *       tags:
 *         - OptionConf
 *       parameters:
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           description: Number of configuration options to get for pagination
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: Number of the page to get for pagination
 *       responses:
 *         200:
 *           description: A paginated list of configuration options
 *           schema:
 *             $ref: '#/definitions/PaginatedArrayOfOptionConf'
 *         400:
 *           description: Invalid request parameters
 */
//#endregion
optionConfRouter.get('/', findAll);

//#region GET /optionConf/:id
/**
 * @swagger
 *
 * paths:
 *   /optionConf/[id]:
 *     get:
 *       summary: Retrieve a configuration option
 *       tags:
 *         - OptionConf
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *           description: ID of the configuration option
 *       responses:
 *         200:
 *           description: A configuration option
 *         400:
 *           description: Request error
 *         404:
 *           description: OptionConf not found
 */
//#endregion
optionConfRouter.get('/:id', findOne);

optionConfRouter.get('/by/:id', findByHouseModel);

//#region POST /optionConf
/**
 * @swagger
 *
 * paths:
 *   /optionConf:
 *     post:
 *       summary: Create new configuration option
 *       tags:
 *         - OptionConf
 *       parameters:
 *         - in: body
 *           name: name
 *           schema:
 *             type: string
 *           description: Name of the option
 *         - in: body
 *           name: id_HouseModel
 *           schema:
 *             type: integer
 *           description: ID of the configuration option
 *         - in: body
 *           name: id_Mesh
 *           schema:
 *             type: integer
 *           description: ID of the mesh
 *       responses:
 *         201:
 *           description: The created option
 *         400:
 *           description: Invalid request parameters
 *         500:
 *           description: Server error
 */
//#endregion
optionConfRouter.post('/', [auth, validateAdminRole], create);

//#region PUT /optionConf/:id
/**
 * @swagger
 *
 * paths:
 *   /optionConf/[id]:
 *     post:
 *       summary: Update a configuration option
 *       tags:
 *         - OptionConf
 *       parameters:
 *         - in: body
 *           name: name
 *           schema:
 *             type: string
 *           description: Name of the option
 *         - in: body
 *           name: id_HouseModel
 *           schema:
 *             type: integer
 *           description: ID of the configuration option
 *         - in: body
 *           name: id_Mesh
 *           schema:
 *             type: integer
 *           description: ID of the mesh
 *       responses:
 *         200:
 *           description: The updated option
 *         400:
 *           description: Invalid request parameters
 *         500:
 *           description: Server error
 */
//#endregion
optionConfRouter.put('/:id', [auth, validateAdminRole], update);

//#region DELETE /optionConf/:id
/**
 * @swagger
 *
 * paths:
 *   /optionConf:
 *     delete:
 *       summary: Delete a configuration option
 *       tags:
 *         - OptionConf
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *           description: ID of the configuration option
 *       responses:
 *         200:
 *           description: A configuration option
 *         400:
 *           description: Request error
 *         404:
 *           description: OptionConf not found
 */
//#endregion
optionConfRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

optionConfRouter.delete('/', [auth, validateAdminRole], deleteAll);
