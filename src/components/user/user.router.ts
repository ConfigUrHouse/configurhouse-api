import { Response, Request, NextFunction, Router } from 'express';
import { findAll, findOne, update, deleteAll, deleteOne } from './user.controller';
import { emailSchema as emailValidationSchema, validationSchema as userValidationSchema } from './user.class';
import { validationSchema as tokenValidationSchema } from '../token/token.class';
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
 *   PaginatedArrayOfUsers:
 *     type: object
 *     properties:
 *       totalItems:
 *         type: integer
 *       items:
 *         type: User[]
 *       totalPages:
 *         type: integer
 *       currentPage:
 *         type: integer
 */

/**
 * Router Definition
 */
export const userRouter = Router();

//#region get /user
/**
 * @swagger
 * 
 * paths:
 *   /user:
 *     get:
 *       summary: Retrieve all users
 *       tags:
 *         - User
 *       parameters:
 *         - in: query
 *           name: firstname
 *           schema:
 *             type: string
 *           description: First name of the users to get
 *         - in: query
 *           name: lastname
 *           schema:
 *             type: string
 *           description: Last name of the users to get
 *         - in: query
 *           name: role
 *           schema:
 *             type: string
 *           description: Role of the users to get
 *         - in: query
 *           name: size
 *           schema:
 *             type: integer
 *           description: Number of users to get for pagination
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: Number of the page to get for pagination
 *       responses:
 *         200:
 *           description: A paginated list of users
 *           schema:
 *             $ref: '#/definitions/PaginatedArrayOfUsers'
 *         400:
 *           description: Invalid request parameters
 */
userRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(
      req,
      next,
      joi.object({
        firstname: joi.string().trim(),
        lastname: joi.string().trim(),
        role: joi.string(),
        size: joi.number(),
        page: joi.number(),
      })
    );
  },
  findAll
);
//#endregion

userRouter.delete('/', deleteAll);

/**
 * @swagger
 * paths:
 *   /user/login:
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
 *           description: Email not verified
 */
userRouter.post(
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
 *   /user/refresh-token:
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
userRouter.get('/refresh-token', auth, refreshToken);

/**
 * @swagger
 * paths:
 *   /user/register:
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
userRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, userValidationSchema);
  },
  register
);

/**
 * @swagger
 * paths:
 *   /user/verify:
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
userRouter.get(
  '/verify',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, tokenValidationSchema);
  },
  verify
);

/**
 * @swagger
 * paths:
 *   /user/resend:
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
userRouter.get(
  '/resend',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, emailValidationSchema);
  },
  sendVerificationEmail
);

userRouter.get('/:id', findOne);

userRouter.put('/:id', update);

userRouter.delete('/:id', deleteOne);
