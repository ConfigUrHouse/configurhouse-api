import { ValuePosteConso } from './value-poste-conso.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  ValuePosteConso.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const idValue = req.params.idValue;
  const idPosteConso = req.params.idConfiguration;

  ValuePosteConso.findOne({
    where: {
      id_Value: idValue,
      id_PosteConso: idPosteConso,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, err));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const idValue = req.params.idValue;
  const idPosteConso = req.params.idConfiguration;

  ValuePosteConso.update(req.body, {
    where: {
      id_Value: idValue,
      id_PosteConso: idPosteConso,
    },
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
  const idValue = req.params.idValue;
  const idPosteConso = req.params.idConfiguration;

  ValuePosteConso.destroy({
    where: {
      id_Value: idValue,
      id_PosteConso: idPosteConso,
    },
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
  ValuePosteConso.destroy({
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
