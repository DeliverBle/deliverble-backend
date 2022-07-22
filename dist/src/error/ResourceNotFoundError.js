"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
class ResourceNotFoundError extends CustomError_1.default {
    constructor() {
        super(400, responseMessage_1.default.RESOURCE_NOT_FOUND_ERROR);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResourceNotFoundError);
        }
    }
}
exports.default = ResourceNotFoundError;
//# sourceMappingURL=ResourceNotFoundError.js.map