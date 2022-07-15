import CustomError from './CustomError';
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const errorHandler = (fn) => (req, res, next) => {
  // TODO: Error Handler가 정상적으로 동작하지 않는 것 같은데 서팟장에게 물어보도록 하자.
  log.warn("ERROR HANDLER", errorHandler)
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err instanceof CustomError) {
      res.status(err.code).send({
        msg: err.message
      });
    }
  });
};
