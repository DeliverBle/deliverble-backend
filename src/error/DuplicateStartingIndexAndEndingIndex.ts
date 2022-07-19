import CustomError from './CustomError';
import message from "../modules/responseMessage";

export default class DuplicateStartingIndexAndEndingIndex extends CustomError {
    constructor() {
        super(400, message.DUPLICATE_INDEX_FAIL);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateStartingIndexAndEndingIndex);
        }
    }
}
