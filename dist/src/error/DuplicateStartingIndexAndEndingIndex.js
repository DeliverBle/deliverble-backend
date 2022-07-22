"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
class DuplicateStartingIndexAndEndingIndex extends CustomError_1.default {
    constructor() {
        super(400, responseMessage_1.default.DUPLICATE_INDEX_FAIL);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateStartingIndexAndEndingIndex);
        }
    }
}
exports.default = DuplicateStartingIndexAndEndingIndex;
//# sourceMappingURL=DuplicateStartingIndexAndEndingIndex.js.map