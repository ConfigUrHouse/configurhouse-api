import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction, Router } from 'express';
import { emailSchema as emailValidationSchema, validationSchema as userValidationSchema } from './user.class';
import { validationSchema as tokenValidationSchema } from './token.class';
import { validateRequest } from '../../middleware/validate-request';
import { register, verify, sendVerificationEmail } from './user.controller';

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
 *         description: The credentials are admin/admin
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       responses:
 *         '201':
 *           description: Created
 */
usersRouter.post('/login', function (req, res) {
  //TODO: A sortir dans le controller

  if (req.body.user === 'admin' && req.body.password === 'admin') {
    var token = jwt.sign({ id: 1 }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(404).send({ auth: false, token: null });
  }
});

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
 *         '400'
 *           description: Bad request
 *         '409'
 *           description: Conflict
 */
usersRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next, userValidationSchema);
  },
  register
);

usersRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
      test: 'test'
    })
  }
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
 *         '400'
 *           description: Bad request
 *         '409'
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
