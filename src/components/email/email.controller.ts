import { Email } from './email.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  Email.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Email.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Email.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.status(201).send({
          message: 'Message to define',
        });
      } else {
        next(new ErrorHandler(500, 'Message to define'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Email.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Message to define',
        });
      } else {
        next(new ErrorHandler(500, 'Message to define'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  Email.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: 'Message to define' });
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};
