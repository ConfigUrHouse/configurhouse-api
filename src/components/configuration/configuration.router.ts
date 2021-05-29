import { Router } from 'express';
import auth from '../../middleware/auth';
import { validatePathId } from '../../middleware/validate-request';
import { validateAdminRole } from '../../middleware/validate-role';
import {
  findAll,
  findOne,
  update,
  deleteAll,
  deleteOne,
  getConfigurationConsommation,
  downloadConfigurationConsommation,
  sendConfiguration,
} from './configuration.controller';

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
 *   Consommations:
 *     type: object
 *     properties:
 *       context:
 *         type: object
 *         properties:
 *           occupants:
 *             type: integer
 *       global:
 *         type: object
 *         properties:
 *           reference:
 *             type: integer
 *           config:
 *             type: integer
 *           diffPercentage:
 *             type: integer
 *       byPosteConso:
 *         type: object
 *         properties:
 *           reference:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 conso:
 *                   type: integer
 *                 posteConso:
 *                   type: object
 *                   properties:
 *                     name: string
 *                     description: string
 *                 percentageOfGlobal:
 *                   type: integer
 *           config:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 conso:
 *                   type: integer
 *                 posteConso:
 *                   type: object
 *                   properties:
 *                     name: string
 *                 percentageOfGlobalConfig:
 *                   type: integer
 *                 diffPercentageOfPosteConsoReference:
 *                   type: integer
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

configurationRouter.get('/:id', validatePathId, findOne);

configurationRouter.put('/:id', [validatePathId, auth, validateAdminRole], update);

configurationRouter.delete('/:id', [validatePathId, auth, validateAdminRole], deleteOne);

configurationRouter.delete('/', [auth, validateAdminRole], deleteAll);

//#region GET /configuration/:id/conso
/**
 * @swagger
 *
 * paths:
 *   /configuration/:id/conso:
 *     get:
 *       summary: Get estimated energy consumption for a configuration
 *       tags:
 *         - Configuration
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Id of the configuration
 *       responses:
 *         200:
 *           description: A comparison of energetic consumptions
 *           schema:
 *             $ref: '#/definitions/Consommations'
 *         400:
 *           description: Invalid request parameters
 *         404:
 *           description: Configuration not found
 */
configurationRouter.get('/:id/conso', validatePathId, getConfigurationConsommation);
//#endregion

//#region GET /configuration/:id/conso/download
/**
 * @swagger
 *
 * paths:
 *   /configuration/:id/conso/download:
 *     get:
 *       summary: Get estimated energy consumption for a configuration
 *       tags:
 *         - Configuration
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Id of the configuration
 *       responses:
 *         200:
 *           description: A pdf file with a comparison of energetic consumptions
 *           schema:
 *             type: application/pdf
 *         400:
 *           description: Invalid request parameters
 *         404:
 *           description: Configuration not found
 */
configurationRouter.get('/:id/conso/download', validatePathId, downloadConfigurationConsommation);
//#endregion

//#region GET /configuration/:id/send
/**
 * @swagger
 *
 * paths:
 *   /configuration/:id/send:
 *     get:
 *       summary: Send configuration to Deschampignons
 *       tags:
 *         - Configuration
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Id of the configuration
 *       responses:
 *         200:
 *           description: Configuration sent
 *         400:
 *           description: Invalid request parameters
 *         404:
 *           description: Configuration not found
 */
configurationRouter.get('/:id/send', validatePathId, sendConfiguration);
//#endregion
