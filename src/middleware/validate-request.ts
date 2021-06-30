import express from 'express';
import joi from 'joi';
import { ErrorHandler } from './error-handler';

export const validateRequest = (
  req: express.Request,
  next: express.NextFunction,
  schema: joi.Schema,
  pathSchema?: joi.Schema
) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const objectToValidate = ['POST', 'PUT'].includes(req.method) ? req.body : req.query;
  const { error, value } = schema.validate(objectToValidate, options);
  if (pathSchema) {
    const pathValidationResult = pathSchema.validate(req.params, options);
    if (pathValidationResult?.error) {
      next(
        new ErrorHandler(
          400,
          `Validation error: ${pathValidationResult.error.details.map((x) => x.message).join(', ')}`
        )
      );
    }
  }
  if (error) {
    next(new ErrorHandler(400, `Validation error: ${error.details.map((x) => x.message).join(', ')}`));
  } else {
    req.body = value;
    next();
  }
};

export const validatePathId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  validateRequest(
    req,
    next,
    joi.object(),
    joi.object({
      id: joi.number().required(),
    })
  );
};
