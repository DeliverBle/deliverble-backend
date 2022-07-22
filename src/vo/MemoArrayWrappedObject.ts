import {Memo} from "../entity/Memo/Memo";

interface Func<T> {
    (arg: T): T;
}

export interface MemoReturnDto {
    id?: number;
    keyword?: string;
    content?: string;
}

const MemoArrayWrappedObject = (memoArray: Memo[]): MemoReturnDto => {
    if (memoArray[0] === undefined) {
        return {};
    }
    const memo = memoArray[0];
    return {
        id: memo.id,
        keyword: memo.keyword.replace(/[\b]/, ''),
        content: memo.content,
    };
}

export const createMemoArrayWrappedObject = (memoArray: Memo[]): MemoReturnDto => {
    return MemoArrayWrappedObject(memoArray);
}

export default {
    createMemoArrayWrappedObject,
    MemoArrayWrappedObject
}
