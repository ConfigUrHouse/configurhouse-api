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

export const downloadEstimate = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  HouseModel.findByPk(id, {
    include: ['optionConfs'],
  })
    .then(async (data) => {
      if (!data) {
        return next(new ErrorHandler(404, 'HouseModel not found'));
      }

      const estimate: { value: Value; option: OptionConf }[] = [];
      for (const option of data.optionConfs) {
        const value = await Value.findOne({ where: { is_default: true, id_OptionConf: option.id } });
        if (value) {
          estimate.push({ value, option });
        }
      }
      const total = estimate
        .map((e) => e.value.price)
        .reduce((sum, val) => parseFloat(sum.toString()) + parseFloat(val.toString()));

      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': "attachment; filename*=UTF-8''" + 'estimate' + '.pdf',
        'Transfer-Encoding': 'chunked',
        Expires: 0,
        'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
        'Content-Transfer-Encoding': 'binary',
        Pragma: 'public',
      });
      const html = compileFile(path.join(__dirname, '../../views/estimate.pug'))({
        estimate,
        total,
        title: `Devis du modèle ${data.name}`,
      });

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
