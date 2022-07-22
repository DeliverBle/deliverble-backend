"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = {
    success: (status, message, data, paginationInfo) => {
        return {
            status,
            success: true,
            message,
            // TODO: change naming of data to newsData or other appropriate name
            data,
            // TODO: refactor for controller function which doesn't use paginationInfo
            paginationInfo,
        };
    },
    fail: (status, message, data) => {
        return {
            status,
            success: false,
            message,
        };
    },
};
exports.default = util;
//# sourceMappingURL=util.js.map