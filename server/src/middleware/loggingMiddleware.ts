import { Request, Response } from 'express';
import { chalkLog } from '../utils/chalkLog';

export const loggingMiddleware = (req: Request, res: Response, next) => {
  chalkLog('yellow', '#### logging middleware ####')

  // console.log(req);
  // console.log(res);
  // console.log(Object.keys(req));
  // console.log(req.statusCode);
  // console.log(req.res.statusCode);
  // console.log(res.statusCode);
  
  chalkLog('green', `'ip:', ${req.ip}`)
  next();
}
