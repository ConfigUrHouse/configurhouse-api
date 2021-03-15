import { Router } from 'express';
import auth from '../../middleware/auth';
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

configurationRouter.use(auth);

//#region GET /configuration
/**
 * @swagger
 * paths:
 *   /configuration:
 *     post:
 *       summary: Get all configurations
 *       tags:
 *         - Configuration
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           required: false
 *           description: page number to get
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           required: false
 *           description: number of items to get per page
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *           required: false
 *           description: name to filter by
 *         - in: query
 *           name: id_HouseModel
 *           schema:
 *             type: integer
 *             minimum: 1
 *           required: false
 *           description: house model id to filter by
 *         - in: query
 *           name: id_User
 *           schema:
 *             type: integer
 *             minimum: 1
 *           required: false
 *           description: user id to filter by
 *       responses:
 *         '200':
 *           description: Success
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Server error
 */
configurationRouter.get('/', findAll);
//#endregion

configurationRouter.get('/:id', findOne);

configurationRouter.put('/:id', update);

configurationRouter.delete('/:id', deleteOne);

configurationRouter.delete('/', deleteAll);
