import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import UtilsService from './utils.service'; 

export const sendEmail = (req: Request, res: Response, next: NextFunction) => {
    UtilsService.sendEmail(req.body.email as string,req.body.content as string)
    .then(() => res.json({ message: 'Email sent' }))
    .catch(next)
}