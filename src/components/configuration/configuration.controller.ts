import { Configuration } from './configuration.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import { getPagination, getPagingData } from '../../shared/pagination';
import ConfigurationService from './configuration.service';
import * as pdf from 'html-pdf';
import { compileFile } from 'pug';
import { ReadStream } from 'fs';
import path from 'path';
import { emailTransporter } from '../config/email.config';
import { Value } from '../value/value.class';
import { OptionConf } from '../option-conf/option-conf.class';
import json2csv from 'json2csv';

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

export const downloadEstimate = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const mode = ['csv', 'pdf'].includes(req.query.mode as string) ? (req.query.mode as string) : 'pdf';

  Configuration.findByPk(id, {
    include: ['configurationValues'],
  })
    .then(async (data) => {
      if (!data) {
        return next(new ErrorHandler(404, 'Configuration not found'));
      }

      const estimate: { value: Value; option: OptionConf }[] = [];
      for (const cv of data.configurationValues) {
        const value = await Value.findByPk(cv.id_Value);
        if (!value) {
          continue;
        }
        const option = await OptionConf.findByPk(value.id_OptionConf);
        if (!option) {
          continue;
        }

        estimate.push({ value, option });
      }
      switch (mode) {
        case 'pdf':
          const total = estimate
            .map((e) => e.value.price)
            .reduce((sum, val) => parseFloat(sum.toString()) + parseFloat(val.toString()))
            .toFixed(2);

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
            title: `Devis de la configuration "${data.name}"`,
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
          break;
        case 'csv':
          const csv = json2csv.parse(
            estimate.map((e) => ({ option: e.option.name, value: e.value.name, price: e.value.price })),
            { fields: ['option', 'value', 'price'], delimiter: ';' }
          );

          res.setHeader('Content-disposition', 'attachment; filename=data.csv');
          res.set('Content-Type', 'text/csv');
          res.status(200).send(csv);
          break;
        default:
          next(new ErrorHandler(500, 'Mode inconnu'));
      }
    })
    .catch((err: Error) => {
      next(new ErrorHandler(500, err.message));
    });
};

export const getConfigurationConsommation = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const consommations = await ConfigurationService.getConsommations(id);
    res.send(consommations);
  } catch (error) {
    next(error);
  }
};

export const downloadConfigurationConsommation = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const consommations = await ConfigurationService.getConsommations(id);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': "attachment; filename*=UTF-8''" + 'consommations' + '.pdf',
      'Transfer-Encoding': 'chunked',
      Expires: 0,
      'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
      'Content-Transfer-Encoding': 'binary',
      Pragma: 'public',
    });
    const html = compileFile(path.join(__dirname, '../../views/consommation.pug'))({ consommations });
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
        if (error) next(new ErrorHandler(500, error.message));
        stream.pipe(res);
      });
  } catch (error) {
    next(error)
  }
};

export const sendConfiguration = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Demande de devis',
      html: `<p>Veuillez cliquer <a href="${process.env.APP_BASE_URL}/configuration/${id}">ici</a> pour consulter le détail de la configuration.</p>`,
    });
    res.status(200).send({ success: true, message: 'Configuration sent' });
  } catch (error) {
    next(new ErrorHandler(500, `Email not sent : ${error.message}`));
  }
};
