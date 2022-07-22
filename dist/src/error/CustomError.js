"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(code, message, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.code = code;
        this.message = message;
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map