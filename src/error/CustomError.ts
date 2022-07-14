export default class CustomError extends Error {
  code: number;

  constructor(code, message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.message = message;
  }
}
