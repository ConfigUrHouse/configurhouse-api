import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction, Router } from 'express';
import { emailSchema as emailValidationSchema, validationSchema as userValidationSchema } from './user.class';
import { validationSchema as tokenValidationSchema } from '../tokens/token.class';
import { validateRequest } from '../../middleware/validate-request';
import { register, verify, login, refreshToken, sendVerificationEmail } from './user.controller';
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
 *         description: email/password combination needed for login
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
 *         '400':
 *           description: Bad request
 *         '409':
 *           description: Conflict
 */
usersRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, userValidationSchema);
  },
  register
);

/**
 * @swagger
 * paths:
 *   /users/verify:
 *     post:
 *       summary: Verify user email address
 *       tags:
 *         - User
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *             format: email
 *           required: true
 *           description: email address of the user to verify
 *         - in: query
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: token provided by the API to verify the user's email address
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad request
 *         '409':
 *           description: User or token creation failed
 *         '500':
 *           description: Verification email not sent
 */
usersRouter.get(
  '/verify',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, tokenValidationSchema)
  },
  verify
)

/**
 * @swagger
 * paths:
 *   /users/resend:
 *     post:
 *       summary: Send another verification email
 *       tags:
 *         - User
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *             format: email
 *           required: true
 *           description: email address of the user to verify
 *       responses:
 *         '200':
 *           description: Email sent
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: User not found
 *         '409':
 *           description: Token creation failed
 *         '500':
 *           description: Email not sent
 */
usersRouter.get(
  '/resend',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, emailValidationSchema)
  },
  sendVerificationEmail
)
