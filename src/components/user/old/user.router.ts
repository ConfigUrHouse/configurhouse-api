//import jwt from 'jsonwebtoken';
//import { Response, Request, NextFunction, Router } from 'express';
//import { validationSchema as UserValidationSchema } from './user.class';
//import { validateRequest } from '../../middleware/validate-request';
//import { register } from './user.controller';
//
///**
// * @swagger
// *
// * definitions:
// *   User:
// *     type: object
// *     required:
// *       - user
// *       - password
// *     properties:
// *       user:
// *         type: string
// *       password:
// *         type: string
// */
//
///**
// * Router Definition
// */
//
//export const usersRouter = Router();
//
///**
// * @swagger
// * paths:
// *   /users/login:
// *     post:
// *       summary: Login to the api
// *       tags:
// *         - User
// *       requestBody:
// *         description: The credentials are admin/admin
// *         required: true
// *         content:
// *           application/json:
// *             schema:
// *               $ref: '#/definitions/User'
// *       responses:
// *         '201':
// *           description: Created
// */
//usersRouter.post('/login', function (req, res) {
//  //TODO: A sortir dans le controller
//
//  if (req.body.user === 'admin' && req.body.password === 'admin') {
//    var token = jwt.sign({ id: 1 }, 'RANDOM_TOKEN_SECRET', {
//      expiresIn: 86400,
//    });
//
//    res.status(200).send({ auth: true, token: token });
//  } else {
//    res.status(404).send({ auth: false, token: null });
//  }
//});
//
///**
// * @swagger
// * paths:
// *   /users/register:
// *     post:
// *       summary: Create a new user account
// *       tags:
// *         - User
// *       requestBody:
// *         required: true
// *         content:
// *           application/json:
// *             schema:
// *               $ref: '#/definitions/User'
// *       responses:
// *         '201':
// *           description: Created
// */
//usersRouter.post(
//  '/',
//  (req: Request, res: Response, next: NextFunction) => {
//    validateRequest(req, next, UserValidationSchema);
//  },
//  register
//);
//
//usersRouter.get(
//  '/',
//  (req: Request, res: Response, next: NextFunction) => {
//    res.status(200).send({
//      test: 'test'
//    })
//  }
//);
//