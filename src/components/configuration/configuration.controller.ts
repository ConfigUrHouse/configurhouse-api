import { Configuration } from './configuration.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';
import {
  ConfigurationValue,
  Consommation,
  ConsommationPosteConso,
  OptionConf,
  PosteConso,
  Value,
} from '../config/init-models.config';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';
import sequelize, { Model, Op } from 'sequelize';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  const size = req.query.size ? parseInt(req.query.size as string) : undefined;
  const page = req.query.page ? parseInt(req.query.page as string) : 0;
  const { limit, offset } = size ? getPagination(page, size) : { limit: undefined, offset: 0 };

  const name = req.query.name as string;
  const id_HouseModel = req.query.id_HouseModel as string;
  const id_User = req.query.id_User as string;

  const filters: { name?: string; id_HouseModel?: number; id_User?: number } = {};
  if (name) filters.name = name;
  if (id_HouseModel) filters.id_HouseModel = parseInt(id_HouseModel);
  if (id_User) filters.id_User = parseInt(id_User);

  // TODO : replace id_User filter by id of logged in user

  Configuration.findAndCountAll({
    limit: limit,
    offset: offset,
    where: filters,
    include: ['user', 'houseModel'],
  })
    .then((data) => {
      res.send({ success: true, ...getPagingData(data, page, limit) });
    })
    .catch((err: any) => {
      return next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Server error'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Configuration.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Configuration.update(req.body, {
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

  Configuration.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: 'Configuration deleted',
        });
      } else {
        next(new ErrorHandler(404, 'Configuration non trouvée'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Erreur lors de la suppression'));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  Configuration.destroy({
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

export const getConfigurationConsommation = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const config = await Configuration.findByPk(id, {
    include: [
      {
        model: ConfigurationValue as typeof Model,
        as: 'configurationValues',
        include: [
          {
            model: Value as typeof Model,
            as: 'value',
            attributes: ['name'],
            include: [
              {
                model: OptionConf as typeof Model,
                as: 'optionConf',
                attributes: ['name'],
              },
              {
                model: ValuePosteConso as typeof Model,
                as: 'valuePosteConsos',
                include: [
                  {
                    model: PosteConso as typeof Model,
                    as: 'posteConso',
                    attributes: ['name', 'description'],
                    include: [
                      {
                        model: ConsommationPosteConso as typeof Model,
                        as: 'consommationPosteConsos',
                        attributes: ['Conso', 'Conso_reference']
                      }
                    ]
                  },
                ],
                attributes: ['modifier']
              },
            ],
          },
        ],
        attributes: ['id_Value']
      },
    ],
    attributes: ['name']
  });
  if (!config) return next(new ErrorHandler(404, `Configuration with id '${req.params.id}' not found`));

  res.send(config);
};
