import { HouseModel } from './house-model.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';
import { Value } from '../value/value.class';
import { OptionConf } from '../option-conf/option-conf.class';
import * as pdf from 'html-pdf';
import { compileFile } from 'pug';
import { ReadStream } from 'fs';
import path from 'path';
import { groupBy } from 'lodash';
import { ConsommationHouseModelPosteConso } from '../consommation-house-model-poste-conso/consommation-house-model-poste-conso.class';
import { Consommation } from '../consommation/consommation.class';
import { PosteConso } from '../poste-conso/poste-conso.class';
import { ValuePosteConso } from '../value-poste-conso/value-poste-conso.class';
import HouseModelService from './house-model.service';

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

export const getEstimate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const estimate = await HouseModelService.getEstimate(parseInt(req.params.id));

    res.status(200).send(estimate);
  } catch (err: any) {
    next(new ErrorHandler(500, err.message));
  }
};

export const downloadEstimate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const estimate = await HouseModelService.getEstimate(parseInt(req.params.id));

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': "attachment; filename*=UTF-8''" + 'estimate' + '.pdf',
      'Transfer-Encoding': 'chunked',
      Expires: 0,
      'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
      'Content-Transfer-Encoding': 'binary',
      Pragma: 'public',
    });
    const html = compileFile(path.join(__dirname, '../../views/estimate.pug'))(estimate);

    pdf
      .create(html, {
        phantomPath: './node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs',
        script: path.join('./node_modules/html-pdf/lib/scripts', 'pdf_a4_portrait.js'),
        border: {
          top: '1in',
          right: '1in',
          bottom: '1in',
          left: '1in',
        },
        format: 'A4',
        orientation: 'portrait',
      })
      .toStream((error: Error, stream: ReadStream) => {
        if (error) throw new ErrorHandler(500, error.message);
        stream.pipe(res);
      });
  } catch (err: any) {
    next(new ErrorHandler(500, err.message));
  }
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

export const getConsommations = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const houseModel = await HouseModel.findByPk(id, {
    include: [
      {
        model: OptionConf,
        as: 'optionConfs',
        include: [
          {
            model: Value,
            as: 'values',
            where: {
              is_default: 1,
            },
            include: [
              {
                model: ValuePosteConso,
                as: 'valuePosteConsos',
                include: [
                  {
                    model: PosteConso,
                    as: 'posteConso',
                    attributes: ['name', 'description'],
                  },
                ],
                attributes: ['conso'],
              },
            ],
          },
        ],
        attributes: ['name'],
      },
      {
        model: ConsommationHouseModelPosteConso,
        as: 'consommationHouseModelPosteConsos',
        include: [
          {
            model: Consommation,
            as: 'consommation',
          },
          {
            model: PosteConso,
            as: 'posteConso',
          },
        ],
      },
    ],
    attributes: ['name'],
  });
  if (!houseModel) return next(new ErrorHandler(404, `House Model with id '${id}' not found`));
  const consoReference = houseModel.consommationHouseModelPosteConsos
    .filter((consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 1)
    .map((consommationHouseModelPosteConso) => ({
      conso: consommationHouseModelPosteConso.consommation.conso,
      posteConso: {
        name: consommationHouseModelPosteConso.posteConso.name,
        description: consommationHouseModelPosteConso.posteConso.description,
      },
    }));
  const consoBase = houseModel.consommationHouseModelPosteConsos.filter(
    (consommationHouseModelPosteConso) => consommationHouseModelPosteConso.consommation.is_reference === 0
  );
  const consoBaseTotal = consoBase.reduce((a, b) => a + b.consommation.conso, 0);
  const globalReference = consoReference.reduce((a, b) => a + b.conso, 0);
  const valuePosteConsos = houseModel.optionConfs.flatMap((optionConf) => optionConf.values[0].valuePosteConsos);
  const posteConsos = groupBy(valuePosteConsos, (valuePosteConso) => valuePosteConso.posteConso.name);
  const consoBasePosteConsos = groupBy(
    consoBase,
    (consommationHouseModelPosteConso) => consommationHouseModelPosteConso.posteConso.name
  );
  const consoBaseByPoste = Object.keys(consoBasePosteConsos).map((posteConso) => ({
    posteConso,
    conso: consoBasePosteConsos[posteConso].reduce((a, b) => a + b.consommation.conso, 0),
  }));
  const consoOptionsByPoste = Object.keys(posteConsos).map((posteConso) => ({
    posteConso,
    conso: posteConsos[posteConso].reduce((a, b) => a + b.conso, 0),
  }));
  const consoConfigByPoste = consoBaseByPoste
    .concat(consoOptionsByPoste)
    .reduce((a: Array<{ posteConso: string; conso: number }>, b) => {
      const index = a.findIndex((item) => item.posteConso === b.posteConso);
      if (index === -1) {
        return a.concat(b);
      } else {
        a[index].conso += b.conso;
        return a;
      }
    }, []);
  const globalConfig = valuePosteConsos.reduce((a, b) => a + b.conso, 0) + consoBaseTotal;
  const diffPercentage = Math.round(((globalConfig - globalReference) / globalReference) * 100);
  res.send({
    context: {
      occupants: houseModel.occupants,
      options: houseModel.optionConfs.map((optionConf) => ({
        option: optionConf.name,
        value: optionConf.values[0].name,
      })),
    },
    global: {
      reference: globalReference,
      config: globalConfig,
      diffPercentage: diffPercentage >= 0 ? '+' + diffPercentage + '%' : diffPercentage + '%',
    },
    byPosteConso: {
      reference: consoReference.map((conso) => ({
        ...conso,
        percentageOfGlobal: Math.round((conso.conso / globalReference) * 100),
      })),
      config: consoConfigByPoste.map((conso) => {
        const reference = consoReference.find((someConso) => someConso.posteConso.name === conso.posteConso);
        const diffPercentageOfPosteConsoReference = Math.round(
          ((conso.conso - (reference as any).conso) / (reference as any).conso) * 100
        );
        return {
          ...conso,
          percentageOfGlobalConfig: Math.round((conso.conso / globalConfig) * 100),
          diffPercentageOfPosteConsoReference:
            diffPercentageOfPosteConsoReference >= 0
              ? '+' + diffPercentageOfPosteConsoReference + '%'
              : diffPercentageOfPosteConsoReference + '%',
        };
      }),
    },
  });
};
