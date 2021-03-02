import { Asset } from './asset.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const getAll = (req: Request, res: Response, next: NextFunction) => {
  Asset.findAll()
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
};

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  Asset.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Asset.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};
