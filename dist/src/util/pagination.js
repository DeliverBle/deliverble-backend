"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastPage = void 0;
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
const getLastPage = (listSize, totalCount) => {
    return Math.ceil(totalCount / listSize);
};
exports.getLastPage = getLastPage;
//# sourceMappingURL=pagination.js.map