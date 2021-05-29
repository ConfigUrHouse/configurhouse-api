import { Asset, AssetAttributes } from './asset.class';
import { Response, Request, NextFunction } from 'express';
import { ErrorHandler } from '../../middleware/error-handler';
import multer from 'multer';
import * as fs from 'fs/promises';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets');
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'text/plain' || //for .obj file mimetype is text/plain
    file.mimetype === 'application/sla' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File uploaded is not of types accepted.'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('images');

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  Asset.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'Message to define'));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Asset.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'An error has occured'));
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      res.send('file not uploaded');
    } else {
      Asset.findByPk(id)
        .then((data) => {
          fs.unlink('./' + data?.value);
        })
        .catch(() => {
          next(new ErrorHandler(500, 'An error has occured'));
        });

      let updateInfos = {
        value: req.file.path,
      };
      Asset.update(updateInfos, {
        where: { id: id },
      })
        .then((num: any) => {
          if (num == 1) {
            res.status(201).send({
              message: 'Asset updated successfully',
            });
          } else {
            next(new ErrorHandler(500, 'An error has occured'));
          }
        })
        .catch((err: any) => {
          console.log(err);
          next(new ErrorHandler(500, 'No existing asset with this id'));
        });
    }
  });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Asset.findByPk(id)
    .then((data) => {
      if (data) {
        Asset.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              fs.unlink('./' + data.value);

              res.send({
                message: 'Asset deleted',
              });
            } else {
              next(new ErrorHandler(500, 'An error has occured'));
            }
          })
          .catch((err: any) => {
            next(new ErrorHandler(500, 'An error has occured'));
          });
      } else {
        next(new ErrorHandler(500, 'No existing asset with this id'));
      }
    })
    .catch((err: any) => {
      next(new ErrorHandler(500, 'An error has occured'));
    });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  Asset.destroy({
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

export const addOne = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      res.send('file not uploaded');
    } else {
      let assetProperties: AssetAttributes = {
        id: 0,
        value: req.file.path,
        id_AssetType: req.body.id_AssetType,
      };

      Asset.create(assetProperties)
        .then(() => res.json({ message: 'Asset created successfully' }))
        .catch(next);
    }
  });
};
