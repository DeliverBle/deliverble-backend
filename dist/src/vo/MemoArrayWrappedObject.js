"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemoArrayWrappedObject = void 0;
const MemoArrayWrappedObject = (memoArray) => {
    if (memoArray[0] === undefined) {
        return {};
    }
    const memo = memoArray[0];
    return {
        id: memo.id,
        keyword: memo.keyword.replace(/[\b]/, ''),
        content: memo.content,
    };
};
const createMemoArrayWrappedObject = (memoArray) => {
    return MemoArrayWrappedObject(memoArray);
};
exports.createMemoArrayWrappedObject = createMemoArrayWrappedObject;
exports.default = {
    createMemoArrayWrappedObject: exports.createMemoArrayWrappedObject,
    MemoArrayWrappedObject
};
//# sourceMappingURL=MemoArrayWrappedObject.js.map