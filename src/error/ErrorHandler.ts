import CustomError from './CustomError';

export const errorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err instanceof CustomError) {
      res.status(err.code).send({
        msg: err.message
      });
    }
  });
};
