import { UserPolice } from './user-police.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  UserPolice.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const findByUserId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  UserPolice.findAll({ where: { id_User: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  UserPolice.update(req.body, {
    where: { id_Police: id },
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
export const create = (req: Request, res: Response, next: NextFunction) => {
  UserPolice.create(req.body)
    .then((userpolice) => {
      res.status(201).send({ success: true, userpolice, message: 'UserPolice created successfully' });
    })
    .catch((err: Error) => {
      next(new ErrorHandler(400, err.message));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  UserPolice.destroy({
    where: { id_Police: id },
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
  UserPolice.destroy({
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
