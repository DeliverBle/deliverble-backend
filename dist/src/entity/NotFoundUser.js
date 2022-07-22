"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotFoundUser = exports.NotFoundUser = void 0;
const User_1 = require("./User");
class NotFoundUser extends User_1.User {
    constructor() {
        super("-1", 'User Not Found', '', '분류안됨');
    }
    isNotFoundUser() {
        return true;
    }
}
exports.NotFoundUser = NotFoundUser;
const isNotFoundUser = (_user) => {
    const user = _user;
    try {
        user.isNotFoundUser();
        return true;
        // TODO: 어딘가 좀 이상한 방법... 주객이 전도되었다.. 공부가 부족한 것으로..
    }
    catch (e) {
        return false;
    }
};
exports.isNotFoundUser = isNotFoundUser;
//# sourceMappingURL=NotFoundUser.js.map