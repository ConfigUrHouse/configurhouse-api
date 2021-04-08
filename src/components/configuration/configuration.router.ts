import { Router } from 'express';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';
import { findAll, findOne, update, deleteAll, deleteOne } from './configuration.controller';

/**
 * @swagger
 *
 * definitions:
 *   Configuration:
 *     type: object
 *     required:
 *       - name
 *       - id_HouseModel
 *       - id_User
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       id_HouseModel:
 *         type: integer
 *         required: true
 *       id_User:
 *         type: integer
 *         required: false
 */

export const configurationRouter = Router();

// TODO : Use auth for configurations
//configurationRouter.use(auth);

//#region GET /configuration
/**
 * @swagger
 *
 * paths:
 *   /configuration:
 *     get:
 *       summary: Retrieve all configurations
 *       tags:
 *         - Configuration
 *       parameters:
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *           description: Name of the configuration to get
 *         - in: query
 *           name: id_HouseModel
 *           schema:
 *             type: integer
 *           description: Id of the house model to get
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           description: Number of configurations to get for pagination
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: Number of the page to get for pagination
 *       responses:
 *         200:
 *           description: A paginated list of configurations
 *           schema:
 *             $ref: '#/definitions/PaginatedArrayOfConfigurations'
 *         400:
 *           description: Invalid request parameters
 */
configurationRouter.get('/', findAll);
//#endregion

configurationRouter.get('/:id', findOne);

configurationRouter.put('/:id', [auth, validateAdminRole], update);

configurationRouter.delete('/:id', [auth, validateAdminRole], deleteOne);

configurationRouter.delete('/', [auth, validateAdminRole], deleteAll);
