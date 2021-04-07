import { Response, Request, NextFunction, Router } from 'express';
import {
  findAll,
  findOne,
  update,
  deleteAll,
  deleteOne,
  sendPasswordResetEmail,
  resetPassword,
  updateRoles,
} from './user.controller';
import { emailSchema as emailValidationSchema, validationSchema as userValidationSchema } from './user.class';
import { validationSchema as tokenValidationSchema } from '../token/token.class';
import { validateRequest } from '../../middleware/validate-request';
import { register, verify, login, refreshToken, sendVerificationEmail } from './user.controller';
import joi from 'joi';
import auth from '../../middleware/auth';
import { UserRoles } from '../user-role/user-role.class';
import { validateAdminRole } from '../../middleware/validate-role';

/**
 * @swagger
 *
 * definitions:
 *   Response:
 *    type: object
 *    properties:
 *      success:
 *        type: boolean
 *      message:
 *        type: string
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - password
 *       - firstname
 *       - lastname
 *     properties:
 *       email:
 *         type: string
 *         description: Email address of the user
 *         example: "john.doe@example.com"
 *       password:
 *         type: string
 *         description: Password of the user
 *         example: "myVerySecurePassw0rd"
 *       firstname:
 *         type: string
 *         description: First name of the user
 *         example: "John"
 *       lastname:
 *         type: string
 *         description: Last name of the user
 *         example: "DOE"
 *   UserResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the user
 *       active:
 *         type: integer
 *         minimum: 0
 *         maximum: 1
 *         description: 1 if the user's email adress if verified, 0 otherwise
 *   UserLogin:
 *     type: object
 *     required:
 *       - user
 *       - password
 *     properties:
 *       user:
 *         type: string
 *         description: Email address of the user
 *         example: "john.doe@example.com"
 *       password:
 *         type: string
 *         description: Password of the user
 *         example: "myVerySecurePassw0rd"
 *   PaginatedArrayOfUsers:
 *     type: object
 *     properties:
 *       totalItems:
 *         type: integer
 *       items:
 *         type: array
 *         items:
 *           $ref: '#/definitions/UserResponse'
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
        role: joi.string().valid(...Object.values(UserRoles)),
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
 *       parameters:
 *         - in: body
 *           name: userLogin
 *           description: email/password combination needed to login
 *           schema:
 *             $ref: '#/definitions/UserLogin'
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
 *       parameters:
 *         - in: body
 *           name: user
 *           schema:
 *             $ref: '#/definitions/User'
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

/**
 * @swagger
 * paths:
 *   /users/password-reset:
 *     post:
 *       summary: Reset the user's password
 *       tags:
 *         - User
 *       parameters:
 *         - in: query
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: token provided by the API to reset the user's password
 *         - in: body
 *           name: email
 *           schema:
 *             type: string
 *             format: email
 *           required: true
 *           description: the user's email address
 *         - in: body
 *           name: password
 *           schema:
 *             type: string
 *           required: true
 *           description: the user's new password
 *       responses:
 *         '200':
 *           description: Password reset
 *         '400':
 *           description: Bad request
 *         '403':
 *           description: Invalid token or email not verified
 *         '404':
 *           description: User not found
 *         '409':
 *           description: User or token update failed
 *         '500':
 *           description: Password reset email not sent
 */
userRouter.post(
  '/password-reset',
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
  resetPassword
);

/**
 * @swagger
 * paths:
 *   /users/password-reset:
 *     get:
 *       summary: Send another password reset email
 *       tags:
 *         - User
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *             format: email
 *           required: true
 *           description: the user's email address
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
  '/password-reset',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, emailValidationSchema);
  },
  sendPasswordResetEmail
);

userRouter.get('/:id', findOne);

/**
 * @swagger
 * paths:
 *   /user/{id}/update-roles:
 *     put:
 *       summary: Updates a user's roles
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the user to update
 *           type: integer
 *           required: true
 *         - in: body
 *           name: roles
 *           description: The IDs of the roles to apply to the user
 *           schema:
 *             type: array
 *             minItems: 1
 *             items:
 *               type: integer
 *       responses:
 *         200:
 *           description: User roles updated
 *           schema:
 *             $ref: '#/definitions/Response'
 *         400:
 *           description: Invalid role ID
 *         404:
 *           description: User not found
 *         500:
 *           description: Unable to update user role
 */
userRouter.put(
  '/:id/update-roles',
  [
    (req: Request, res: Response, next: NextFunction) => {
      validateRequest(
        req,
        next,
        joi.object({
          roles: joi.array().items(joi.number()).single().required(),
        })
      );
    },
    // auth,
    // validateAdminRole
  ],
  updateRoles
);

userRouter.put('/:id', update);

userRouter.delete(
  '/:id',
  [
    // auth,
    // validateAdminRole
  ],
  deleteOne
);
