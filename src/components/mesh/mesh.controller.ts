import { Mesh } from './mesh.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  Mesh.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Mesh.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Mesh.update(req.body, {
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

  Mesh.destroy({
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
        next(new ErrorHandler(500, err.name == "SequelizeForeignKeyConstraintError" ? "L'objet devant être supprimé est utilisé ailleurs." : err.message));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  Mesh.destroy({
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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await Mesh.create(req.body);
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

export const findByAssetId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Mesh.findAll({
    where: {
      id_Asset: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};