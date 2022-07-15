import CustomError from './CustomError';
import message from "../modules/responseMessage";

export default class AlreadyLoggedOutError extends CustomError {
    constructor() {
        super(404, message.ALREADY_LOGGED_OUT);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlreadyLoggedOutError);
        }
    }
}
