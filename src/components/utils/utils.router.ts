import { Response, Request, NextFunction, Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import joi from 'joi';
import { sendEmail, sendEmails } from './utils.controller';

/**
 * Router Definition
 */

export const utilsRouter = Router();

/**
 * @swagger
 * paths:
 *   /utils/sendEmail:
 *     post:
 *       summary: Send email
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

utilsRouter.post(
  '/sendEmails',
  [(req: Request, res: Response, next: NextFunction) => {
    validateRequest(
      req,
      next,
      joi.object({
        emails: joi.array().items(joi.string().email().lowercase()).required().min(1),
        subject: joi.string().allow(""),
        content: joi.string().required(),
      })
    );
  },
    // auth,
    // validateAdminRole
  ],
  sendEmails
)
