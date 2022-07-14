import CustomError from './CustomError';

export default class UserNotFoundError extends CustomError {
  constructor() {
    super(400, "User doesn't exist");

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
  }
}
