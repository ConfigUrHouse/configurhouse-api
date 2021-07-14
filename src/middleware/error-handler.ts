import { Response, Request, NextFunction } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  originalError: Error | undefined;

  constructor(statusCode: number, error: Error | string) {
    super();
    this.statusCode = statusCode || 500;
    if (error instanceof Error) {
      this.originalError = error;
      this.message = error.message;
    } else {
      this.message = error;
    }
  }
}

export const handleNotFound = function (req: Request, res: Response, next: NextFunction) {
  throw new ErrorHandler(404, new Error('Not found'));
};

export const handleError = function (error: ErrorHandler, req: Request, res: Response, next: NextFunction) {
  const statusCode: number = (error && error.statusCode) || 500;
  const message: string = (error && error.message) || 'Unhandled server error.';
  if (error.originalError) console.log(error.originalError.stack);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
