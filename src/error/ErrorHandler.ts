import CustomError from './CustomError';

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json(err);
  }
  console.log(err);
  return res.status(err.code).json(err);
};
