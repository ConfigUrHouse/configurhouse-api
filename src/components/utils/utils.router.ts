import { Response, Request, NextFunction, Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import joi from 'joi';
import { sendEmail, sendEmails } from './utils.controller';
import auth from '../../middleware/auth';
import { validateAdminRole } from '../../middleware/validate-role';

/**
 * Router Definition
 */

export const utilsRouter = Router();

/**
 * @swagger
 * paths:
 *   /utils/sendEmail:
 *     post:
 *       summary: Send email to ConfigUrHouse
 *       tags:
 *         - Utils
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *             format: email
 *           required: true
 *           description: email address of the sender
 *         - in: query
 *           name: content
 *           schema:
 *             type: string
 *           required: true
 *           description: content of the email
 *       responses:
 *         '200':
 *           description: Email sent
 *         '400':
 *           description: Bad request
 */
utilsRouter.post(
  '/sendEmail',
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(
      req,
      next,
      joi.object({
        email: joi.string().email().lowercase().required(),
        content: joi.string().required(),
      })
    );
  },
  sendEmail
);

/**
 * @swagger
 * paths:
 *   /utils/sendEmails:
 *     post:
 *       summary: Send email to multiple users
 *       tags:
 *         - Utils
 *       parameters:
 *         - in: query
 *           name: emails
 *           schema:
 *             type: array
 *             minItems: 1
 *             items:
 *               type: string
 *               format: email
 *           required: true
 *           description: email addresses of the recipients
 *         - in: query
 *           name: subject
 *           schema:
 *             type: string
 *           description: subject of the email
 *         - in: query
 *           name: content
 *           schema:
 *             type: string
 *           required: true
 *           description: content of the email
 *       responses:
 *         '200':
 *           description: Email sent
 *         '400':
 *           description: Bad request
 */
utilsRouter.post(
  '/sendEmails',
  [
    (req: Request, res: Response, next: NextFunction) => {
      validateRequest(
        req,
        next,
        joi.object({
          emails: joi.array().items(joi.string().email().lowercase()).required().min(1),
          subject: joi.string().allow(''),
          content: joi.string().required(),
        })
      );
    },
    auth,
    validateAdminRole,
  ],
  sendEmails
);
