import CustomError from './CustomError';
import message from "../modules/responseMessage";

export default class AlreadySignedUpError extends CustomError {
    constructor() {
        super(404, message.ALREADY_SIGNED_UP);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlreadySignedUpError);
        }
    }
}
