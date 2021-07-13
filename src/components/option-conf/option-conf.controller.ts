import { OptionConf } from './option-conf.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const size = req.query.size ? parseInt(req.query.size as string) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0 };

    const data = await OptionConf.findAndCountAll({
      limit: limit,
      offset: offset,
      include: ['mesh', 'houseModel'],
    });
    res.status(200).send({ success: true, ...getPagingData(data, page, limit) });
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const data = await OptionConf.findByPk(id);
    if (!data) {
      return next(new ErrorHandler(404, 'Option not found'));
    }

    res.status(200).send(data);
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};

export const findByHouseModel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const data = await OptionConf.findAll({
      where: { id_HouseModel: id },
    });

    if (!data) {
      return next(new ErrorHandler(404, 'Option not found'));
    }

    res.status(200).send(data);
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await OptionConf.create(req.body);
    if (!success) {
      return next(new ErrorHandler(400, 'Bad request'));
    }

    res.status(201).send({
      id: success.id,
      message: 'Option created successfully',
    });
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const success = await OptionConf.update(req.body, {
      where: { id },
    });
    if (!success) {
      return next(new ErrorHandler(400, 'Bad request'));
    }

    res.status(200).send({
      id: id,
      message: 'Option updated successfully',
    });
  } catch (err) {
    return next(new ErrorHandler(500, err?.message ?? 'Server error'));
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const success = await OptionConf.destroy({
      where: { id },
    });
    if (!success) {
      return next(new ErrorHandler(400, 'Option failed to delete'));
    }

    res.status(200).send({
      message: 'Option deleted successfully',
    });
  } catch (err) {
    next(new ErrorHandler(400, err.name == "SequelizeForeignKeyConstraintError" ? "L'objet devant être supprimé est utilisé ailleurs." : "Server error"));
}
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  OptionConf.destroy({
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
