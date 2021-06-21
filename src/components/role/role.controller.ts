import { Role } from './role.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const size = req.query.size ? parseInt(req.query.size as string) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0 };

    const data = await Role.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).send({ success: true, ...getPagingData(data, page, limit) });
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Role.update(req.body, {
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
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Role.destroy({
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
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: 'Message to define' });
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};
