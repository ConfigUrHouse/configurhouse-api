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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let houseModel = await HouseModel.findByPk(req.params.id);
    if (!houseModel) {
      return next(new ErrorHandler(404, 'HouseModel not found'));
    }

    houseModel = await houseModel.update(req.body);

    res.status(200).send({
      message: 'HouseModel updated successfully',
      houseModel,
    });
  } catch (error) {
    next(new ErrorHandler(400, error.message));
  }
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
  const id = parseInt(req.params.id);
  try {
    res.send(await HouseModelService.getConsommations(id));
  } catch (error) {
    next(error);
  }
};

export const getConfigConsommations = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const valueIds = req.body.valueIds;
  try {
    res.send(await HouseModelService.getConsommations(id, valueIds));
  } catch (error) {
    next(error);
  }
};
