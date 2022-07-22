"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const kakao_login_1 = __importDefault(require("../controllers/kakao-login"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ErrorHandler_1 = require("../error/ErrorHandler");
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
const AuthLink_1 = require("../shared/AuthLink");
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const router = (0, express_1.Router)();
const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis_1.default.createClient(port, host);
redisClient.auth(password);
redisClient.on('connect', function () {
    console.log('Redis plugged in.');
});
// register kakao-login strategy
(0, kakao_login_1.default)();
router.get('/kakao', passport_1.default.authenticate('kakao-login'));
router.get('/kakao/oauth', passport_1.default.authenticate('kakao-login', {
    failureRedirect: '/', session: false
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const accessToken = req['user'][0];
    const refreshToken = req['user'][1];
    const userId = req['user'][2].toString();
    console.log("accessToken: " + accessToken);
    console.log("userId: " + userId);
    // TODO: initial callback to save refreshToken at Redis with userId
    // await UserService.saveTokensAtRedisWithUserId(userId, accessToken, refreshToken, code);
    const ACCESS_TOKEN = "AT " + code;
    const USER_ID = "UD " + code;
    (0, util_1.promisify)(redisClient.get).bind(redisClient);
    // TODO: move validation logic to other class
    console.log("82 >>>>> ", ACCESS_TOKEN, USER_ID);
    yield redisClient.setex(ACCESS_TOKEN, AuthLink_1.DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, accessToken);
    console.log("88 >>>>> ", ACCESS_TOKEN, USER_ID);
    yield redisClient.setex(USER_ID, AuthLink_1.DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS, userId);
    console.log("94 >>>>> ", ACCESS_TOKEN, USER_ID);
    res.status(statusCode_1.default.OK).send({
        status: statusCode_1.default.OK,
        message: {
            accessToken: accessToken,
            expired_in: 21600,
            userId,
        },
    });
    // await UserController.callbackKakao(req, res).then((v) => console.log('kakao login succeeded'));
}));
router.get('/kakao/token', (0, ErrorHandler_1.errorHandler)(UserController_1.default.getAccessTokenByCode));
// router.post('/kakao/access-token/refresh', errorHandler(UserController.refreshAccessToken));
router.post('/login', (0, ErrorHandler_1.errorHandler)(UserController_1.default.loginUserWithKakao));
router.post('/signup', (0, ErrorHandler_1.errorHandler)(UserController_1.default.signUpUserWithKakao));
router.post('/logout', (0, ErrorHandler_1.errorHandler)(UserController_1.default.logOutUserWithKakao));
exports.default = router;
//# sourceMappingURL=kakaoRouter.js.map