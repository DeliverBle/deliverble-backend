import { expect } from "chai"
import { sum } from "./function";

describe('function.ts 테스트', () => {
    it('sum 테스트', () => {
        expect(sum(1, 1)).to.equal(2);
        expect(sum(1, 3)).to.equal(4);
        expect(sum(1, 3)).to.not.equal('5')
        expect(sum(1, 3)).to.not.equal('텍스트');
    });
});
