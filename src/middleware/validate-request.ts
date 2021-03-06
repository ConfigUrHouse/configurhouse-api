import express from 'express';
import joi from 'joi';
import { ErrorHandler } from './error-handler';

export const validateRequest = (req: express.Request, next: express.NextFunction, schema: joi.Schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(new ErrorHandler(400, `Validation error: ${error.details.map((x) => x.message).join(', ')}`));
  } else {
    req.body = value;
    next();
  }
};
