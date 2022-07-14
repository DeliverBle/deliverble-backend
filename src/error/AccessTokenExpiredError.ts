import CustomError from './CustomError';
import message from "../modules/responseMessage";

export default class AccessTokenExpiredError extends CustomError {
    constructor() {
        super(403, message.ACCESS_TOKEN_EXPIRED);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AccessTokenExpiredError);
        }
    }
}
