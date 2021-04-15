import { HouseModel } from './house-model.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  const size = req.query.size ? parseInt(req.query.size as string) : undefined;
  const page = req.query.page ? parseInt(req.query.page as string) : 0;
  const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0 };

  HouseModel.findAndCountAll({
    limit: limit,
    offset: offset,
    include: ['asset', 'modelType'],
  })
    .then((data) => {
      res.status(200).send({ success: true, ...getPagingData(data, page, limit) });
    })
    .catch((err: Error) => {
      return next(new ErrorHandler(500, err.message));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  HouseModel.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        next(new ErrorHandler(404, 'HouseModel not found'));
      }
    })
    .catch((err: Error) => {
      next(new ErrorHandler(500, err.message));
    });
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  HouseModel.create(req.body)
    .then((model) => {
      res.status(201).send({ success: true, model, message: 'HouseModel created successfully' });
    })
    .catch((err: Error) => {
      next(new ErrorHandler(400, err.message));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  HouseModel.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.status(200).send({
          message: 'HouseModel updated successfully',
        });
      } else {
        next(new ErrorHandler(404, 'HouseModel not found'));
      }
    })
    .catch((err: Error) => {
      next(new ErrorHandler(400, err.message));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  HouseModel.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'HouseModel deleted successfully',
        });
      } else {
        next(new ErrorHandler(404, 'HouseModel not found'));
      }
    })
    .catch((err: Error) => {
      next(new ErrorHandler(400, err.message));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  HouseModel.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: 'HouseModels deleted successfully',
      });
    })
    .catch((err: Error) => {
      next(new ErrorHandler(400, err.message));
    });
};
