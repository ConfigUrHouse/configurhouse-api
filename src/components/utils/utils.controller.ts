import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import UtilsService from './utils.service';

export const sendEmail = (req: Request, res: Response, next: NextFunction) => {
  UtilsService.sendEmail(req.body.email as string, req.body.content as string, req.body.subject as string)
    .then(() => res.json({ message: 'Email sent' }))
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const sendEmails = (req: Request, res: Response, next: NextFunction) => {
  UtilsService.sendEmails(req.body.emails as string[], req.body.subject as string, req.body.content as string)
    .then(() => res.json({ message: 'Emails sent' }))
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};
