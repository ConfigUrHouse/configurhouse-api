import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const currentToken = req.headers.authorization?.split(' ')[1] as string;
  if (!currentToken) {
    res.status(403).send({ success: 'false', message: 'Not authorized' });
  }

  jwt.verify(currentToken, process.env.APP_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).send({ success: 'false', message: 'Not authorized' });
    } else {
      res.locals = {
        ...res.locals,
        userId: (decoded as any).id
    };
      next();
    }
  });
};
