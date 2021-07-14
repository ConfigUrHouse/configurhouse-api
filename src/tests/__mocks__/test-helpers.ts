import { Request, Response, NextFunction } from 'express';

export const testHelpers = {
  resetAll: () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllTimers();
  },
  mockReq: () => {
    return { query: {}, params: {}, body: {}, headers: {} } as Request;
  },
  mockRes: () => {
    const res = {} as Response;
    res.send = jest.fn();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn();
    return res;
  },
  mockNext: () => {
    return jest.fn() as NextFunction;
  },
};
