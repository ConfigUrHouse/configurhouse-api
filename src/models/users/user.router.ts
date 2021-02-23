import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction, Router } from 'express';
import { validationSchema as UserValidationSchema } from './user.class';
import { validateRequest } from '../../middleware/validate-request';
import { login, refreshToken, register } from './user.controller';
import joi from 'joi';
import auth from '../../middleware/auth';

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - user
 *       - password
 *     properties:
 *       user:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * Router Definition
 */

export const usersRouter = Router();

/**
 * @swagger
 * paths:
 *   /users/login:
 *     post:
 *       summary: Login to the api
 *       tags:
 *         - User
 *       requestBody:
 *         description: The email/password combination needed for login
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       responses:
 *         '200':
 *           description: Login successful
 *         '400':
 *           description: Incorrect email or password
 *         '400':
 *           description: Email not verified
 */
usersRouter.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(
      req,
      next,
      joi.object({
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).required(),
      })
    );
  },
  login
);

/**
 * @swagger
 * paths:
 *   /users/refresh-token:
 *     get:
 *       summary: Refreshes a user's token by returning a new one
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: Success
 *         '403':
 *           description: Not authorized
 */
usersRouter.get('/refresh-token', auth, refreshToken);

/**
 * @swagger
 * paths:
 *   /users/register:
 *     post:
 *       summary: Create a new user account
 *       tags:
 *         - User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       responses:
 *         '201':
 *           description: Created
 */
usersRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, UserValidationSchema);
  },
  register
);
