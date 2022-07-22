"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
class AlreadySignedUpError extends CustomError_1.default {
    constructor() {
        super(404, responseMessage_1.default.ALREADY_SIGNED_UP);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlreadySignedUpError);
        }
    }
}
exports.default = AlreadySignedUpError;
//# sourceMappingURL=AlreadySignedUpError.js.map