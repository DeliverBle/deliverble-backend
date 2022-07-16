import CustomError from './CustomError';
import message from "../modules/responseMessage";

export default class ResourceNotFoundError extends CustomError {
    constructor() {
        super(400, message.RESOURCE_NOT_FOUND_ERROR);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResourceNotFoundError);
        }
    }
}