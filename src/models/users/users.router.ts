import jwt from "jsonwebtoken";
import express from "express";
import joi from "joi";
import UserService, { IUserCreateParams } from "./user.service";
import { validateRequest } from "../../middleware/validate-request";

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

export const usersRouter = express.Router()

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
usersRouter.post('/login', function(req, res) {

    console.log('======================');
    console.log(req.body);
    console.log('======================');

    if(req.body.user === "admin" && req.body.password === "admin"){
        var token = jwt.sign({ id: 1 }, "RANDOM_TOKEN_SECRET", {
            expiresIn: 86400
          });
          
          res.status(200).send({ auth: true, token: token });
    }else{
        res.status(404).send({ auth: false, token:null});

    }

});

const registerSchema = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const schema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).required(),
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().uppercase().required(),
    phoneNumber: joi.string().regex(/^\+\d+$/).optional()
  })
  validateRequest(req, next, schema)
}

const register = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  UserService.create(req.body as IUserCreateParams)
      .then(() => res.json({ message: 'Registration successful' }))
      .catch(next)
}

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
usersRouter.post('/register', registerSchema, register)