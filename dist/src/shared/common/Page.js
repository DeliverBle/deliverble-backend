"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
class Page {
    constructor(totalCount, pageSize, items) {
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPage = Math.ceil(totalCount / pageSize);
        this.items = items;
    }
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map