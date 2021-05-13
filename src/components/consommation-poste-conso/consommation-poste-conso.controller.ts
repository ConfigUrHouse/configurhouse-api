import { ConsommationPosteConso } from './consommation-poste-conso.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  ConsommationPosteConso.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const idConsommation = req.params.idConsommation;
  const idPosteConso = req.params.idPosteConso;

  ConsommationPosteConso.findOne({
    where: {
      id_Consommation: idConsommation,
      id_PosteConso: idPosteConso
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const idConsommation = req.params.idConsommation;
  const idPosteConso = req.params.idPosteConso;

  ConsommationPosteConso.update(req.body, {
    where: {
      id_Consommation: idConsommation,
      id_PosteConso: idPosteConso
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
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const idConsommation = req.params.idConsommation;
  const idPosteConso = req.params.idPosteConso;

  ConsommationPosteConso.destroy({
    where: {
      id_Consommation: idConsommation,
      id_PosteConso: idPosteConso
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
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  ConsommationPosteConso.destroy({
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
