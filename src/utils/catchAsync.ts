import { Request, Response, NextFunction } from 'express';

type expressCallback = (req: Request, res: Response, NextFunction) => void;

const catchAsync = (fn: expressCallback) => (req:Request, res:Response, next:NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  

  export default catchAsync;
  