import CustomError from './CustomError';
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const errorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err instanceof CustomError) {
      res.status(err.code).send({
        msg: err.message
      });
    }
    next();
  });
};
