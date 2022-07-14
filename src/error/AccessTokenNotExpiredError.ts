import CustomError from './CustomError';

export default class AccessTokenNotExpiredError extends CustomError {
    constructor() {
        super(412, "Access Token Has not been expired! Please use your existing Access Token!");

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AccessTokenNotExpiredError);
        }
    }
}
