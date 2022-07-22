"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
class UserNotFoundError extends CustomError_1.default {
    constructor() {
        super(404, "User doesn't exist");
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserNotFoundError);
        }
    }
}
exports.default = UserNotFoundError;
//# sourceMappingURL=UserNotFoundError.js.map