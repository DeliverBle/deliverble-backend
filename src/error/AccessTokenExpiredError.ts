import CustomError from './CustomError';

export default class AccessTokenExpiredError extends CustomError {
    constructor() {
        super(403, "Access Token Expired! Please refresh your Access Token!");

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AccessTokenExpiredError);
        }
    }
}
