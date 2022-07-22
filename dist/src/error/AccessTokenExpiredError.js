"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
class AccessTokenExpiredError extends CustomError_1.default {
    constructor() {
        super(403, responseMessage_1.default.ACCESS_TOKEN_EXPIRED);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AccessTokenExpiredError);
        }
    }
}
exports.default = AccessTokenExpiredError;
//# sourceMappingURL=AccessTokenExpiredError.js.map