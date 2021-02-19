import express, { Response, Request, NextFunction } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export const handleNotFound = function (req: Request, res: Response, next: NextFunction) {
  throw new ErrorHandler(404, 'Not found');
};

export const handleError = function (error: ErrorHandler, req: Request, res: Response, next: NextFunction) {
  const statusCode: number = (error && error.statusCode) || 500;
  const message: string = (error && error.message) || 'Unhandled server error.';
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
