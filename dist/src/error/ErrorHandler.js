"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = __importDefault(require("./CustomError"));
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const errorHandler = (fn) => (req, res, next) => {
    log.info("ERROR HANDLER");
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (err instanceof CustomError_1.default || RangeError) {
            log.debug(" >>>>>>>>>>>>>>>>>> ", err);
            res.status(err.code).send({
                msg: err.message
            });
        }
        next();
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map